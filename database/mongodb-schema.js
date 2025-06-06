// ================================
// ESTRUTURA DO BANCO DE DADOS MONGODB
// PLATAFORMA LEÃO CAREERS
// ================================

// Collection: usuarios
// Gerencia todos os tipos de usuários do sistema
const usuariosSchema = {
  _id: "ObjectId",
  email: "string", // único
  senha: "string", // hash bcrypt
  tipo: "string", // 'superadmin', 'analista', 'consultor', 'candidato', 'empresa'
  status: "string", // 'ativo', 'inativo', 'pendente', 'bloqueado'
  perfil: {
    nome: "string",
    telefone: "string",
    avatar: "string", // URL da imagem
    timezone: "string",
    idioma: "string"
  },
  permissoes: {
    modulos: ["string"], // array de módulos acessíveis
    acoes: ["string"], // array de ações permitidas
    nivelAcesso: "number" // 1-5 (1=básico, 5=total)
  },
  sessao: {
    ultimoLogin: "date",
    tokenRefresh: "string",
    dispositivoConfiavel: "boolean",
    tentativasLogin: "number"
  },
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// Collection: candidatos
// Informações detalhadas dos candidatos
const candidatosSchema = {
  _id: "ObjectId",
  usuarioId: "ObjectId", // referência para usuarios
  dadosPessoais: {
    nomeCompleto: "string",
    cpf: "string",
    rg: "string",
    dataNascimento: "date",
    genero: "string",
    estadoCivil: "string",
    nacionalidade: "string"
  },
  contato: {
    telefone: "string",
    whatsapp: "string",
    linkedin: "string",
    portfolio: "string",
    endereco: {
      cep: "string",
      logradouro: "string",
      numero: "string",
      complemento: "string",
      bairro: "string",
      cidade: "string",
      estado: "string",
      pais: "string"
    }
  },
  experienciaProfissional: [{
    empresa: "string",
    cargo: "string",
    areaAtuacao: "string",
    dataInicio: "date",
    dataFim: "date", // null se atual
    atualEmprego: "boolean",
    descricao: "string",
    salario: "number",
    competencias: ["string"]
  }],
  formacao: [{
    instituicao: "string",
    curso: "string",
    nivel: "string", // 'fundamental', 'medio', 'tecnico', 'superior', 'pos', 'mestrado', 'doutorado'
    status: "string", // 'completo', 'cursando', 'trancado', 'incompleto'
    dataInicio: "date",
    dataFim: "date",
    cr: "number" // coeficiente de rendimento
  }],
  idiomas: [{
    idioma: "string",
    nivel: "string", // 'basico', 'intermediario', 'avancado', 'fluente', 'nativo'
    certificacao: "string"
  }],
  competencias: {
    tecnicas: [{
      nome: "string",
      nivel: "number", // 1-5
      certificacao: "string",
      tempoExperiencia: "number" // em meses
    }],
    comportamentais: [{
      nome: "string",
      nivel: "number", // 1-5
      evidencias: "string"
    }]
  },
  preferencias: {
    pretensaoSalarial: {
      minimo: "number",
      maximo: "number",
      beneficios: ["string"]
    },
    localizacao: {
      cidadesInteresse: ["string"],
      aceitaRealocacao: "boolean",
      trabalhoRemoto: "boolean",
      trabalhoHibrido: "boolean"
    },
    tipoContrato: ["string"], // 'clt', 'pj', 'terceirizado', 'estagio', 'temporario'
    disponibilidade: {
      imediata: "boolean",
      dataDisponibilidade: "date",
      periodoAviso: "number" // em dias
    },
    areasInteresse: ["string"],
    cargosInteresse: ["string"]
  },
  documentos: {
    curriculo: {
      arquivo: "string", // URL do arquivo
      versao: "number",
      dataUpload: "date",
      analisado: "boolean"
    },
    foto: "string",
    certificados: [{
      nome: "string",
      arquivo: "string",
      dataEmissao: "date"
    }]
  },
  analiseIA: {
    score: "number", // 0-100
    pontosFocus: ["string"],
    areasRecomendadas: ["string"],
    competenciasDestaque: ["string"],
    melhorias: ["string"],
    ultimaAnalise: "date"
  },
  statusAprovacao: "string", // 'pendente', 'aprovado', 'rejeitado', 'em_analise'
  observacoesInternas: "string",
  tags: ["string"], // tags para organização interna
  lgpd: {
    consentimento: "boolean",
    dataConsentimento: "date",
    versaoTermos: "string",
    opt_in_marketing: "boolean"
  },
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date",
    aprovadoPor: "ObjectId",
    aprovadoEm: "date"
  }
};

// Collection: empresas
// Informações das empresas parceiras
const empresasSchema = {
  _id: "ObjectId",
  usuarioId: "ObjectId", // referência para usuarios
  dadosEmpresa: {
    razaoSocial: "string",
    nomeFantasia: "string",
    cnpj: "string",
    inscricaoEstadual: "string",
    inscricaoMunicipal: "string",
    porte: "string", // 'micro', 'pequena', 'media', 'grande'
    setor: "string",
    ramo: "string",
    website: "string",
    anoFundacao: "number",
    numeroFuncionarios: "number"
  },
  endereco: {
    cep: "string",
    logradouro: "string",
    numero: "string",
    complemento: "string",
    bairro: "string",
    cidade: "string",
    estado: "string",
    pais: "string"
  },
  contato: {
    telefone: "string",
    email: "string",
    linkedin: "string",
    redesSociais: {
      facebook: "string",
      instagram: "string",
      twitter: "string"
    }
  },
  responsavel: {
    nome: "string",
    cargo: "string",
    email: "string",
    telefone: "string",
    departamento: "string"
  },
  cultura: {
    missao: "string",
    visao: "string",
    valores: ["string"],
    beneficios: ["string"],
    diferenciais: ["string"]
  },
  preferenciasContratacao: {
    areasInteresse: ["string"],
    cargosFrequentes: ["string"],
    faixaSalarialPadrao: {
      minima: "number",
      maxima: "number"
    },
    modeloTrabalho: ["string"], // 'presencial', 'remoto', 'hibrido'
    urgencia: "string" // 'baixa', 'media', 'alta'
  },
  plano: {
    tipo: "string", // 'basico', 'premium', 'enterprise'
    dataInicio: "date",
    dataVencimento: "date",
    limiteVagas: "number",
    limiteVisualizacoes: "number"
  },
  statusAprovacao: "string", // 'pendente', 'aprovado', 'rejeitado', 'em_analise'
  observacoesInternas: "string",
  score: "number", // 0-100 - qualidade da empresa
  tags: ["string"],
  lgpd: {
    consentimento: "boolean",
    dataConsentimento: "date",
    versaoTermos: "string"
  },
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date",
    aprovadoPor: "ObjectId",
    aprovadoEm: "date"
  }
};

// Collection: vagas
// Todas as vagas disponíveis no sistema
const vagasSchema = {
  _id: "ObjectId",
  empresaId: "ObjectId", // referência para empresas
  codigo: "string", // código único da vaga
  informacoes: {
    titulo: "string",
    descricao: "string",
    area: "string",
    categoria: "string",
    nivel: "string", // 'estagio', 'junior', 'pleno', 'senior', 'especialista', 'gerencial'
    tipoContrato: "string", // 'clt', 'pj', 'terceirizado', 'estagio', 'temporario'
    regime: "string", // 'presencial', 'remoto', 'hibrido'
    cargaHoraria: "number",
    horario: "string"
  },
  localizacao: {
    cidade: "string",
    estado: "string",
    pais: "string",
    endereco: "string",
    aceitaCandidatoRemoto: "boolean"
  },
  remuneracao: {
    faixaSalarial: {
      minimo: "number",
      maximo: "number",
      negociavel: "boolean"
    },
    beneficios: ["string"],
    valeRefeicao: "number",
    valeTransporte: "boolean",
    outrosBeneficios: "string"
  },
  requisitos: {
    escolaridade: "string",
    experiencia: {
      tempoMinimo: "number", // em anos
      areasRelevantes: ["string"],
      obrigatoria: "boolean"
    },
    competenciasTecnicas: [{
      nome: "string",
      nivel: "string", // 'basico', 'intermediario', 'avancado'
      obrigatorio: "boolean"
    }],
    competenciasComportamentais: ["string"],
    idiomas: [{
      idioma: "string",
      nivel: "string",
      obrigatorio: "boolean"
    }],
    outrosRequisitos: "string"
  },
  publicacao: {
    status: "string", // 'rascunho', 'ativa', 'pausada', 'encerrada', 'cancelada'
    dataPublicacao: "date",
    dataExpiracao: "date",
    prioridade: "string", // 'baixa', 'normal', 'alta', 'urgente'
    destacada: "boolean"
  },
  estatisticas: {
    visualizacoes: "number",
    candidaturas: "number",
    matches: "number",
    compartilhamentos: "number"
  },
  processo: {
    etapas: [{
      nome: "string",
      descricao: "string",
      ordem: "number",
      obrigatoria: "boolean"
    }],
    cronograma: {
      inicioEntrevistas: "date",
      previsaoFechamento: "date"
    },
    responsavel: "ObjectId" // analista/consultor responsável
  },
  configuracoes: {
    perguntasPersonalizadas: [{
      pergunta: "string",
      tipo: "string", // 'texto', 'multipla_escolha', 'arquivo'
      obrigatoria: "boolean",
      opcoes: ["string"] // para múltipla escolha
    }],
    filtrosAutomaticos: {
      ativo: "boolean",
      scoreMinimo: "number",
      experienciaMinima: "number"
    }
  },
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// Collection: candidaturas
// Relaciona candidatos com vagas
const candidaturasSchema = {
  _id: "ObjectId",
  vagaId: "ObjectId",
  candidatoId: "ObjectId",
  dataAplicacao: "date",
  status: "string", // 'nova', 'visualizada', 'pre_selecionada', 'entrevista', 'aprovada', 'rejeitada', 'contratada'
  origem: "string", // 'plataforma', 'indicacao', 'headhunting', 'eventos'
  matchScore: "number", // 0-100
  matchDetalhes: {
    pontosFocus: ["string"],
    competenciasAtendidas: ["string"],
    competenciasFaltantes: ["string"],
    experienciaMatch: "number",
    localizacaoMatch: "number",
    salarioMatch: "number"
  },
  etapaAtual: "string",
  historico: [{
    etapa: "string",
    status: "string",
    data: "date",
    observacoes: "string",
    responsavel: "ObjectId"
  }],
  avaliacoes: [{
    avaliador: "ObjectId",
    etapa: "string",
    nota: "number", // 1-10
    feedback: "string",
    pontosFocus: ["string"],
    recomendacao: "string", // 'aprovar', 'reprovar', 'analisar'
    data: "date"
  }],
  entrevistas: [{
    tipo: "string", // 'telefone', 'video', 'presencial', 'dinamica'
    agendamento: {
      data: "date",
      duracao: "number", // em minutos
      local: "string",
      linkReuniao: "string"
    },
    participantes: ["ObjectId"],
    status: "string", // 'agendada', 'realizada', 'cancelada', 'remarcada'
    feedback: "string",
    pontuacao: "number"
  }],
  documentos: [{
    nome: "string",
    tipo: "string", // 'curriculo', 'carta_apresentacao', 'portfolio', 'certificado'
    arquivo: "string",
    dataUpload: "date"
  }],
  observacoes: "string",
  motivoRejeicao: "string",
  dataUltimaAtualizacao: "date",
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// Collection: contratos
// Contratos gerados para candidatos aprovados
const contratosSchema = {
  _id: "ObjectId",
  candidaturaId: "ObjectId",
  vagaId: "ObjectId",
  candidatoId: "ObjectId",
  empresaId: "ObjectId",
  numero: "string", // número único do contrato
  tipo: "string", // 'clt', 'pj', 'terceirizado', 'estagio', 'temporario'
  informacoes: {
    cargo: "string",
    dataInicio: "date",
    dataFim: "date", // null para indeterminado
    salario: "number",
    beneficios: ["string"],
    cargaHoraria: "number",
    local: "string",
    observacoes: "string"
  },
  status: "string", // 'proposta', 'enviado', 'assinado_candidato', 'assinado_empresa', 'vigente', 'rescindido'
  documentos: [{
    nome: "string",
    tipo: "string",
    arquivo: "string",
    dataUpload: "date",
    assinado: "boolean"
  }],
  assinaturas: {
    candidato: {
      data: "date",
      ip: "string",
      assinado: "boolean"
    },
    empresa: {
      data: "date",
      ip: "string",
      assinado: "boolean",
      responsavel: "ObjectId"
    }
  },
  comissoes: {
    valor: "number",
    percentual: "number",
    dataPagamento: "date",
    pago: "boolean"
  },
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// Collection: notificacoes
// Sistema de notificações do platform
const notificacoesSchema = {
  _id: "ObjectId",
  destinatario: "ObjectId", // usuário que receberá
  tipo: "string", // 'candidatura', 'aprovacao', 'entrevista', 'contrato', 'sistema'
  titulo: "string",
  mensagem: "string",
  dados: "object", // dados específicos da notificação
  canais: {
    interna: "boolean",
    email: "boolean",
    sms: "boolean",
    whatsapp: "boolean"
  },
  status: {
    enviada: "boolean",
    lida: "boolean",
    dataEnvio: "date",
    dataLeitura: "date"
  },
  prioridade: "string", // 'baixa', 'normal', 'alta', 'urgente'
  expiresAt: "date", // TTL para remoção automática
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date"
  }
};

// Collection: logs
// Registro de todas as atividades críticas
const logsSchema = {
  _id: "ObjectId",
  usuario: "ObjectId",
  acao: "string", // 'create', 'update', 'delete', 'login', 'logout', 'view', 'download'
  entidade: "string", // 'candidato', 'empresa', 'vaga', 'candidatura', 'contrato'
  entidadeId: "ObjectId",
  descricao: "string",
  dadosAnteriores: "object", // estado antes da mudança
  dadosNovos: "object", // estado após a mudança
  metadata: {
    ip: "string",
    userAgent: "string",
    dispositivo: "string",
    localizacao: "string"
  },
  nivel: "string", // 'info', 'warning', 'error', 'critical'
  data: "date",
  expiresAt: "date" // TTL para remoção automática após 1 ano
};

// Collection: configuracoes
// Configurações gerais do sistema
const configuracoesSchema = {
  _id: "ObjectId",
  categoria: "string", // 'sistema', 'email', 'ia', 'integracao'
  chave: "string",
  valor: "mixed", // pode ser string, number, boolean, object, array
  descricao: "string",
  tipo: "string", // 'string', 'number', 'boolean', 'json', 'array'
  categoria: "string",
  visivel: "boolean", // se aparece na interface
  editavel: "boolean", // se pode ser editado pela interface
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// Collection: relatorios
// Templates e dados de relatórios salvos
const relatoriosSchema = {
  _id: "ObjectId",
  nome: "string",
  tipo: "string", // 'candidatos', 'empresas', 'vagas', 'candidaturas', 'contratos', 'performance'
  filtros: "object",
  campos: ["string"],
  formato: "string", // 'pdf', 'csv', 'xlsx'
  agendamento: {
    ativo: "boolean",
    frequencia: "string", // 'diario', 'semanal', 'mensal'
    diasSemana: ["number"],
    diaMes: "number",
    hora: "string",
    destinatarios: ["string"]
  },
  ultimaExecucao: "date",
  arquivos: [{
    nome: "string",
    url: "string",
    tamanho: "number",
    dataGeracao: "date",
    expiresAt: "date"
  }],
  auditoria: {
    criadoPor: "ObjectId",
    criadoEm: "date",
    atualizadoPor: "ObjectId",
    atualizadoEm: "date"
  }
};

// ================================
// ÍNDICES RECOMENDADOS
// ================================

const indices = {
  // usuarios
  usuarios: [
    { fields: { email: 1 }, unique: true },
    { fields: { tipo: 1, status: 1 } },
    { fields: { "sessao.ultimoLogin": -1 } }
  ],
  
  // candidatos
  candidatos: [
    { fields: { usuarioId: 1 }, unique: true },
    { fields: { statusAprovacao: 1 } },
    { fields: { "dadosPessoais.cpf": 1 }, unique: true, sparse: true },
    { fields: { "contato.telefone": 1 } },
    { fields: { "analiseIA.score": -1 } },
    { fields: { "auditoria.criadoEm": -1 } },
    { fields: { tags: 1 } }
  ],
  
  // empresas
  empresas: [
    { fields: { usuarioId: 1 }, unique: true },
    { fields: { "dadosEmpresa.cnpj": 1 }, unique: true },
    { fields: { statusAprovacao: 1 } },
    { fields: { "endereco.cidade": 1, "endereco.estado": 1 } },
    { fields: { "auditoria.criadoEm": -1 } }
  ],
  
  // vagas
  vagas: [
    { fields: { empresaId: 1 } },
    { fields: { codigo: 1 }, unique: true },
    { fields: { "publicacao.status": 1 } },
    { fields: { "publicacao.dataPublicacao": -1 } },
    { fields: { "publicacao.dataExpiracao": 1 } },
    { fields: { "informacoes.area": 1, "informacoes.nivel": 1 } },
    { fields: { "localizacao.cidade": 1, "localizacao.estado": 1 } }
  ],
  
  // candidaturas
  candidaturas: [
    { fields: { vagaId: 1, candidatoId: 1 }, unique: true },
    { fields: { candidatoId: 1 } },
    { fields: { vagaId: 1 } },
    { fields: { status: 1 } },
    { fields: { matchScore: -1 } },
    { fields: { dataAplicacao: -1 } }
  ],
  
  // contratos
  contratos: [
    { fields: { candidaturaId: 1 }, unique: true },
    { fields: { numero: 1 }, unique: true },
    { fields: { candidatoId: 1 } },
    { fields: { empresaId: 1 } },
    { fields: { status: 1 } },
    { fields: { "informacoes.dataInicio": 1 } }
  ],
  
  // notificacoes
  notificacoes: [
    { fields: { destinatario: 1, "status.lida": 1 } },
    { fields: { tipo: 1 } },
    { fields: { "auditoria.criadoEm": -1 } },
    { fields: { expiresAt: 1 }, expireAfterSeconds: 0 } // TTL
  ],
  
  // logs
  logs: [
    { fields: { usuario: 1 } },
    { fields: { entidade: 1, entidadeId: 1 } },
    { fields: { acao: 1 } },
    { fields: { data: -1 } },
    { fields: { expiresAt: 1 }, expireAfterSeconds: 0 } // TTL
  ],
  
  // configuracoes
  configuracoes: [
    { fields: { categoria: 1, chave: 1 }, unique: true }
  ]
};

// ================================
// VALIDAÇÕES DE SCHEMA
// ================================

const validations = {
  usuarios: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "senha", "tipo", "status"],
      properties: {
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        tipo: { enum: ["superadmin", "analista", "consultor", "candidato", "empresa"] },
        status: { enum: ["ativo", "inativo", "pendente", "bloqueado"] }
      }
    }
  },
  
  candidatos: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuarioId", "statusAprovacao"],
      properties: {
        statusAprovacao: { enum: ["pendente", "aprovado", "rejeitado", "em_analise"] },
        "dadosPessoais.cpf": { bsonType: "string", pattern: "^[0-9]{11}$" }
      }
    }
  },
  
  empresas: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuarioId", "statusAprovacao"],
      properties: {
        statusAprovacao: { enum: ["pendente", "aprovado", "rejeitado", "em_analise"] },
        "dadosEmpresa.cnpj": { bsonType: "string", pattern: "^[0-9]{14}$" }
      }
    }
  }
};

module.exports = {
  schemas: {
    usuarios: usuariosSchema,
    candidatos: candidatosSchema,
    empresas: empresasSchema,
    vagas: vagasSchema,
    candidaturas: candidaturasSchema,
    contratos: contratosSchema,
    notificacoes: notificacoesSchema,
    logs: logsSchema,
    configuracoes: configuracoesSchema,
    relatorios: relatoriosSchema
  },
  indices,
  validations
}; 