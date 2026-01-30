module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidade - CRM Mínimo</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; background: #f9fafb; }
        h1 { color: #1a1a1a; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
        h2 { color: #4f46e5; margin-top: 30px; }
        .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .update { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Política de Privacidade</h1>
        <p class="update">Última atualização: 30 de Janeiro de 2026</p>
        <h2>1. Introdução</h2>
        <p>A Mínimo Marketing opera o aplicativo CRM Mínimo Leads. Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de informações pessoais.</p>
        <h2>2. Informações que Coletamos</h2>
        <p>Coletamos informações através da integração com Facebook Lead Ads: nome, e-mail, telefone e outras informações fornecidas nos formulários.</p>
        <h2>3. Como Usamos as Informações</h2>
        <p>Utilizamos para gerenciar leads de vendas, entrar em contato com potenciais clientes e melhorar nossos serviços.</p>
        <h2>4. Compartilhamento de Dados</h2>
        <p>Não vendemos ou compartilhamos suas informações com terceiros, exceto quando necessário para prestação de serviços ou por obrigação legal.</p>
        <h2>5. Segurança</h2>
        <p>Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado.</p>
        <h2>6. Seus Direitos</h2>
        <p>Você pode acessar, corrigir ou solicitar exclusão de seus dados entrando em contato conosco.</p>
        <h2>7. Contato</h2>
        <p>E-mail: alvaro.inter7@gmail.com | Empresa: Mínimo Marketing</p>
        <h2>8. LGPD</h2>
        <p>Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.</p>
    </div>
</body>
</html>`);
};
```

5. Clica em **Commit changes**

Depois de fazer o deploy, a URL será:
```
https://crm-webhook-pi.vercel.app/api/privacy
