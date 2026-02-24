/**
 * Formata uma data em ISO (ex: 2026-02-21T18:16:53.883Z) para exibição em pt-BR.
 * Mantém o atributo dateTime em ISO; use o retorno apenas para exibir.
 */
export function formatPostDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}
