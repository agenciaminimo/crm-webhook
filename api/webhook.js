const { db } = require('./_firebase');

// Token de verificação (você define esse valor)
const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'crm_minimo_token_2024';

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Verificação do Facebook
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verificado com sucesso!');
      return res.status(200).send(challenge);
    } else {
      console.log('Falha na verificação do webhook');
      return res.status(403).send('Forbidden');
    }
  }

  // POST - Receber leads
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log('Webhook recebido:', JSON.stringify(body, null, 2));

      if (body.object === 'page') {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            if (change.field === 'leadgen') {
              const leadgenId = change.value.leadgen_id;
              const pageId = change.value.page_id;
              const formId = change.value.form_id;
              const createdTime = change.value.created_time;

              // Buscar dados completos do lead na API do Facebook
              const leadData = await buscarLeadFacebook(leadgenId);
              
              if (leadData) {
                await salvarLeadNoCRM(leadData, pageId, formId, createdTime);
              }
            }
          }
        }
      }

      return res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return res.status(200).send('EVENT_RECEIVED'); // Facebook espera 200 mesmo com erro
    }
  }

  return res.status(405).send('Method not allowed');
};

// Buscar dados do lead na API do Facebook
async function buscarLeadFacebook(leadgenId) {
  const accessToken = process.env.FB_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('FB_ACCESS_TOKEN não configurado');
    return null;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${leadgenId}?access_token=${accessToken}`
    );
    
    if (!response.ok) {
      console.error('Erro ao buscar lead:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Salvar lead no CRM
async function salvarLeadNoCRM(leadData, pageId, formId, createdTime) {
  try {
    // Mapear campos do Facebook para o CRM
    const campos = {};
    for (const field of leadData.field_data || []) {
      campos[field.name.toLowerCase()] = field.values?.[0] || '';
    }

    // Buscar a empresa associada a esse pageId/formId
    // Por padrão, usa a empresa configurada nas variáveis de ambiente
    const empresaId = process.env.DEFAULT_EMPRESA_ID;
    
    if (!empresaId) {
      console.error('DEFAULT_EMPRESA_ID não configurado');
      return;
    }

    const novoLead = {
      empresaId: empresaId,
      nome: campos.company || campos.empresa || campos.full_name || campos.nome || 'Lead Facebook',
      contato: campos.full_name || campos.nome || campos.name || '',
      email: campos.email || '',
      telefone: campos.phone_number || campos.telefone || campos.phone || '',
      valor: 0,
      segmento: 'Outro',
      etapa: 'novo',
      origem: 'Facebook',
      notas: `Lead ID: ${leadData.id}\nForm ID: ${formId}\nPage ID: ${pageId}\n\nDados originais:\n${JSON.stringify(campos, null, 2)}`,
      criadoEm: new Date(createdTime * 1000).toISOString(),
      atualizadoEm: new Date().toISOString(),
      interacoes: [{
        data: new Date().toISOString(),
        tipo: 'outro',
        descricao: 'Lead captado via Facebook Lead Ads',
        usuarioId: 'sistema',
        usuarioNome: 'Sistema'
      }],
      facebookLeadId: leadData.id,
      facebookFormId: formId,
      facebookPageId: pageId
    };

    await db.collection('leads').add(novoLead);
    console.log('Lead salvo com sucesso:', novoLead.nome);

  } catch (error) {
    console.error('Erro ao salvar lead:', error);
  }
}
