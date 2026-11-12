import { ProductItem } from "@/data/products";

export interface CategorizedGroup {
  id: string;
  name: string;
  name_en: string;
  items: ProductItem[];
}

export const productNameTranslations: Record<string, string> = {
  "Batik Pendek": "Short Sleeve Batik",
  "Batik Panjang": "Long Sleeve Batik",
  Blazer: "Tailored Blazer",
  "Blouse Pendek": "Short Sleeve Blouse",
  "Blouse Panjang": "Long Sleeve Blouse",
  Hoodie: "Hoodie / Sweatshirt",
  "Jas Panjang": "Overcoat / Long Suit",
  Jaket: "Casual Jacket",
  "Jaket Jeans": "Denim / Jeans Jacket",
  "Jaket Salju": "Down / Winter Puffer Jacket",
  "Jaket Kulit": "Leather Jacket",
  "Kemeja Pendek": "Short Sleeve Shirt",
  "Kemeja Panjang": "Long Sleeve Shirt",
  "Kaos Pendek": "Short Sleeve T-Shirt",
  "Kaos Panjang": "Long Sleeve T-Shirt",
  "Kaos Polo Pendek": "Short Polo Shirt",
  "Kaos Polo Panjang": "Long Polo Shirt",
  "Rompi / Vest": "Vest / Waistcoat",
  "Sweater / Cardigan": "Sweater / Knit Cardigan",
  "Celana Pendek": "Shorts",
  "Celana Panjang": "Trousers / Long Pants",
  "Celana Kulit": "Leather Pants",
  "Rok Pendek": "Short Skirt",
  "Rok Panjang": "Long / Maxi Skirt",
  "Rok Kulit": "Leather Skirt",
  Coat: "Overcoat / Trench Coat",
  "Gaun Pendek": "Short Dress / Cocktail Dress",
  "Gaun Panjang": "Long Evening Gown",
  "Gaun Kulit": "Leather Dress",
  "Gaun Manik Pendek": "Short Beaded Gown",
  "Gaun Manik Panjang": "Long Beaded Gown",
  "Gaun Mandi": "Bathrobe",
  "Piyama Set": "Pajama Set",
  "Jump Suit": "Jumpsuit",
  Dasi: "Necktie / Silk Tie",
  "Handuk Kecil": "Hand Towel",
  "Handuk Besar": "Bath Towel",
  "Kaos Kaki": "Socks (Pair)",
  Mukenah: "Prayer Robe (Mukenah)",
  Sajadah: "Prayer Rug / Mat",
  "Sapu Tangan": "Handkerchief",
  "Selendang / Scarf": "Scarf / Silk Shawl",
  Topi: "Hat / Cap",
  Boots: "Boots (Pair)",
  Sandal: "Sandals / Slides",
  Sepatu: "Shoes / Sneakers",
  "Sepatu Kulit": "Leather Dress Shoes",
  "Koper Kecil": "Cabin Luggage / Small Suitcase",
  "Koper Sedang 60cm": "Medium Suitcase (60 cm)",
  "Koper Besar 120cm": "Large Suitcase (120 cm)",
  "Boneka Kecil >20cm": "Small Plush Doll (>20 cm)",
  "Boneka Sedang >70cm": "Medium Plush Doll (>70 cm)",
  "Boneka Besar >120cm": "Giant Plush Doll (>120 cm)",
  "Bantal / Guling": "Pillow / Bolster",
  "Bed Cover Single": "Single Bed Cover",
  "Bed Cover Queen": "Queen Bed Cover",
  "Bed Cover King": "King Bed Cover",
  "Matras Protector": "Mattress Protector",
  "Sprei Set": "Bedsheet Set",
  "Selimut Kecil": "Single Blanket",
  "Selimut Besar": "Double / Large Blanket",
  "Gorden (/m²)": "Curtains (/m²)",
  "Vitrase (/m²)": "Sheer Curtains (/m²)",
  "Karpet (/m²)": "Carpet / Rug (/m²)",
  "Kasur (/m²)": "Mattress (/m²)",
  Stroller: "Baby Stroller",
  "Car Seat": "Child Car Seat",
};

export function getLocalizedProductName(
  item: ProductItem,
  isEn: boolean
): string {
  if (!isEn) return item.name;
  if (item.name_en) return item.name_en;
  return productNameTranslations[item.name] || item.name;
}

export function getLocalizedProductCategory(
  item: ProductItem,
  isEn: boolean
): string {
  const cat = getProductCategory(item.name);
  return isEn ? cat.en : cat.id;
}

export function getProductCategory(name: string): { id: string; en: string } {
  const n = name.toLowerCase();
  if (
    [
      "bed cover",
      "sprei",
      "selimut",
      "bantal",
      "guling",
      "matras",
      "gorden",
      "vitrase",
      "karpet",
      "kasur",
    ].some((k) => n.includes(k))
  ) {
    return { id: "Bedding & Home Linen", en: "Bedding & Home Linen" };
  }
  if (["sepatu", "sandal", "boots", "koper"].some((k) => n.includes(k))) {
    return { id: "Sepatu, Tas & Koper", en: "Shoes, Bags & Luggage" };
  }
  if (
    ["celana", "rok", "gaun", "piyama", "jump suit", "coat"].some((k) =>
      n.includes(k)
    )
  ) {
    return { id: "Bawahan & Gaun", en: "Bottoms & Dresses" };
  }
  if (
    [
      "batik",
      "blazer",
      "blouse",
      "hoodie",
      "jas",
      "jaket",
      "kemeja",
      "kaos",
      "rompi",
      "sweater",
      "vest",
      "cardigan",
    ].some((k) => n.includes(k))
  ) {
    return { id: "Atasan & Luaran", en: "Tops & Outerwear" };
  }
  return { id: "Aksesoris & Perlengkapan", en: "Accessories & Essentials" };
}

export function formatProductPrice(price: string | number): string {
  if (typeof price === "string" && price.startsWith("Rp")) return price;
  const num =
    typeof price === "number"
      ? price
      : parseInt(String(price).replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return String(price);
  return `Rp ${num.toLocaleString("id-ID")}`;
}

export function groupProductsByCategory(
  products: ProductItem[]
): CategorizedGroup[] {
  const order = [
    { id: "Atasan & Luaran", en: "Tops & Outerwear" },
    { id: "Bawahan & Gaun", en: "Bottoms & Dresses" },
    { id: "Bedding & Home Linen", en: "Bedding & Home Linen" },
    { id: "Sepatu, Tas & Koper", en: "Shoes, Bags & Luggage" },
    { id: "Aksesoris & Perlengkapan", en: "Accessories & Essentials" },
  ];

  const groups: Record<string, ProductItem[]> = {
    "Atasan & Luaran": [],
    "Bawahan & Gaun": [],
    "Bedding & Home Linen": [],
    "Sepatu, Tas & Koper": [],
    "Aksesoris & Perlengkapan": [],
  };

  products.forEach((p) => {
    const cat = p.category || getProductCategory(p.name).id;
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(p);
  });

  return order.map((o) => ({
    id: o.id,
    name: o.id,
    name_en: o.en,
    items: groups[o.id] || [],
  }));
}

/**
 * Generates an elegant print-ready A4 brochure and triggers window.print()
 */
export function printBrochure(products: ProductItem[], isEn: boolean = false) {
  const categorized = groupProductsByCategory(products);
  const now = new Date();
  const dateStr = now.toLocaleDateString(isEn ? "en-US" : "id-ID", {
    month: "long",
    year: "numeric",
  });

  const printWindow = window.open("", "_blank", "width=950,height=1100");
  if (!printWindow) {
    alert(
      isEn
        ? "Please allow pop-ups to download or print the price list brochure."
        : "Mohon izinkan pop-up di browser untuk mencetak atau mengunduh brosur daftar harga."
    );
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="${isEn ? "en" : "id"}">
<head>
  <meta charset="utf-8" />
  <title>Laverie Premium Laundry - Official Price List Brochure</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1A2421;
      background: #FFFFFF;
      margin: 0;
      padding: 24px;
      line-height: 1.35;
    }
    .print-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0E1B19;
      color: #FFFFFF;
      padding: 10px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    @media print {
      .print-controls { display: none !important; }
      body { padding: 0 !important; }
    }
    .btn-print {
      background: #25D366;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    .btn-close {
      background: rgba(255,255,255,0.2);
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }

    /* Brochure Header */
    .brochure-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #203530;
      padding-bottom: 14px;
      margin-bottom: 16px;
    }
    .logo-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-img {
      height: 48px;
      width: auto;
      object-fit: contain;
    }
    .brand-title {
      font-family: 'Times New Roman', serif;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 0.08em;
      color: #10231F;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-tagline {
      font-size: 9px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #617772;
      font-family: -apple-system, sans-serif;
      margin-top: 2px;
    }
    .header-contacts {
      text-align: right;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 10.5px;
      color: #3C4E49;
    }
    .badge-free {
      display: inline-block;
      background: #E8F3EE;
      color: #1A564A;
      font-weight: bold;
      font-size: 9.5px;
      padding: 3px 8px;
      border-radius: 4px;
      margin-top: 4px;
      border: 1px solid #B8D8CE;
    }

    /* Title banner */
    .title-banner {
      text-align: center;
      margin-bottom: 18px;
    }
    .title-banner h1 {
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin: 0;
      color: #10231F;
    }
    .title-banner p {
      font-style: italic;
      font-size: 11px;
      color: #617772;
      margin: 3px 0 0 0;
    }

    /* Grid layout for categories */
    .categories-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 22px;
      row-gap: 14px;
    }
    .cat-block {
      break-inside: avoid;
    }
    .cat-heading {
      font-family: -apple-system, sans-serif;
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #1A564A;
      border-bottom: 1px solid #D2DFDA;
      padding-bottom: 3px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }
    .item-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 10px;
      padding: 2px 0;
      border-bottom: 1px dotted #E2E8E5;
    }
    .item-name {
      color: #263330;
      font-family: -apple-system, sans-serif;
      font-weight: 500;
    }
    .item-price {
      font-weight: 700;
      color: #10231F;
      white-space: nowrap;
      font-family: -apple-system, monospace;
      padding-left: 8px;
    }

    /* Footer */
    .brochure-footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #D2DFDA;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: -apple-system, sans-serif;
      font-size: 9px;
      color: #617772;
    }
  </style>
</head>
<body>
  <div class="print-controls">
    <div><strong>Laverie Laundry</strong> — Printable Price List Brochure</div>
    <div style="display: flex; gap: 8px;">
      <button class="btn-print" onclick="window.print()">🖨️ ${isEn ? "Print / Save PDF" : "Cetak / Simpan PDF"}</button>
      <button class="btn-close" onclick="window.close()">${isEn ? "Close" : "Tutup"}</button>
    </div>
  </div>

  <header class="brochure-header">
    <div class="logo-box">
      <img src="${window.location.origin}/logo/laverie-logo.png" alt="Laverie" class="logo-img" />
      <div>
        <h1 class="brand-title">LAVERIE</h1>
        <div class="brand-tagline">PREMIUM FABRIC CARE & VALET ATELIER</div>
      </div>
    </div>
    <div class="header-contacts">
      <div><strong>Hotline Concierge & Pickup:</strong></div>
      <div>PIK 1 & PIK 2: +62 817-007-8883</div>
      <div>Greenbay Pluit: +62 817-007-8884</div>
      <div class="badge-free">GRATIS Antar Jemput (Radius 5 km)</div>
    </div>
  </header>

  <div class="title-banner">
    <h1>${isEn ? "Official Price List & Service Menu" : "Daftar Tarif Resmi & Menu Perawatan"}</h1>
    <p>${isEn ? `Rates valid as of ${dateStr} · Individual wash per machine with ozone sterilization` : `Berlaku mulai ${dateStr} · Standar 1 mesin 1 pelanggan dengan sterilisasi ozon`}</p>
  </div>

  <main class="categories-container">
    ${categorized
      .map(
        (group) => `
      <div class="cat-block">
        <div class="cat-heading">
          <span>${isEn ? group.name_en : group.name}</span>
          <span>(${group.items.length})</span>
        </div>
        <ul class="item-list">
          ${group.items
            .map(
              (item) => `
            <li class="item-row">
              <span class="item-name">${getLocalizedProductName(item, isEn)}</span>
              <span class="item-price">${formatProductPrice(item.price)}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `
      )
      .join("")}
  </main>

  <footer class="brochure-footer">
    <div>
      <strong>LAVERIE ATELIER:</strong> Rukan Gold Coast PIK · Bay Walk Mall LGMF 3 Pluit | www.laveriepremiumlaundry.com
    </div>
    <div>
      *Harga dapat disesuaikan untuk bahan sutra couture khusus atau pengerjaan kilat same-day.
    </div>
  </footer>

  <script>
    window.onload = function() {
      // Auto trigger print dialog after assets load
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

