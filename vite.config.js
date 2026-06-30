import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANTE: GitHub Pages publica o site numa subpasta com o nome do repositório
// (ex: usuario.github.io/cannabis-master-app/), não na raiz do domínio.
// O "base" abaixo precisa bater EXATAMENTE com o nome do seu repositório no GitHub.
// Se você nomear o repositório diferente de "cannabis-master-app", troque aqui também.
export default defineConfig({
  base: '/cannabis-master-app/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
