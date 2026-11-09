# Laverie Premium Laundry — Jakarta SEO Update

## Changes made
- Updated default outlet data to the two locations supplied by the owner: PIK and GreenBay Pluit.
- Updated the PIK and GreenBay contact numbers, addresses, hours, service descriptions, and map destinations.
- Repositioned global metadata around the primary search intent: laundry premium Jakarta / Jakarta Utara.
- Added Open Graph and Twitter large-image metadata.
- Preserved the Google Search Console meta verification token and HTML verification file.
- Updated structured data to represent the organization and the two Jakarta-area laundry branches.
- Added `/laundry-premium-jakarta` as a substantive local-intent landing page.
- Added the new landing page to the XML sitemap.

## Important Google Sheets CMS note
The website's `getCMSContent()` function uses non-empty Google Sheets outlet data in preference to `data/outlets.ts`. If `GOOGLE_SCRIPT_URL` is configured and the Google Sheet already contains outlet rows, those rows can override the new default PIK and GreenBay details at runtime. Update the Outlets sheet/admin CMS with the same two outlet records (IDs `outlet-pik` and `outlet-greenbay`) and remove/deactivate obsolete Bali rows. Verify the live website after deployment.

## Before production
1. Confirm the GreenBay address spelling and phone number with the outlet owner.
2. Confirm whether the PIK location needs a more precise street/building address; the supplied image only gives the district-level address.
3. Confirm whether express service cutoff is 10:00 AM at both outlets (the supplied screenshots show this).
4. Run `npm ci`, `npm run build`, and `npm run lint`.
5. Deploy and test:
   - `/google1c3e5bc2121fd1ce.html`
   - `/robots.txt`
   - `/sitemap.xml`
   - `/laundry-premium-jakarta`
6. In Google Search Console, submit the sitemap and inspect/request indexing for the homepage and Jakarta landing page.

## SEO strategy notes
- Meta keywords are not a meaningful Google ranking lever. Search intent alignment, useful page content, local relevance, links, crawlability, and business profile consistency matter more.
- Do not promise a #1 ranking; no metadata change can guarantee ranking.
- Build separate location pages only when each has unique, accurate information and sufficient useful content. Avoid doorway pages that differ only by swapped location names.
- Keep NAP (business name, address, phone) consistent across the website, Google Business Profile, and reputable local directories.
- Add genuine project photos, service details, transparent package/pricing information, and real customer reviews with permission.
- Configure Google Business Profile for each eligible staffed customer-facing location, with accurate categories, hours, phone, map pin, and service area.
- Improve internal links from homepage, footer, service sections, and outlet cards to the Jakarta landing page.
- Measure impressions, clicks, queries, indexed URLs, and Core Web Vitals in Search Console and PageSpeed Insights after launch.


## Google Tag Manager
- Added GTM container `GTM-PXH657QD` globally in the root layout.
- Initializes `window.dataLayer` and the supplied `gtag('js', new Date())` call before the GTM container script.
- Adds the standard `gtm.start` / `gtm.js` dataLayer event so GTM page-load triggers initialize correctly.
- Loads `https://www.googletagmanager.com/gtm.js?id=GTM-PXH657QD` with Next.js `afterInteractive` strategy.
- Includes the standard noscript iframe fallback.
- After deployment, use Google Tag Assistant / GTM Preview to confirm container `GTM-PXH657QD` is detected and tags fire. Publish the GTM container workspace if it has not already been published.
