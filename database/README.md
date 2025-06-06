# 📊 Estrutura do Banco de Dados - Leão Careers

Esta documentação descreve toda a estrutura do banco de dados MongoDB da plataforma Leão Careers, incluindo schemas, modelos e exemplos de uso.

## 🏗️ Arquitetura

### Collections Principais

- **usuarios** - Gerencia todos os tipos de usuários (admin, candidato, empresa)
- **candidatos** - Perfis detalhados dos candidatos
- **empresas** - Informações das empresas parceiras
- **vagas** - Vagas disponíveis no sistema
- **candidaturas** - Relacionamento candidato x vaga
- **contratos** - Contratos gerados
- **notificacoes** - Sistema de notificações
- **logs** - Auditoria de ações
- **configuracoes** - Configurações do sistema
- **relatorios** - Templates de relatórios

## 🚀 Instalação e Setup

### 1. Instalar Dependências

```bash
npm install mongodb bcrypt jsonwebtoken
```

### 2. Configurar Variáveis de Ambiente

```bash
# .env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=leaocareers
JWT_SECRET=sua_chave_jwt_super_secreta
JWT_REFRESH_SECRET=sua_chave_refresh_super_secreta
```

### 3. Executar Setup do Banco

```bash
cd database
node setup.js
```

## 📋 Exemplos de Uso

### Conectando ao Banco

```javascript
const { connect, Usuario, Candidato } = require('./lib/database/models');

// Conectar ao banco
await connect();

// Agora você pode usar os modelos
const usuarios = await Usuario.find({});
```

### Criando um Usuário Admin

```javascript
const { Usuario } = require('./lib/database/models');

const adminData = {
  email: 'admin@empresa.com',
  senha: 'senha123',
  tipo: 'superadmin',
  perfil: {
    nome: 'Administrador',
    telefone: '+55 11 99999-9999'
  },
  permissoes: {
    modulos: ['dashboard', 'candidatos', 'empresas', 'vagas'],
    acoes: ['create', 'read', 'update', 'delete'],
    nivelAcesso: 5
  }
};

const admin = await Usuario.createUser(adminData);
```

### Autenticação de Usuário

```javascript
const { Usuario } = require('./lib/database/models');

// Validar credenciais
const user = await Usuario.validateCredentials('user@email.com', 'senha123');

if (user) {
  // Gerar tokens JWT
  const tokens = await Usuario.generateTokens(user._id);
  console.log('Access Token:', tokens.accessToken);
  console.log('Refresh Token:', tokens.refreshToken);
}
```

### Criando um Candidato

```javascript
const { Usuario, Candidato } = require('./lib/database/models');

// Primeiro criar o usuário
const userData = {
  email: 'candidato@email.com',
  senha: 'senha123',
  tipo: 'candidato',
  perfil: {
    nome: 'João Silva',
    telefone: '+55 11 98888-7777'
  }
};

const usuario = await Usuario.createUser(userData);

// Depois criar o perfil do candidato
const candidatoData = {
  dadosPessoais: {
    nomeCompleto: 'João Silva',
    cpf: '12345678901',
    dataNascimento: new Date('1990-05-15'),
    genero: 'masculino'
  },
  contato: {
    telefone: '+55 11 98888-7777',
    endereco: {
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567'
    }
  },
  experienciaProfissional: [{
    empresa: 'Tech Corp',
    cargo: 'Desenvolvedor',
    areaAtuacao: 'Tecnologia',
    dataInicio: new Date('2020-01-01'),
    atualEmprego: true,
    salario: 8000
  }],
  competencias: {
    tecnicas: [{
      nome: 'JavaScript',
      nivel: 4,
      tempoExperiencia: 36
    }]
  },
  preferencias: {
    pretensaoSalarial: {
      minimo: 8000,
      maximo: 12000
    },
    localizacao: {
      cidadesInteresse: ['São Paulo', 'Rio de Janeiro'],
      trabalhoRemoto: true
    }
  }
};

const candidato = await Candidato.createCandidato(candidatoData, usuario._id);
```

### Buscando Candidatos

```javascript
const { Candidato } = require('./lib/database/models');

// Buscar todos os candidatos com paginação
const result = await Candidato.find({}, {
  page: 1,
  limit: 10,
  sort: { 'analiseIA.score': -1 }
});

console.log('Candidatos:', result.documents);
console.log('Paginação:', result.pagination);

// Buscar candidatos por score mínimo
const topCandidatos = await Candidato.getCandidatosByScore(80);

// Buscar candidatos pendentes de aprovação
const pendentes = await Candidato.getCandidatosPendentes();
```

### Aprovação de Candidatos

```javascript
const { Candidato } = require('./lib/database/models');

// Aprovar candidato
await Candidato.aprovarCandidato(
  candidatoId, 
  adminUserId, 
  'Perfil completo e qualificado'
);

// Rejeitar candidato
await Candidato.rejeitarCandidato(
  candidatoId,
  adminUserId,
  'Documentos incompletos'
);
```

### Matching de Candidatos para Vaga

```javascript
const { Candidato } = require('./lib/database/models');

const jobCriteria = {
  experienciaMinima: 2, // anos
  cidade: 'São Paulo',
  trabalhoRemoto: true,
  salarioMinimo: 6000,
  salarioMaximo: 10000,
  competenciasRequeridas: ['JavaScript', 'React', 'Node.js'],
  minMatchScore: 70
};

const matches = await Candidato.findCandidatesForJob(jobCriteria, {
  page: 1,
  limit: 20
});

matches.forEach(match => {
  console.log(`${match.dadosPessoais.nomeCompleto} - Score: ${match.matchScore}%`);
});
```

### Busca Avançada de Candidatos

```javascript
const { Candidato } = require('./lib/database/models');

const searchParams = {
  texto: 'desenvolvedor javascript',
  area: 'Tecnologia',
  cidade: 'São Paulo',
  salarioMin: 5000,
  salarioMax: 15000,
  scoreMin: 70,
  statusAprovacao: 'aprovado',
  disponibilidade: 'imediata'
};

const results = await Candidato.searchCandidatos(searchParams, {
  page: 1,
  limit: 20,
  sort: { 'analiseIA.score': -1 }
});
```

### Análise de IA do Candidato

```javascript
const { Candidato } = require('./lib/database/models');

const analiseData = {
  score: 85,
  pontosFocus: ['Experiência sólida', 'Competências técnicas'],
  areasRecomendadas: ['Frontend', 'Full Stack'],
  competenciasDestaque: ['JavaScript', 'React', 'TypeScript'],
  melhorias: ['Adicionar certificações', 'Experiência em liderança']
};

await Candidato.updateAnaliseIA(candidatoId, analiseData, adminUserId);
```

### Gerenciamento de Permissões

```javascript
const { Usuario } = require('./lib/database/models');

// Verificar permissão
const hasPermission = await Usuario.hasPermission(
  userId, 
  'candidatos', 
  'approve'
);

if (hasPermission) {
  // Usuário pode aprovar candidatos
}

// Atualizar permissões
const newPermissions = {
  modulos: ['dashboard', 'candidatos', 'vagas'],
  acoes: ['read', 'update'],
  nivelAcesso: 3
};

await Usuario.updatePermissions(userId, newPermissions, adminId);
```

### Estatísticas e Relatórios

```javascript
const { Usuario, Candidato, getGeneralStats } = require('./lib/database/models');

// Estatísticas de usuários
const userStats = await Usuario.getUsersStatistics();
console.log('Estatísticas de usuários:', userStats);

// Estatísticas de candidatos
const candidateStats = await Candidato.getCandidatosStatistics();
console.log('Estatísticas de candidatos:', candidateStats);

// Top candidatos por área
const topByArea = await Candidato.getTopCandidatesByArea(5);
console.log('Top candidatos por área:', topByArea);

// Estatísticas gerais do banco
const generalStats = await getGeneralStats();
console.log('Estatísticas gerais:', generalStats);
```

### Transações

```javascript
const { withTransaction, Usuario, Candidato } = require('./lib/database/models');

await withTransaction(async (session) => {
  // Criar usuário
  const usuario = await Usuario.create(userData, adminId);
  
  // Criar candidato
  const candidato = await Candidato.createCandidato(
    candidatoData, 
    usuario._id, 
    adminId
  );
  
  // Se alguma operação falhar, todas serão revertidas
  return { usuario, candidato };
});
```

## 🔧 Configurações Avançadas

### Índices para Performance

Os índices são criados automaticamente pelo script de setup, mas você pode criar índices personalizados:

```javascript
// Criar índice personalizado
await db.collection('candidatos').createIndex({
  'experienciaProfissional.cargo': 'text',
  'competencias.tecnicas.nome': 'text'
}, {
  name: 'search_index',
  weights: {
    'experienciaProfissional.cargo': 10,
    'competencias.tecnicas.nome': 5
  }
});
```

### TTL (Time To Live) para Logs

```javascript
// Logs expiram automaticamente após 1 ano
await db.collection('logs').createIndex(
  { "data": 1 }, 
  { expireAfterSeconds: 31536000 } // 1 ano
);
```

## 🛡️ Segurança

### Validação de Dados

As validações são aplicadas automaticamente pelo MongoDB usando JSON Schema:

```javascript
// Exemplo de validação para usuarios
{
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "senha", "tipo", "status"],
    properties: {
      email: { 
        bsonType: "string", 
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" 
      },
      tipo: { 
        enum: ["superadmin", "analista", "consultor", "candidato", "empresa"] 
      }
    }
  }
}
```

### Hash de Senhas

```javascript
const bcrypt = require('bcrypt');

// As senhas são automaticamente hasheadas
const hashedPassword = await bcrypt.hash(password, 12);
```

## 🔍 Health Check

```javascript
const { healthCheck } = require('./lib/database/models');

const health = await healthCheck();
console.log('Status do banco:', health);

// Resultado:
// {
//   status: 'connected',
//   message: 'Banco de dados funcionando corretamente',
//   database: 'leaocareers'
// }
```

## 📝 Logs de Auditoria

Todas as operações importantes são automaticamente logadas:

```javascript
// Exemplo de log automático
{
  usuario: ObjectId("..."),
  acao: "create",
  entidade: "candidato", 
  entidadeId: ObjectId("..."),
  descricao: "Candidato criado",
  dadosNovos: { ... },
  metadata: {
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    dispositivo: "desktop"
  },
  data: new Date()
}
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de Conexão**
   ```bash
   # Verificar se MongoDB está rodando
   brew services start mongodb-community
   # ou
   sudo systemctl start mongod
   ```

2. **Índices não criados**
   ```bash
   # Re-executar setup
   node database/setup.js
   ```

3. **Permissões negadas**
   ```javascript
   // Verificar permissões do usuário
   const user = await Usuario.findById(userId);
   console.log('Permissões:', user.permissoes);
   ```

4. **Performance lenta**
   ```javascript
   // Verificar uso de índices
   const explain = await collection.find(query).explain("executionStats");
   console.log('Execution stats:', explain);
   ```

---

## 📞 Suporte

Para dúvidas sobre a estrutura do banco de dados, consulte:
- Documentação técnica completa: `/database/mongodb-schema.js`
- Scripts de setup: `/database/setup.js`
- Modelos: `/lib/database/models/`

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2024 