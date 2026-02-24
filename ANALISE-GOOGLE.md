# Análise para aprovação do Google (AdSense e SEO)

Este documento reúne o que já está implementado e o que você deve garantir para reduzir o risco de reprovação do site pelo Google (AdSense, Search Console e políticas gerais).

---

## ✅ Já implementado no projeto

### Políticas e páginas obrigatórias
- **Política de Privacidade** (`/privacidade`) – cookies, dados, LGPD, contato
- **Política de Cookies** (`/cookies`) – tipos de cookies, como gerenciar, links Google
- **Termos de Uso** (`/termos`) – uso do conteúdo, responsabilidade, links externos
- **Sobre** (`/sobre`) – missão, o que o site oferece, acessibilidade
- **Contato** (`/contato`) – canal para dúvidas e exercício de direitos (defina `NEXT_PUBLIC_CONTACT_EMAIL` no `.env` para exibir e-mail)

Todas com link no **rodapé** e no **sitemap**.

### SEO e indexação
- **robots.txt** – permite crawlers, desautoriza `/_next/`, `/api/`, sitemap e host definidos
- **Sitemap** – home, páginas institucionais (sobre, privacidade, cookies, termos, contato) e todas as URLs de posts
- **Canonical dinâmico** na home – cada combinação de página/busca/categoria tem sua própria URL canônica (evita conteúdo duplicado)
- **rel="prev" e rel="next"** na listagem – indicam páginas anterior e seguinte para o Google
- **Meta description** e **títulos** por página (template no layout, override nas rotas)
- **Open Graph e Twitter Cards** – títulos, descrições, imagens (posts usam imagem de capa)
- **Structured data (JSON-LD)** – Organization (layout), WebSite + SearchAction (home), Article + BreadcrumbList (post)

### Segurança e confiança
- **Headers de segurança** em `next.config.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Verificação do Google** – suportada via `GOOGLE_VERIFICATION` no `.env` (meta de verificação do Search Console)

### Acessibilidade e experiência
- **Link “Pular para o conteúdo”** (visível ao focar com teclado)
- **Estrutura semântica** – `<main id="conteudo">`, `<header>`, `<footer>`, `<article>`, `<nav>`, headings em ordem
- **Foco visível** em links (outline/ring ao navegar por teclado)
- **Viewport e theme-color** – mobile-friendly, suporte a tema claro/escuro

### Anúncios (AdSense)
- Script e blocos só carregam quando `NEXT_PUBLIC_ADSENSE_CLIENT_ID` e `NEXT_PUBLIC_ADSENSE_SLOT` estão definidos (e não são placeholders)
- Dois blocos por post (após a capa e ao final do artigo), sem exagero
- Placeholder de teste quando usar `ca-pub-xxxxxxxx` / `1234567890` para ver o layout

---

## ⚠️ O que você precisa fazer (obrigatório)

### 1. Conteúdo
- **Volume** – o Google costuma exigir um mínimo de conteúdo útil e original. Publique vários artigos completos antes de solicitar AdSense.
- **Qualidade** – textos originais, úteis e sem erros; evite conteúdo só para SEO ou duplicado.
- **Idioma** – mantenha consistência (o site está em pt-BR).

### 2. Imagem Open Graph do site
- O layout referencia **`/og-image.jpg`** (1200×630 px) para compartilhamento em redes e rich results.
- **Ação:** coloque o arquivo em `public/og-image.jpg` (ex.: logo + nome do site). Se não existir, o link da imagem pode falhar em redes sociais e ferramentas do Google.

### 3. Favicon e ícone Apple
- O layout usa `/favicon.ico` e `/apple-touch-icon.png`. Já existe `public/favicon.svg`.
- **Ação:** adicione `public/favicon.ico` e, se quiser, `public/apple-touch-icon.png` (recomendado 180×180 px), ou remova esses `<link>` do layout se for usar só o SVG.

### 4. Produção e domínio
- **HTTPS** – em produção, use sempre HTTPS. Defina `NEXT_PUBLIC_SITE_URL` com `https://` (ex.: `https://seusite.com.br`).
- **Domínio próprio** – AdSense tende a exigir domínio próprio e estável (evite só localhost ou subdomínios gratuitos sem conteúdo consistente).
- **Search Console** – cadastre a propriedade (URL prefix ou domínio), use a meta de verificação (`GOOGLE_VERIFICATION`) e confira cobertura e sitemap.

### 5. Contato e verificação
- Defina **`NEXT_PUBLIC_CONTACT_EMAIL`** no `.env` de produção para a página de contato e para a política de privacidade.
- Conclua a **verificação do site** no Google Search Console (meta tag já suportada pelo projeto).

---

## 📋 Checklist rápido antes de enviar ao AdSense

| Item | Status |
|------|--------|
| Política de Privacidade acessível e link no rodapé | ✅ |
| Política de Cookies acessível e link no rodapé | ✅ |
| Termos de Uso acessível e link no rodapé | ✅ |
| Página Sobre com descrição do site | ✅ |
| Página/formas de Contato visíveis | ✅ (adicione e-mail no .env) |
| Conteúdo original e em volume razoável | ⚠️ sua responsabilidade |
| Navegação clara (header, footer, links internos) | ✅ |
| Site em HTTPS em produção | ⚠️ configurar no deploy |
| Sitemap enviado no Search Console | ⚠️ fazer após deploy |
| Imagem OG do site (og-image.jpg) | ⚠️ adicionar em public/ |
| Sem conteúdo proibido (adulto, violência, etc.) | ⚠️ sua responsabilidade |

---

## Referências

- [Políticas do programa AdSense](https://support.google.com/adsense/answer/48182)
- [Requisitos técnicos do AdSense](https://support.google.com/adsense/answer/9274019)
- [Diretrizes para webmasters do Google](https://developers.google.com/search/docs/essentials)
- [Structured Data (Schema.org) – Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
