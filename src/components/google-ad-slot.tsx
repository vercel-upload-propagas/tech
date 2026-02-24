"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/** Valores de placeholder para ver o layout dos blocos sem conta AdSense. */
const PLACEHOLDER_CLIENT = "ca-pub-xxxxxxxx";
const PLACEHOLDER_SLOT = "1234567890";

interface GoogleAdSlotProps {
  /** ID do cliente AdSense (ex: ca-pub-xxxxxxxx) */
  clientId: string;
  /** ID do slot da unidade de anúncio (ex: 1234567890). Obtenha no painel do AdSense. */
  slot: string;
  /** Formato: "auto" | "rectangle" | "horizontal" | "vertical" */
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  /** Estilo do container (ex: display block, min-height para evitar layout shift) */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Bloco de anúncio Google AdSense. O script deve ser incluído no layout (AdSenseScript).
 * Só renderiza quando clientId e slot estão definidos.
 * Com clientId/slot de placeholder (ca-pub-xxxxxxxx / 1234567890) exibe um bloco visual de teste.
 */
export function GoogleAdSlot({
  clientId,
  slot,
  format = "auto",
  style = { display: "block", minHeight: 90 },
  className,
}: GoogleAdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const isPlaceholder =
    clientId === PLACEHOLDER_CLIENT && slot === PLACEHOLDER_SLOT;
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!clientId || !slot || pushed.current || isPlaceholder) return;
    const ins = insRef.current;
    if (!ins) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ignore
    }
  }, [clientId, slot, isPlaceholder]);

  if (!clientId || !slot) return null;

  // Placeholder visual para testar o layout sem conta AdSense
  if (isPlaceholder) {
    return (
      <div
        className={className}
        aria-label="Bloco de anúncio (placeholder de teste)"
      >
        <div
          style={{ ...style, minHeight: 100 }}
          className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 text-muted-foreground"
        >
          <span className="text-sm">Bloco de anúncio (teste)</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-label="Anúncio">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(isDev ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
}
