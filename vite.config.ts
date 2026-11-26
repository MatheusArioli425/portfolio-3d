import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' gera caminhos relativos: o build funciona na Vercel, no GitHub Pages ou em qualquer pasta.
export default defineConfig({
  base: './',
  plugins: [react()],
  // PGlite (Postgres em WebAssembly) carrega os próprios arquivos .wasm/.data; não deve ser pré-empacotado
  optimizeDeps: { exclude: ['@electric-sql/pglite'] },
  worker: { format: 'es' },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
  },
});
