//o objetivo deste middleware global de erros é centralizar o tratamento de erros
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('Error detected:', err);

  // Se o erro tiver um status definido (ex: erros do Zod)
  const status = err.status || 500;

  // Mensagem padrão se não for fornecida
  const message = err.message || 'Internal server error';

  // Estrutura padronizada de resposta
  res.status(status).json({
    success: false,
    error: message,
  });
}