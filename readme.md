# Fit Point — site de apresentação

Operação de nutrição funcional em academias, conduzida por Distribuidor Independente Herbalife.

Autor: Eduardo Sidegum — Distribuidor Independente Herbalife
Rua Salgado Filho, 15 — Pátria Nova — Novo Hamburgo/RS — CEP 95320-070
WhatsApp: +55 51 99966-3200

---

## Arquivos

Sete páginas HTML. Cinco indexáveis, duas `noindex`.

| Arquivo | Indexação | Funil |
|---|---|---|
| `index.html` | index, follow | 1 · entrada |
| `conceito.html` | index, follow | 1 · como funciona |
| `faq.html` | index, follow | 1 · dez dúvidas |
| `simulador.html` | index, follow | 1 · cálculo aberto |
| `pre-cadastro.html` | noindex, follow | 1 · conversão |
| `detalhes-operacionais.html` | noindex, nofollow | 2 · aprofundamento |
| `politica-de-privacidade.html` | index, follow | LGPD |

Assets em `assets/css/`, `assets/js/`, `assets/img/` e `assets/pdf/`.

---

## Publicação

1. Enviar o conteúdo de `fitpoint/` para o mesmo caminho no servidor.
2. Confirmar HTTPS.
3. Enviar `sitemap.xml` no Google Search Console.
4. Inspecionar a URL raiz e solicitar indexação.
5. Testar em 320 px, 768 px e 1280 px.
6. Testar o FAQ em Chrome, Firefox e Safari, desktop e celular.

## Teste sequencial recomendado

Um arquivo por vez, nesta ordem:

1. `assets/css/fitpoint.css` — abrir `index.html` e confirmar layout.
2. `faq.html` — clicar em três perguntas e confirmar abertura e fechamento.
3. `assets/js/video-facade.js` — clicar na fachada de vídeo e confirmar carregamento.
4. `simulador.html` — alterar valores e confirmar recálculo.
5. `pre-cadastro.html` — preencher e confirmar abertura do WhatsApp.
6. `detalhes-operacionais.html` — confirmar `noindex` no código-fonte e FAQ funcional.
7. `sitemap.xml` e `robots.txt` — validar em validador de sitemap.

---

## Pendências bloqueantes

1. **Salvaguardas oficiais de produto** (item 3.1). Não constam de nenhum material
   disponível. Bloqueia todo conteúdo sobre produto.
2. **Requisitos de operador de espaço comercial** (item 6.6). Sem detalhamento.
3. **Aprovação prévia da sinalização exterior** (item 6.7). Sem prazo declarado.
4. **Anterioridade de marca no INPI**, se o nome virar marca.
5. **Imagens `img1.webp` a `img6.webp`.** Devem ser baixadas de canal oficial para
   distribuidores, não de grupo de mensagens — item 3.6 exige plataforma oficial.

## Pendências não bloqueantes

- Horário de funcionamento para o schema `LocalBusiness`.
- `priceRange` omitido: faixa de preço sem base é alegação sem lastro.
- Vídeos de produto e receita retidos até a salvaguarda oficial existir.

---

## Decisões de conformidade

- Identificação "Distribuidor Independente Herbalife" visível em todas as páginas,
  com nome completo e endereço comercial. Itens 1.2 e 3.2.
- Nenhum preço, desconto, ponto de volume ou nível de margem em página pública. Item 3.5.
- Nenhuma referência a franquia, rede, COF ou licenciamento. Item 1.2 e 6.7.
- Simulador opera apenas com dados digitados pelo usuário.
- Vídeos em `youtube-nocookie`, carregados somente após clique.
- Formulário não envia dados a servidor: monta mensagem e abre WhatsApp.
- Nenhum rastreamento ativo.