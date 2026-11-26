# Uma viagem pelos dados · Portfólio de Matheus Arioli

Portfólio de Analista de Dados / BI / Cientista de Dados em forma de uma cena 3D contínua. Ao rolar, a câmera atravessa um "universo de dados". Cada seção é uma estação da viagem. Nela, 50 mil partículas mudam de forma: **nuvem → gráfico de barras 3D → rede neural → globo de dados**.

## Stack

| Parte | Tecnologia |
|---|---|
| Base | React 18 + TypeScript, empacotado com **Vite** (export estático) |
| 3D | React Three Fiber + Drei, com shaders GLSL próprios (`src/three/shaders`) |
| Pós-processamento | @react-three/postprocessing: Bloom, Chromatic Aberration, Noise, Vignette e Depth of Field |
| Animação | GSAP + ScrollTrigger (câmera, pin horizontal, linha do tempo) e Lenis (rolagem suave) |
| Interface | Tailwind CSS e Framer Motion (tilt, botões magnéticos, revelações, máscaras) |
| Demos | PGlite (Postgres 16 de verdade em WebAssembly, com sql.js e AlaSQL como planos B) e Pyodide (Python, baixado só ao abrir o terminal ou executar o notebook) |

> Os gráficos das demos usam SVG próprio em vez de uma biblioteca de gráficos, o que deixa o carregamento cerca de 1 MB mais leve.

## Estrutura

```
src/
  content/profile.ts      ← SEUS DADOS (nome, contatos, sobre, experiência)
  content/projects.ts     ← textos dos projetos e mapa habilidades → projetos
  data/store.ts           ← dados fictícios da loja (gerados com semente fixa)
  data/model.ts           ← modelo de churn (regressão logística)
  three/
    Scene.tsx             ← cena de fundo: câmera em spline, rastro do cursor, efeitos
    Particles.tsx         ← 50 mil partículas
    shapes.ts             ← as 4 formas (nuvem, barras, rede, globo)
    shaders/*.glsl        ← vertex e fragment shaders (morphing e campo de força)
    Constellation.tsx     ← constelação 3D de habilidades
  components/             ← Loader 0–100%, cursor, botões magnéticos, scramble, tilt…
  sections/               ← Hero, Sobre, Habilidades, Projetos, Experiência, Contato, PDF
  demos/                  ← as 6 demos (dashboard BI, SQL, Python, ML, A/B, ETL 3D)
public/og-image.png       ← imagem da prévia do LinkedIn
```

## 0. Só quero ver o site (zip "site-pronto")

Abrir o `index.html` com dois cliques não funciona: o navegador bloqueia sites modernos abertos direto do arquivo. Faça assim:

1. Clique com o botão direito no zip e escolha **Extrair tudo**. Não abra de dentro do zip.
2. Na pasta extraída, dê dois cliques em **`abrir-site.bat`** (Windows). No Mac, use `abrir-site.command` (clique direito > Abrir na primeira vez).
3. O navegador abre sozinho em `http://localhost:8080`. Deixe a janela preta aberta enquanto navega e feche-a para desligar.

Se o Windows mostrar "O Windows protegeu o computador", clique em **Mais informações > Executar assim mesmo**. O script só liga um servidor local na sua máquina, sem instalar nada. Quem tem Python também pode rodar `python -m http.server 8080` dentro da pasta.

Na Vercel nada disso é preciso: o site abre direto pelo link.

## 1. Rodar no seu computador

Pré-requisito: [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a pasta dist/ pronta para publicar
npm run preview    # testa o build localmente
```

## 2. Personalizar

1. Abra `src/content/profile.ts` (o nome Matheus Arioli já está lá) e troque e-mail, LinkedIn, GitHub, anos de experiência (`anosExperiencia`), o texto "Sobre" e a lista de experiências.
2. Em `index.html`, troque `SEU-DOMINIO` pelo endereço final do site (veja o passo 3).
3. A imagem de compartilhamento `public/og-image.png` (1200×630) já tem seu nome.

## 3. Publicar na Vercel (grátis)

**Pelo GitHub (recomendado, atualiza sozinho a cada mudança):**
1. Crie um repositório no GitHub e envie esta pasta. Pelo site, use "Add file → Upload files" e arraste tudo menos `node_modules` e `dist`.
2. Entre em [vercel.com](https://vercel.com) com sua conta do GitHub e clique em **Add New → Project**.
3. Escolha o repositório. A Vercel detecta **Vite** sozinha (Build: `npm run build`, Output: `dist`). Clique em **Deploy**.
4. Em cerca de 1 minuto o site estará em `https://seu-projeto.vercel.app`. Volte ao `index.html` e coloque esse endereço no lugar de `SEU-DOMINIO`.

**Pelo terminal:** `npx vercel` dentro da pasta e siga as perguntas.

Também funciona no Netlify ou no GitHub Pages: basta publicar a pasta `dist/`.

## 4. Colocar no Destaque do LinkedIn

1. No seu perfil: **Adicionar seção do perfil → Recomendado → Adicionar destaque** (ou o **+** da seção Destaque).
2. **Adicionar um link** → cole o endereço da Vercel.
3. O LinkedIn puxa título e imagem (`og-image.png`). Ajuste o título, por exemplo "Portfólio: uma viagem 3D pelos dados", e salve.
4. Coloque o link também em **Informações de contato → Site** e no final do seu **Sobre**.
5. Se a imagem não aparecer, cole o link em linkedin.com/post-inspector para o LinkedIn ler a página de novo.

## 5. PDF

O botão **Baixar PDF** abre a impressão do navegador. Escolha **Salvar como PDF**. O CSS de impressão troca o site por um currículo limpo de 2 páginas, sem 3D: resumo, habilidades e experiência na primeira, e os 6 projetos com problema, solução e resultado na segunda. Desmarque "Cabeçalhos e rodapés" para ficar mais limpo.

## SQL Studio e terminal Python

- **SQL Studio:** um Postgres real roda no navegador com o schema `loja` (clientes, itens_pedido, metas, pedidos, produtos, vendedores). Tem navegador de objetos, abas de consulta, consultas prontas (CTE, RANK, LAG, FILTER), EXPLAIN e painel de saída com tipos das colunas. F5 ou Ctrl+Enter executa, e se houver texto selecionado só ele roda. O motor ocupa uns 13 MB e só baixa quando a demo abre.
- **Python:** modo Terminal (prompt `>>>`, histórico com ↑↓, Ctrl+L limpa) e modo Notebook. O `df` já vem carregado com pandas. O Pyodide vem do CDN jsDelivr, então precisa de internet.

## Desempenho e acessibilidade

- O 3D, a constelação, cada demo, o Postgres e o Python carregam sob demanda (lazy loading).
- O `PerformanceMonitor` do Drei reduz partículas, resolução e efeitos se o computador não aguentar 60 fps.
- **Celular:** 16 mil partículas e sem pós-processamento. Projetos em lista vertical (sem pin).
- **Reduzir movimento** (configuração do sistema): a cena fica parada, sem rolagem suave e sem animações.
- **Sem WebGL:** mostra uma imagem estática (`src/assets/fallback.jpg`).
- Navegação por teclado, foco visível, `Esc` fecha as demos, modo claro e escuro (lembrado no navegador).
- Som ambiente gerado com Web Audio, desligado por padrão (botão no topo).

## Dados

Todos os números vêm de uma loja fictícia gerada em `src/data/store.ts` com semente fixa: 400 clientes, 25 produtos e 3.000 pedidos em 2025. Os "Resultados" de cada projeto são calculados desses dados, então batem com as demos.
