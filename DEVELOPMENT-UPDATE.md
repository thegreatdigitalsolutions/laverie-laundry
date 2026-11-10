# Laverie Website Development Update

## Navigation and section flow
- Preserved the existing Hero (Beranda) and Philosophy (Filosofi Kami) components without editing their source files.
- Updated desktop/mobile navigation order to: Beranda, Filosofi Kami, Layanan, Pricelist, FAQ, Outlet.
- Updated active-section tracking to include Outlet.
- Reordered the homepage content so services and pricing appear before FAQ, with Outlet as the final main content section.

## Outlet presentation
- Redesigned the Outlet section with a quieter premium visual direction: warm neutral surfaces, muted sage accents, refined typography, generous spacing, and a responsive information/map layout.
- Outlet selection, CMS-driven outlet data, map embeds, phone links, Google Maps links, and WhatsApp actions remain connected to the existing data/context layer.
- Light and dark themes remain supported.

## Validation
- A production build was not run because dependency installation (`npm ci`) timed out in the execution environment.
- Run `npm ci` and `npm run build` in the deployment environment before publishing.


## V5 — Service taxonomy & refined motion
- Rebuilt the Services section from the supplied Laverie price list into seven clear service families: everyday garments; batik and delicate/formal wear; bags and accessories; home linen and bedding; footwear; baby gear; curtains and home textiles.
- Each service family has its own Lucide icon and example items grounded in the supplied price list.
- Replaced the static service grid with a horizontally scrollable, snap-aligned service rail, with accessible previous/next controls and touch scrolling.
- Added restrained editorial entrance motion, subtle card lift, icon micro-interactions, and reduced-motion support.
- Refined remaining cyan navigation/FAQ/hero accents to the existing sage palette for a more cohesive premium look.
- Preserved native page scrolling and the V4 section order.
