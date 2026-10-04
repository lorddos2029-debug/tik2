# Corrigir falha intermitente nas páginas

## Objetivo
Eliminar a tela genérica de erro que aparece ocasionalmente no `/travesseiro` e proteger as demais páginas contra a mesma causa.

## Implementação
- Carregar o script de rastreamento UTMify somente depois que a página React terminar de iniciar.
- Impedir que esse script altere os links antes da inicialização, evitando a divergência já registrada entre o HTML do servidor e o navegador.
- Manter o rastreamento global e os parâmetros UTM existentes, sem alterar o funil, preços ou conteúdo.

## Validação
- Recarregar `/travesseiro`, `/` e `/checkout?product=travesseiro` repetidamente.
- Confirmar ausência da tela de erro, de divergências de inicialização e de erros no navegador.
- Confirmar compilação válida.
