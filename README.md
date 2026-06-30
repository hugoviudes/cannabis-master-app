# Cannabis Master — App Instalável (PWA via GitHub Pages)

## O que é isto

Um app completo (5 módulos + bitácora + backup) pronto para publicar gratuitamente direto do GitHub Pages e instalar no celular como app nativo — sem precisar de conta em nenhum outro serviço.

A memória dos dados (plantas, bitácora, progresso do curso) usa `localStorage` real do navegador — fica salva permanentemente naquele celular, mesmo fechando o app. Veja a seção "Backup" mais abaixo para não perder dados em atualizações futuras.

## Passo a passo: GitHub Pages (o caminho mais simples)

### 1. Criar o repositório

1. Entre em [github.com](https://github.com), crie conta grátis se não tiver
2. Toque em **"New repository"**
3. **Nome do repositório: `cannabis-master-app`** (use exatamente esse nome — o projeto já está configurado para essa subpasta. Se quiser outro nome, veja a nota no final)
4. Deixe como **Public** (GitHub Pages gratuito exige repositório público)
5. Crie o repositório

### 2. Subir os arquivos

Pelo celular: dentro do repositório, toque em **"Add file" → "Upload files"** e suba todos os arquivos e pastas recebidos (mantendo a estrutura `src/` e `public/` como pastas).

Pelo computador:
```
git init
git add .
git commit -m "primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/cannabis-master-app.git
git push -u origin main
```

### 3. Configurar o GitHub Pages para publicar com GitHub Actions

Como este projeto usa Vite (precisa de um "build" antes de publicar, não é HTML puro), a forma mais simples é deixar o GitHub compilar automaticamente. Crie o arquivo abaixo no seu repositório:

**Caminho exato: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Depois de subir esse arquivo:
1. No repositório, vá em **Settings → Pages**
2. Em "Build and deployment" → "Source", escolha **"GitHub Actions"**
3. Pronto — toda vez que você atualizar o código (push no `main`), o site republica sozinho

Em ~2 minutos seu app estará no ar em:
**`https://SEU-USUARIO.github.io/cannabis-master-app/`**

### 4. Instalar no celular

**Android (Chrome):**
1. Abra a URL acima no Chrome
2. Menu (⋮) → "Adicionar à tela inicial" ou "Instalar app"

**iPhone (Safari — precisa ser Safari, não funciona no Chrome do iPhone):**
1. Abra a URL no Safari
2. Ícone de compartilhar (□ com seta) → "Adicionar à Tela de Início"

O app abre em tela cheia, com ícone próprio, como um app instalado de verdade.

## Backup — não perder dados em atualizações futuras

No canto superior direito do app tem um ícone de engrenagem (⚙), sempre visível. Ele abre:

- **Descargar backup (.json)**: baixa um arquivo com toda a bitácora e progresso do curso
- **Restaurar desde un backup**: lê esse arquivo de volta

**Fluxo para quando você (ou eu) atualizar o app no futuro:**
1. Na versão atual: ⚙ → Descargar backup → guarda o arquivo em algum lugar (Drive, email)
2. Suba o novo código no GitHub (substitui o antigo, o Pages republica sozinho)
3. Na nova versão: ⚙ → Restaurar desde un backup → escolhe aquele arquivo
4. Recarrega a página — dados de volta

## Estrutura do projeto

```
cannabis-master-app/
├── .gitignore
├── .github/workflows/deploy.yml   # você cria este na etapa 3
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js                  # já configurado para a subpasta /cannabis-master-app/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icons/ (4 arquivos .png)
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── storagePolyfill.js
```

## Nota: se usar um nome de repositório diferente de "cannabis-master-app"

Três arquivos têm esse nome fixo e precisam ser ajustados se você escolher outro nome de repositório:
- `vite.config.js` → linha `base: '/cannabis-master-app/'`
- `public/manifest.json` → campos `start_url` e `scope`, e os 4 caminhos de `icons`

Troque `cannabis-master-app` pelo nome real do seu repositório em todos esses lugares.

## Limitações importantes

- **Sem sincronização entre dispositivos**: dados ficam só no navegador onde foram criados.
- **Repositório precisa ser público** para o GitHub Pages gratuito funcionar.
- **Apagar dados do navegador apaga o app**: use o backup (⚙) regularmente.
- **Não está nas lojas oficiais** (App Store / Google Play) — é instalável direto do navegador.
