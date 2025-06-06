import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/middleware';
import { getCollection, Collections } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Verificar token e permissões de admin
    const tokenResult = verifyToken(request);
    if (!tokenResult.success || !tokenResult.user || !['superadmin', 'analista', 'consultor'].includes(tokenResult.user.role)) {
      return NextResponse.json({ erro: 'Acesso negado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Conectar ao MongoDB
    const candidatosCollection = await getCollection(Collections.CANDIDATOS);

    // Construir filtros
    let filters: any = {};
    
    if (status && status !== 'todos') {
      filters.status = status;
    }

    if (search) {
      filters.$or = [
        { 'dadosPessoais.nomeCompleto': { $regex: search, $options: 'i' } },
        { 'contato.email': { $regex: search, $options: 'i' } }
      ];
    }

    // Buscar candidatos com paginação
    const candidatos = await candidatosCollection
      .find(filters)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Contar total de candidatos
    const totalCandidatos = await candidatosCollection.countDocuments(filters);

    return NextResponse.json({
      sucesso: true,
      candidatos,
      totalCandidatos,
      totalPages: Math.ceil(totalCandidatos / limit),
      currentPage: page
    });

  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verificar token e permissões de admin
    const tokenResult = verifyToken(request);
    if (!tokenResult.success || !tokenResult.user || !['superadmin', 'analista', 'consultor'].includes(tokenResult.user.role)) {
      return NextResponse.json({ erro: 'Acesso negado' }, { status: 403 });
    }

    const body = await request.json();
    const { candidatoId, status, observacoes } = body;

    if (!candidatoId || !status) {
      return NextResponse.json({ erro: 'ID do candidato e status são obrigatórios' }, { status: 400 });
    }

    if (!['pendente', 'aprovado', 'rejeitado', 'em_analise'].includes(status)) {
      return NextResponse.json({ erro: 'Status inválido' }, { status: 400 });
    }

    // Conectar ao MongoDB
    const candidatosCollection = await getCollection(Collections.CANDIDATOS);
    const logsCollection = await getCollection(Collections.LOGS);

    // Buscar candidato atual para obter status anterior
    const candidatoAtual = await candidatosCollection.findOne({ _id: candidatoId });
    
    if (!candidatoAtual) {
      return NextResponse.json({ erro: 'Candidato não encontrado' }, { status: 404 });
    }

    // Atualizar status do candidato
    await candidatosCollection.updateOne(
      { _id: candidatoId },
      { 
        $set: { 
          status,
          updatedAt: new Date(),
          ...(observacoes && { observacoes })
        }
      }
    );

    // Criar log de auditoria
    const logData = {
      usuario: tokenResult.user!.email,
      acao: 'atualizacao_status_candidato',
      candidatoId: candidatoId,
      statusAnterior: candidatoAtual.status,
      statusNovo: status,
      observacoes: observacoes || '',
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'N/A'
    };

    await logsCollection.insertOne(logData);

    console.log('Log de auditoria criado:', logData);

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Status do candidato atualizado com sucesso',
      candidatoId,
      novoStatus: status
    });

  } catch (error) {
    console.error('Erro ao atualizar candidato:', error);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
} 