<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Product images live under `public/products/<product>/` and use root-relative URLs so every deployment provider serves them directly.
- Meta Pixel runs globally; InitiateCheckout fires after valid address submission, while Purchase fires only after the Pix gateway confirms payment, deduplicated by event ID across browser and Conversions API.
- UTMify receives the same Pix order ID as waiting_payment when generated and paid only after gateway confirmation; original UTC creation time and persisted UTMs are reused on updates.
- Every sellable product is registered in the shared commerce catalog and selects its key before opening `/checkout`, so one checkout serves all present and future product pages consistently.
- Pix payment status polling is shared by both `/pix` and `/meus-pedidos`, and marks tracking complete only after Meta CAPI and UTMify both accept the paid event, so leaving the QR page does not silently lose Purchase reporting.
