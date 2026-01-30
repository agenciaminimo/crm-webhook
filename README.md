# CRM Mínimo - Webhook Facebook Leads

API para receber leads automaticamente do Facebook Lead Ads.

---

## 🚀 PASSO A PASSO COMPLETO

### 1. Criar conta na Vercel (grátis)

1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Faça login com GitHub (mais fácil)

---

### 2. Gerar credenciais do Firebase

1. Vá no Firebase Console: https://console.firebase.google.com
2. Selecione seu projeto "crmminimo"
3. Clique na ⚙️ → **Configurações do projeto**
4. Vá na aba **Contas de serviço**
5. Clique em **Gerar nova chave privada**
6. Baixe o arquivo JSON

Do arquivo JSON, você vai precisar de:
- `project_id`
- `client_email`  
- `private_key`

---

### 3. Descobrir o ID da sua empresa

1. No Firebase Console, vá em **Firestore Database**
2. Clique na coleção **empresas**
3. Copie o ID do documento (aquela string tipo "abc123xyz")

---

### 4. Criar app no Facebook Developers

1. Acesse: https://developers.facebook.com
2. Clique em "Meus Apps" → "Criar App"
3. Escolha "Empresa" → Próximo
4. Dê um nome (ex: "CRM Mínimo Leads")
5. Após criar, vá em **Configurações** → **Básico** e anote o **App ID**

---

### 5. Gerar Access Token do Facebook

1. No app do Facebook, vá em **Ferramentas** → **Graph API Explorer**
2. Em "Meta App", selecione seu app
3. Clique em **Generate Access Token**
4. Adicione as permissões:
   - `pages_show_list`
   - `pages_read_engagement`
   - `leads_retrieval`
   - `pages_manage_ads`
5. Clique em **Generate Access Token**
6. Copie o token

**IMPORTANTE:** Esse token expira. Para produção, você precisa de um token de longa duração ou Page Access Token.

---

### 6. Deploy na Vercel

**Opção A - Via GitHub (recomendado):**

1. Crie um repositório no GitHub
2. Faça upload desses arquivos
3. Na Vercel, clique em "Add New Project"
4. Importe do GitHub
5. Configure as variáveis de ambiente (próximo passo)
6. Deploy!

**Opção B - Via CLI:**

1. Instale a Vercel CLI: `npm i -g vercel`
2. Na pasta do projeto, rode: `vercel`
3. Siga as instruções

---

### 7. Configurar variáveis de ambiente na Vercel

Na Vercel, vá em **Settings** → **Environment Variables** e adicione:

| Nome | Valor |
|------|-------|
| `FIREBASE_PROJECT_ID` | crmminimo |
| `FIREBASE_CLIENT_EMAIL` | (do JSON que você baixou) |
| `FIREBASE_PRIVATE_KEY` | (do JSON, incluindo as aspas e \n) |
| `FB_ACCESS_TOKEN` | (token do Facebook) |
| `FB_VERIFY_TOKEN` | crm_minimo_token_2024 (ou invente um) |
| `DEFAULT_EMPRESA_ID` | (ID da sua empresa no Firestore) |
| `API_KEY` | (invente uma chave secreta para a API) |

---

### 8. Configurar Webhook no Facebook

1. No app do Facebook, vá em **Webhooks** (no menu lateral)
2. Clique em **Adicionar produto** se não aparecer
3. Selecione **Page** 
4. Clique em **Subscribe to this object**
5. Em **Callback URL**, coloque: `https://SEU-PROJETO.vercel.app/api/webhook`
6. Em **Verify Token**, coloque: `crm_minimo_token_2024` (ou o que você definiu)
7. Clique em **Verify and Save**
8. Marque a opção **leadgen** e clique em **Subscribe**

---

### 9. Conectar sua página do Facebook

1. No app do Facebook, vá em **Configurações** → **Avançado**
2. Em **Páginas Autorizadas**, adicione sua página
3. Ou vá em **Webhooks** → **Page** → **Subscribe** e adicione a página

---

### 10. Testar!

1. Crie um formulário de lead no Gerenciador de Anúncios
2. Use a ferramenta de teste: https://developers.facebook.com/tools/lead-ads-testing
3. Envie um lead de teste
4. Veja se aparece no seu CRM!

---

## 📡 Endpoints da API

### GET /api/status
Verifica se a API está funcionando.

### GET /api/webhook
Verificação do Facebook (automático).

### POST /api/webhook
Recebe leads do Facebook (automático).

### POST /api/lead
Cria lead manualmente via API.

```bash
curl -X POST https://seu-projeto.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SUA_API_KEY" \
  -d '{
    "empresaId": "ID_DA_EMPRESA",
    "nome": "Empresa Teste",
    "contato": "João Silva",
    "email": "joao@teste.com",
    "telefone": "11999999999",
    "valor": 5000,
    "segmento": "Imobiliário",
    "origem": "API"
  }'
```

---

## 🔧 Troubleshooting

**Leads não aparecem no CRM:**
1. Verifique os logs na Vercel (aba Functions)
2. Confira se o `DEFAULT_EMPRESA_ID` está correto
3. Teste se a API está funcionando: `https://seu-projeto.vercel.app/api/status`

**Erro 403 no webhook:**
- O `FB_VERIFY_TOKEN` está diferente do configurado no Facebook

**Erro ao buscar lead:**
- O `FB_ACCESS_TOKEN` expirou ou não tem permissões

---

## 📞 Suporte

Qualquer dúvida, volta no chat com o Claude!
