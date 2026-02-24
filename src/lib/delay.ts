/**
 * Delay artificial para testes de loading/skeleton (remover em produção).
 * Defina NEXT_PUBLIC_REQUEST_DELAY_MS=0 no .env para desativar.
 */
const DELAY_MS = Number(process.env.NEXT_PUBLIC_REQUEST_DELAY_MS) || 0;

export function requestDelay(): Promise<void> {
  if (DELAY_MS <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, DELAY_MS));
}
