# Checkout único por produto

## Objetivo
Fazer o botão de compra de qualquer página salvar o produto selecionado e abrir o mesmo checkout, preenchido automaticamente com nome, imagem, preço, desconto, frete e quantidade corretos.

## Implementação
- Criar um catálogo unificado de produtos compráveis com uma identificação estável para motosserra e travesseiro.
- Salvar o produto ativo ao clicar em “Comprar agora”, “Adicionar ao carrinho” ou ao iniciar pelo endereço.
- Converter o checkout existente em uma página compartilhada em `/checkout`, mantendo o visual atual e lendo o produto selecionado.
- Manter `/p/motoserra/checkout` funcionando como redirecionamento compatível para não quebrar links antigos.
- Fazer `/endereco`, `/pix` e `/meus-pedidos` preservarem os dados reais do produto escolhido.
- Enviar à gateway, Meta Pixel e UTMify o ID, nome, preço e quantidade do produto correto.

## Regra para próximos produtos
Cada novo produto será adicionado uma única vez ao catálogo unificado; sua página apenas selecionará esse ID antes de abrir `/checkout`, sem criar outro checkout.

## Validação
- Testar motosserra e travesseiro desde a página do produto até o checkout.
- Confirmar no travesseiro: imagem Abranuv, preço unitário R$ 69,90 e total proporcional à quantidade.
- Confirmar que Pix e rastreamento recebem os dados do produto ativo.
- Verificar telas mobile e desktop, imagens e ausência de erros.
