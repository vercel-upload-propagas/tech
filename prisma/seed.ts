import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL não está definida. Por favor, configure a variável de ambiente DATABASE_URL."
  );
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpar posts existentes
  await prisma.post.deleteMany();
  console.log("✅ Posts antigos removidos");

  const posts = [
    {
      title: "Como Recuperar Mensagens do WhatsApp",
      slug: "como-recuperar-mensagens-whatsapp",
      description:
        "Guia completo para recuperar conversas e mensagens apagadas do WhatsApp em diferentes dispositivos.",
      content: `
# Como Recuperar Mensagens do WhatsApp

Este é um guia completo para recuperar suas mensagens do WhatsApp.

## Passo 1: Verificar Backup Automático

O WhatsApp faz backup automático das suas conversas. Verifique se há um backup disponível nas configurações.

## Passo 2: Restaurar do Backup

Se você tiver um backup, pode restaurá-lo durante a reinstalação do aplicativo.

## Conclusão

Com esses passos, você conseguirá recuperar suas mensagens do WhatsApp.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      readTime: "5 min",
    },
    {
      title: "Como Deletar Conta do Facebook Permanentemente",
      slug: "como-deletar-conta-facebook-permanentemente",
      description:
        "Passo a passo detalhado para excluir sua conta do Facebook de forma definitiva e segura.",
      content: `
# Como Deletar Conta do Facebook Permanentemente

Aprenda a excluir sua conta do Facebook de forma definitiva.

## Passo 1: Acessar Configurações

Vá até Configurações > Suas Informações do Facebook > Desativar e Excluir.

## Passo 2: Escolher Excluir Conta

Selecione a opção "Excluir conta permanentemente" e siga as instruções.

## Conclusão

Sua conta será excluída permanentemente após o período de espera.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop",
      readTime: "8 min",
    },
    {
      title: "Como Configurar Autenticação Two-Factor",
      slug: "como-configurar-autenticacao-two-factor",
      description:
        "Aprenda a configurar autenticação de dois fatores em suas contas para maior segurança.",
      content: `
# Como Configurar Autenticação Two-Factor

Proteja suas contas com autenticação de dois fatores.

## Passo 1: Acessar Configurações de Segurança

Vá até as configurações de segurança da sua conta.

## Passo 2: Ativar 2FA

Ative a autenticação de dois fatores e configure um aplicativo autenticador.

## Conclusão

Sua conta estará muito mais segura com 2FA ativado.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      readTime: "6 min",
    },
    {
      title: "Como Fazer Backup Automático no Google Drive",
      slug: "como-fazer-backup-automatico-google-drive",
      description:
        "Configure backups automáticos do seu dispositivo Android ou iOS no Google Drive.",
      content: `
# Como Fazer Backup Automático no Google Drive

Configure backups automáticos para proteger seus dados.

## Passo 1: Instalar Google Drive

Certifique-se de ter o aplicativo Google Drive instalado.

## Passo 2: Configurar Backup

Vá até Configurações > Backup e ative o backup automático.

## Conclusão

Seus dados serão sincronizados automaticamente com o Google Drive.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      readTime: "4 min",
    },
    {
      title: "Como Bloquear Anúncios no Navegador",
      slug: "como-bloquear-anuncios-navegador",
      description:
        "Guia completo para bloquear anúncios indesejados em Chrome, Firefox e Safari.",
      content: `
# Como Bloquear Anúncios no Navegador

Elimine anúncios indesejados do seu navegador.

## Passo 1: Instalar Extensão

Instale uma extensão de bloqueio de anúncios como uBlock Origin.

## Passo 2: Configurar Filtros

Configure os filtros de bloqueio conforme suas necessidades.

## Conclusão

Navegue sem anúncios indesejados.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      readTime: "7 min",
    },
    {
      title: "Como Recuperar Senha do Instagram",
      slug: "como-recuperar-senha-instagram",
      description:
        "Métodos eficazes para recuperar acesso à sua conta do Instagram quando você esqueceu a senha.",
      content: `
# Como Recuperar Senha do Instagram

Recupere o acesso à sua conta do Instagram.

## Passo 1: Usar "Esqueceu a Senha"

Na tela de login, clique em "Esqueceu a senha?".

## Passo 2: Seguir Instruções

Siga as instruções enviadas por email ou SMS.

## Conclusão

Você conseguirá redefinir sua senha e recuperar o acesso.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      readTime: "5 min",
    },
    {
      title: "Como Configurar VPN no Windows",
      slug: "como-configurar-vpn-windows",
      description:
        "Tutorial passo a passo para configurar e usar uma VPN no Windows 10 e 11.",
      content: `
# Como Configurar VPN no Windows

Configure uma VPN para navegar com segurança e privacidade.

## Passo 1: Escolher Provedor VPN

Escolha um provedor VPN confiável e crie uma conta.

## Passo 2: Instalar e Configurar

Instale o aplicativo do provedor e configure a conexão.

## Conclusão

Navegue com segurança e privacidade usando VPN.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
      readTime: "6 min",
    },
    {
      title: "Como Limpar Cache do Navegador",
      slug: "como-limpar-cache-navegador",
      description:
        "Aprenda a limpar o cache e cookies do seu navegador para melhorar a performance.",
      content: `
# Como Limpar Cache do Navegador

Melhore a performance do seu navegador limpando o cache.

## Passo 1: Acessar Configurações

Vá até Configurações > Privacidade e Segurança.

## Passo 2: Limpar Dados

Selecione "Limpar dados de navegação" e escolha cache e cookies.

## Conclusão

Seu navegador ficará mais rápido após limpar o cache.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      readTime: "3 min",
    },
    {
      title: "Como Criar Conta no GitHub",
      slug: "como-criar-conta-github",
      description:
        "Guia completo para criar sua conta no GitHub e começar a usar controle de versão.",
      content: `
# Como Criar Conta no GitHub

Crie sua conta no GitHub e comece a usar controle de versão.

## Passo 1: Acessar GitHub

Vá até github.com e clique em "Sign up".

## Passo 2: Preencher Dados

Preencha seus dados e verifique seu email.

## Conclusão

Você estará pronto para usar o GitHub.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop",
      readTime: "4 min",
    },
    {
      title: "Como Instalar Node.js no Windows",
      slug: "como-instalar-nodejs-windows",
      description:
        "Tutorial detalhado para instalar e configurar Node.js no Windows corretamente.",
      content: `
# Como Instalar Node.js no Windows

Instale o Node.js no seu Windows.

## Passo 1: Baixar Instalador

Baixe o instalador do site oficial do Node.js.

## Passo 2: Instalar

Execute o instalador e siga as instruções.

## Conclusão

Node.js estará instalado e pronto para uso.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop",
      readTime: "5 min",
    },
    {
      title: "Como Proteger Seu Email de Spam",
      slug: "como-proteger-email-spam",
      description:
        "Dicas e ferramentas para proteger sua caixa de entrada de emails indesejados.",
      content: `
# Como Proteger Seu Email de Spam

Proteja sua caixa de entrada de emails indesejados.

## Passo 1: Usar Filtros

Configure filtros de spam no seu provedor de email.

## Passo 2: Não Divulgar Email

Evite divulgar seu email em sites públicos.

## Conclusão

Sua caixa de entrada ficará mais limpa.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      readTime: "7 min",
    },
    {
      title: "Como Sincronizar Arquivos com OneDrive",
      slug: "como-sincronizar-arquivos-onedrive",
      description:
        "Configure a sincronização automática de arquivos entre seu PC e a nuvem.",
      content: `
# Como Sincronizar Arquivos com OneDrive

Sincronize seus arquivos com a nuvem do OneDrive.

## Passo 1: Instalar OneDrive

Instale o aplicativo OneDrive no seu computador.

## Passo 2: Configurar Sincronização

Configure quais pastas deseja sincronizar.

## Conclusão

Seus arquivos serão sincronizados automaticamente.
      `,
      coverImage:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
      readTime: "6 min",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
    console.log(`✅ Post criado: ${post.title}`);
  }

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
