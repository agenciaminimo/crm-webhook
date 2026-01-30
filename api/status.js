module.exports = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CRM Mínimo Webhook API',
    timestamp: new Date().toISOString(),
    endpoints: {
      webhook: '/api/webhook - Recebe leads do Facebook',
      lead: '/api/lead - Cria leads via API (POST)'
    }
  });
};
