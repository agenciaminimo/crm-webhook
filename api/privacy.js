module.exports = (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Política de Privacidade - CRM Mínimo</title>
<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:40px 20px}h1{border-bottom:2px solid #6366f1;padding-bottom:10px}h2{color:#4f46e5;margin-top:25px}</style>
</head>
<body>
<h1>Política de Privacidade</h1>
<p>Última atualização: 30 de Janeiro de 2026</p>
<h2>1. Introdução</h2>
<p>A Mínimo Marketing opera o aplicativo CRM Mínimo Leads para gerenciamento de leads de vendas.</p>
<h2>2. Dados Coletados</h2>
<p>Coletamos nome, e-mail, telefone e outras informações fornecidas em formulários de lead do Facebook.</p>
<h2>3. Uso dos Dados</h2>
<p>Utilizamos para gerenciar leads, entrar em contato com clientes e melhorar nossos serviços.</p>
<h2>4. Compartilhamento</h2>
<p>Não vendemos ou compartilhamos dados com terceiros, exceto por obrigação legal.</p>
<h2>5. Segurança</h2>
<p>Implementamos medidas de segurança para proteger suas informações.</p>
<h2>6. Seus Direitos</h2>
<p>Você pode acessar, corrigir ou solicitar exclusão de seus dados.</p>
<h2>7. Contato</h2>
<p>E-mail: alvaro.inter7@gmail.com - Empresa: Mínimo Marketing</p>
<h2>8. LGPD</h2>
<p>Esta política está em conformidade com a LGPD do Brasil.</p>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
