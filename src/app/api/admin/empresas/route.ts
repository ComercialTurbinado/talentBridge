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
    const empresasCollection = await getCollection(Collections.EMPRESAS);

    // Construir filtros
    let filters: any = {};
    
    if (status && status !== 'todos') {
      filters.status = status;
    }

    if (search) {
      filters.$or = [
        { 'empresa.nomeEmpresa': { $regex: search, $options: 'i' } },
        { 'contato.email': { $regex: search, $options: 'i' } },
        { 'responsavel.nome': { $regex: search, $options: 'i' } }
      ];
    }

    // Buscar empresas com paginação
    const empresas = await empresasCollection
      .find(filters)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Contar total de empresas
    const totalEmpresas = await empresasCollection.countDocuments(filters);

    return NextResponse.json({
      sucesso: true,
      empresas,
      totalEmpresas,
      totalPages: Math.ceil(totalEmpresas / limit),
      currentPage: page
    });

  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
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
    const { empresaId, status, observacoes } = body;

    if (!empresaId || !status) {
      return NextResponse.json({ erro: 'ID da empresa e status são obrigatórios' }, { status: 400 });
    }

    if (!['pendente', 'aprovado', 'rejeitado', 'em_analise'].includes(status)) {
      return NextResponse.json({ erro: 'Status inválido' }, { status: 400 });
    }

    // Conectar ao MongoDB
    const empresasCollection = await getCollection(Collections.EMPRESAS);
    const logsCollection = await getCollection(Collections.LOGS);

    // Buscar empresa atual para obter status anterior
    const empresaAtual = await empresasCollection.findOne({ _id: empresaId });
    
    if (!empresaAtual) {
      return NextResponse.json({ erro: 'Empresa não encontrada' }, { status: 404 });
    }

    // Atualizar status da empresa
    await empresasCollection.updateOne(
      { _id: empresaId },
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
      acao: 'atualizacao_status_empresa',
      empresaId: empresaId,
      statusAnterior: empresaAtual.status,
      statusNovo: status,
      observacoes: observacoes || '',
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'N/A'
    };

    await logsCollection.insertOne(logData);

    console.log('Log de auditoria criado:', logData);

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Status da empresa atualizado com sucesso',
      empresaId,
      novoStatus: status
    });

  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
} 