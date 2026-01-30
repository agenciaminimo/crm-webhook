const { db } = require('./_firebase');

// Chave de API simples para segurança
const API_KEY = process.env.API_KEY || 'sua_chave_secreta_aqui';

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar API Key
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { empresaId, nome, contato, email, telefone, valor, segmento, origem, notas } = req.body;

    if (!empresaId || !nome) {
      return res.status(400).json({ error: 'empresaId e nome são obrigatórios' });
    }

    const novoLead = {
      empresaId,
      nome,
      contato: contato || '',
      email: email || '',
      telefone: telefone || '',
      valor: Number(valor) || 0,
      segmento: segmento || 'Outro',
      etapa: 'novo',
      origem: origem || 'API',
      notas: notas || '',
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      interacoes: [{
        data: new Date().toISOString(),
        tipo: 'outro',
        descricao: 'Lead criado via API',
        usuarioId: 'api',
        usuarioNome: 'API'
      }]
    };

    const docRef = await db.collection('leads').add(novoLead);
    
    return res.status(201).json({ 
      success: true, 
      leadId: docRef.id,
      message: 'Lead criado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
