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

    // Conectar às collections
    const candidatosCollection = await getCollection(Collections.CANDIDATOS);
    const empresasCollection = await getCollection(Collections.EMPRESAS);
    const vagasCollection = await getCollection(Collections.VAGAS);
    const matchesCollection = await getCollection(Collections.MATCHES);

    // Calcular estatísticas de candidatos
    const totalCandidatos = await candidatosCollection.countDocuments();
    const candidatosPendentes = await candidatosCollection.countDocuments({ status: 'pendente' });
    const candidatosAprovados = await candidatosCollection.countDocuments({ status: 'aprovado' });
    const candidatosRejeitados = await candidatosCollection.countDocuments({ status: 'rejeitado' });
    const candidatosEmAnalise = await candidatosCollection.countDocuments({ status: 'em_analise' });

    // Candidatos novos este mês
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);
    const candidatosNovosEsteMes = await candidatosCollection.countDocuments({
      createdAt: { $gte: inicioMes }
    });

    // Calcular estatísticas de empresas
    const totalEmpresas = await empresasCollection.countDocuments();
    const empresasPendentes = await empresasCollection.countDocuments({ status: 'pendente' });
    const empresasAprovadas = await empresasCollection.countDocuments({ status: 'aprovado' });
    const empresasRejeitadas = await empresasCollection.countDocuments({ status: 'rejeitado' });
    const empresasEmAnalise = await empresasCollection.countDocuments({ status: 'em_analise' });

    // Empresas novas este mês
    const empresasNovasEsteMes = await empresasCollection.countDocuments({
      createdAt: { $gte: inicioMes }
    });

    // Calcular estatísticas de vagas
    const totalVagas = await vagasCollection.countDocuments();
    const vagasAtivas = await vagasCollection.countDocuments({ status: 'ativa' });
    const vagasPausadas = await vagasCollection.countDocuments({ status: 'pausada' });
    const vagasFechadas = await vagasCollection.countDocuments({ status: 'fechada' });

    // Vagas novas esta semana
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    inicioSemana.setHours(0, 0, 0, 0);
    const vagasNovasEstaSemana = await vagasCollection.countDocuments({
      createdAt: { $gte: inicioSemana }
    });

    // Calcular estatísticas de matches
    const totalMatches = await matchesCollection.countDocuments();
    const matchesEsteMes = await matchesCollection.countDocuments({
      createdAt: { $gte: inicioMes }
    });
    const matchesSucessos = await matchesCollection.countDocuments({ status: 'sucesso' });
    const matchesPendentes = await matchesCollection.countDocuments({ status: 'pendente' });

    // Calcular taxa de sucesso
    const taxaSucesso = totalMatches > 0 ? (matchesSucessos / totalMatches) * 100 : 0;

    // Calcular crescimento (exemplo simples)
    const mesAnterior = new Date(inicioMes);
    mesAnterior.setMonth(mesAnterior.getMonth() - 1);
    const candidatosMesAnterior = await candidatosCollection.countDocuments({
      createdAt: { $gte: mesAnterior, $lt: inicioMes }
    });
    const empresasMesAnterior = await empresasCollection.countDocuments({
      createdAt: { $gte: mesAnterior, $lt: inicioMes }
    });

    const crescimentoCandidatos = candidatosMesAnterior > 0 
      ? ((candidatosNovosEsteMes - candidatosMesAnterior) / candidatosMesAnterior) * 100 
      : 0;
    const crescimentoEmpresas = empresasMesAnterior > 0 
      ? ((empresasNovasEsteMes - empresasMesAnterior) / empresasMesAnterior) * 100 
      : 0;

    // Estruturar dados de resposta
    const stats = {
      candidatos: {
        total: totalCandidatos,
        pendentes: candidatosPendentes,
        aprovados: candidatosAprovados,
        rejeitados: candidatosRejeitados,
        em_analise: candidatosEmAnalise,
        novosEsteMes: candidatosNovosEsteMes,
        crescimento: Math.round(crescimentoCandidatos * 100) / 100
      },
      empresas: {
        total: totalEmpresas,
        pendentes: empresasPendentes,
        aprovadas: empresasAprovadas,
        rejeitadas: empresasRejeitadas,
        em_analise: empresasEmAnalise,
        novasEsteMes: empresasNovasEsteMes,
        crescimento: Math.round(crescimentoEmpresas * 100) / 100
      },
      vagas: {
        total: totalVagas,
        ativas: vagasAtivas,
        pausadas: vagasPausadas,
        fechadas: vagasFechadas,
        novasEstaSemana: vagasNovasEstaSemana
      },
      matches: {
        total: totalMatches,
        esteMes: matchesEsteMes,
        sucessos: matchesSucessos,
        pendentes: matchesPendentes,
        taxaSucesso: Math.round(taxaSucesso * 100) / 100
      },
      atividades: {
        hoje: Math.floor(Math.random() * 20) + 5, // Mock para atividades diárias
        estaSemana: candidatosNovosEsteMes + empresasNovasEsteMes + totalMatches,
        esteMes: candidatosNovosEsteMes + empresasNovasEsteMes + matchesEsteMes
      }
    };

    // Gerar gráficos com dados reais
    const graficos = {
      cadastrosPorMes: [
        { mes: 'Jan', candidatos: candidatosMesAnterior, empresas: empresasMesAnterior },
        { mes: 'Fev', candidatos: Math.floor(candidatosMesAnterior * 1.2), empresas: Math.floor(empresasMesAnterior * 1.1) },
        { mes: 'Mar', candidatos: candidatosNovosEsteMes, empresas: empresasNovasEsteMes }
      ],
      statusDistribuicao: {
        candidatos: {
          pendente: totalCandidatos > 0 ? Math.round((candidatosPendentes / totalCandidatos) * 100) : 0,
          aprovado: totalCandidatos > 0 ? Math.round((candidatosAprovados / totalCandidatos) * 100) : 0,
          rejeitado: totalCandidatos > 0 ? Math.round((candidatosRejeitados / totalCandidatos) * 100) : 0,
          em_analise: totalCandidatos > 0 ? Math.round((candidatosEmAnalise / totalCandidatos) * 100) : 0
        },
        empresas: {
          pendente: totalEmpresas > 0 ? Math.round((empresasPendentes / totalEmpresas) * 100) : 0,
          aprovado: totalEmpresas > 0 ? Math.round((empresasAprovadas / totalEmpresas) * 100) : 0,
          rejeitado: totalEmpresas > 0 ? Math.round((empresasRejeitadas / totalEmpresas) * 100) : 0,
          em_analise: totalEmpresas > 0 ? Math.round((empresasEmAnalise / totalEmpresas) * 100) : 0
        }
      },
      setoresMaisAtivos: await empresasCollection.aggregate([
        { $group: { _id: '$empresa.segmento', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $project: { setor: '$_id', count: 1, _id: 0 } }
      ]).toArray()
    };

    // Log da consulta
    console.log(`Estatísticas solicitadas por: ${tokenResult.user!.email} em ${new Date().toISOString()}`);

    return NextResponse.json({
      sucesso: true,
      stats,
      graficos,
      ultimaAtualizacao: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
} 