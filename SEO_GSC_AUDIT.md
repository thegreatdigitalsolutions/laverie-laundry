# Laverie Premium Laundry — Google Search Console & SEO Audit

## Google Search Console verification

The project includes both verification methods supplied by the site owner:

1. HTML file: `public/google1c3e5bc2121fd1ce.html`
   - After deployment, it must be publicly accessible at:
     `https://www.laveriepremiumlaundry.com/google1c3e5bc2121fd1ce.html`
   - The file body must remain exactly:
     `google-site-verification: google1c3e5bc2121fd1ce.html`
2. HTML meta tag is generated from Next.js metadata:
   `<meta name="google-site-verification" content="2X7rjRsxv6UETDTSsI76m5HaislNdE5uGmAob0UyeTI" />`

Do not rename the HTML verification file or change its body.

## Technical SEO changes

- Canonical and metadata base point to `https://www.laveriepremiumlaundry.com/`.
- Indonesian title and description target premium laundry, 12-hour express laundry, hotel/doorstep pickup, PIK Jakarta, Seminyak, and Canggu.
- Open Graph and Twitter summary metadata are configured.
- `app/robots.ts` publishes crawler rules and the sitemap location. Admin paths are disallowed.
- `app/sitemap.ts` publishes the canonical homepage.
- `/admin` receives `noindex,nofollow` metadata.
- Homepage includes Organization, WebSite, and DryCleaningOrLaundry JSON-LD structured data.

## SEO findings and next priorities

### Current strengths
- Homepage has one primary H1 and a clear set of service sections.
- Important service content, package content, and FAQs are rendered through the homepage component tree.
- Main hero image has descriptive alternative text and is marked as a priority image.
- The business has identifiable service areas and contact information in the outlet data.
- Canonical URL, crawler directives, sitemap, and business structured data are now present.

### Remaining opportunities
1. The website is primarily a one-page site. Add crawlable, unique pages for major intent clusters, for example:
   - `/laundry-express-12-jam`
   - `/laundry-pik-jakarta`
   - `/laundry-seminyak-bali`
   - `/laundry-canggu-bali`
   - `/dry-cleaning-pakaian-premium`
   Each page should contain genuinely distinct, useful local/service information; do not publish thin duplicate pages.
2. The Indonesian/English switch currently changes content in the client without separate indexable URLs. For international SEO, create dedicated localized routes such as `/id/` and `/en/`, then add reciprocal `hreflang` and self-canonical tags.
3. Verify every operational, environmental, hygiene, and turnaround claim (for example ozone sanitization, eco-certified products, and 12-hour delivery) is accurate and consistently supported by real service operations.
4. Add unique descriptive copy to each service and outlet page, including exact service coverage, operating hours, pricing conditions, and pickup rules.
5. Use original, compressed WebP/AVIF imagery with descriptive filenames and useful alt text. Add a dedicated 1200×630 social sharing image before configuring `openGraph.images`.
6. Keep customer testimonials authentic and permissioned. Do not add aggregate review/rating structured data unless it is eligible and supported by visible, verifiable content.
7. Ensure the production domain resolves consistently to the `www` canonical host with a permanent redirect from the non-www variant, and serves HTTPS without redirect chains.
8. Monitor Core Web Vitals, mobile usability, crawl errors, indexing status, and search queries in Search Console after deployment.

## Deployment and Search Console checklist

1. Deploy this updated project to the production domain.
2. Open the HTML verification URL above and confirm the exact verification text is returned.
3. View the homepage source and confirm the Google verification meta tag is present in `<head>`.
4. In Google Search Console, verify the `https://www.laveriepremiumlaundry.com/` URL-prefix property (or verify the corresponding Domain property using DNS separately).
5. Submit `https://www.laveriepremiumlaundry.com/sitemap.xml`.
6. Use URL Inspection on the homepage, run a live test, and request indexing.
7. Check `https://www.laveriepremiumlaundry.com/robots.txt` and `https://www.laveriepremiumlaundry.com/sitemap.xml` after deployment.

A sitemap submission and indexing request are signals to Google, not a guarantee of indexing or ranking. Google decides whether and when a URL is indexed.
