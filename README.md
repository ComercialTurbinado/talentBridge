# 🦁 Leão Careers - Plataforma de Recrutamento Internacional

Plataforma de recrutamento focada em oportunidades profissionais no Dubai e Emirados Árabes Unidos.

## 🚀 Deploy Rápido

### **Variáveis de Ambiente Obrigatórias:**

Criar arquivo `.env.local` ou configurar no seu provedor de hospedagem:

```bash
# MongoDB Atlas (OBRIGATÓRIO)
MONGODB_URI=mongodb+srv://comercialturbinado:JOwKHt2s3WFrEFZW@cluster0.vryeq.mongodb.net/leao-careers?retryWrites=true&w=majority&appName=Cluster0

# JWT Secrets (OBRIGATÓRIO) 
JWT_SECRET=leao-careers-jwt-secret-change-in-production
MONGODB_DB_NAME=leao-careers
NODE_ENV=production
```

### **Comandos de Deploy:**

```bash
# 1. Instalar dependências
npm install

# 2. Inicializar banco de dados (uma vez)
node scripts/init-db.js

# 3. Build para produção
npm run build

# 4. Iniciar servidor
npm start
```

## 🔑 **Credenciais de Acesso**

**Admin Dashboard:** `/admin/login`
- **E-mail:** admin@leaocareers.com  
- **Senha:** LeaoAdmin2024!

## 📊 **Funcionalidades Implementadas**

✅ **Área Administrativa (Fase 3):**
- Dashboard com estatísticas em tempo real
- Gerenciamento de candidatos (aprovar/rejeitar)
- Gerenciamento de empresas (validação/aprovação)
- Sistema de logs de auditoria
- Filtros e busca avançada
- Paginação eficiente

✅ **Banco de Dados:**
- MongoDB Atlas configurado
- Collections: candidatos, empresas, usuarios, logs
- Índices de performance
- Dados de exemplo inclusos

✅ **Autenticação:**
- JWT tokens seguros
- Controle de acesso por roles
- Middleware de autorização

## 🏗️ **Arquitetura**

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco:** MongoDB Atlas
- **Autenticação:** JWT
- **Deploy:** Vercel/Netlify/Railway compatível

## 📱 **Telas Principais**

1. **`/admin/login`** - Login administrativo
2. **`/admin`** - Dashboard principal  
3. **`/admin/candidatos`** - Gestão de candidatos
4. **`/admin/empresas`** - Gestão de empresas

## 🔧 **Desenvolvimento Local**

```bash
# Apenas se quiser rodar localmente
npm run dev
# Acesse: http://localhost:3000/admin/login
```

## 🌐 **Deploy Recomendado**

**Vercel (Mais fácil):**
1. Conectar GitHub ao Vercel
2. Configurar variáveis de ambiente
3. Deploy automático!

**Railway/Render:**
1. Conectar repositório
2. Definir variáveis de ambiente
3. Build automático

---

**Status:** ✅ Pronto para produção  
**Versão:** Fase 3 - Área Administrativa Completa 