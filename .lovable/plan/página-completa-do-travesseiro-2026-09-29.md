# Página completa do travesseiro

## Objetivo
Transformar `/travesseiro` em uma página de produto com a mesma estrutura, aparência e interações da página principal da motosserra, mantendo o produto Abranuv PRO2.0 por R$ 69,90.

## Implementação
- Reutilizar a estrutura completa da página principal: galeria, faixa de preço e desconto, oferta relâmpago com contador, parcelamento, frete grátis, prazo dinâmico, seleção de variante, proteção do cliente, loja, avaliações, descrição e barra fixa de compra.
- Tornar a página de produto configurável por catálogo, sem alterar visualmente a página da motosserra.
- Completar o catálogo do travesseiro com preço anterior, desconto, parcelas, nota, vendas, variante, loja e especificações verificáveis.
- Usar as imagens já coletadas do anúncio e incorporar vídeos de criadores, capas e fotos de avaliações que puderem ser obtidos da página do TikTok Shop ou de índices públicos do mesmo produto.
- Quando algum conteúdo do TikTok estiver bloqueado pelo captcha e não puder ser verificado, não misturar mídia da motosserra nem inventar material visual; a seção correspondente ficará fiel usando apenas conteúdo real disponível.
- Manter as imagens do travesseiro em `public/products/travesseiro/` para funcionarem também na Vercel.
- Direcionar os botões de compra ao fluxo existente, preservando a quantidade escolhida.

## Validação
- Conferir `/travesseiro` em celular e desktop, comparando as seções com `/p/motoserra`.
- Verificar carregamento de todas as imagens e vídeos, contador, proteção do cliente, prazo dinâmico e navegação dos botões.
- Confirmar que `/p/motoserra` continua sem regressões e que a compilação permanece limpa.
