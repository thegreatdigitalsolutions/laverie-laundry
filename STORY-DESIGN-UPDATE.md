# Laverie Story-led Design Update

## Design direction
The homepage journey from section 3 to 6 is now treated as one editorial story: understanding the garment, choosing its care, feeling informed, then finding the nearest Laverie.

## Homepage sequence
1. Beranda — unchanged
2. Filosofi Kami — unchanged
3. Layanan — editorial chapter 01, warm stone/sage palette, numbered service narrative and clear service details
4. Pricelist — editorial chapter 02, warm neutral transition and existing CMS-driven package cards
5. FAQ — editorial chapter 03, calm reassurance-led layout and existing CMS accordion content
6. Outlet — editorial chapter 04, location discovery and existing outlet selector, maps, phone and WhatsApp actions

Testimonials and trust metrics remain available before the service journey so the requested 3–6 sequence stays uninterrupted.

## Preserved
- Home and Philosophy component source files were not modified.
- CMS data and admin management remain unchanged.
- Package, FAQ and outlet data continue to come from existing CMS content.
- Outlet selection, nearest outlet behavior, Google Maps, phone and WhatsApp links are retained.
- Existing language and theme support are retained.

## Validation
`npm run build` could not run in this environment because the extracted `node_modules` directory does not contain the Next.js executable (`next: not found`). Run `npm ci` followed by `npm run build` before deployment.
