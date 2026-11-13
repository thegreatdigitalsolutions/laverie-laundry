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
 * Opens the official Laverie Price List brochure with print and download controls
 */
export function printBrochure(products: ProductItem[], isEn: boolean = false) {
  const printWindow = window.open('', '_blank', 'width=1200,height=900');
  if (!printWindow) {
    alert(
      isEn
        ? 'Please allow pop-ups to view or print the price list brochure.'
        : 'Mohon izinkan pop-up di browser untuk mencetak atau mengunduh brosur daftar harga.'
    );
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'id'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Laverie Premium Laundry - Official Price List Brochure</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #0E1A1E;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #122125;
      padding: 14px 28px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .toolbar-title {
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.05em;
      color: #E2ECE9;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      padding: 9px 18px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 9999px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: none;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background: #607F78;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(96,127,120,0.3);
    }
    .btn-primary:hover {
      background: #4D6962;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.12);
      color: #FFFFFF;
      border: 1px solid rgba(255,255,255,0.15);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.2);
    }
    .preview-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px 20px;
      min-height: calc(100vh - 65px);
    }
    .brochure-img {
      max-width: 100%;
      height: auto;
      max-height: 88vh;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    @media print {
      .toolbar { display: none !important; }
      body { background: #FFFFFF !important; }
      .preview-container { padding: 0 !important; }
      .brochure-img {
        width: 100vw !important;
        height: 100vh !important;
        max-height: none !important;
        object-fit: contain !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-title">
      Laverie Premium Laundry &bull; ${isEn ? 'Official Price List Brochure' : 'Brosur Daftar Harga Resmi'}
    </div>
    <div class="toolbar-actions">
      <a href="/laverie-price-list-brochure.png" download="Laverie-Price-List-Brochure.png" class="btn btn-primary">
        <span>⬇</span>
        <span>${isEn ? 'Download' : 'Unduh'}</span>
      </a>
      <button onclick="window.print()" class="btn btn-secondary">
        <span>🖨️</span>
        <span>${isEn ? 'Print' : 'Cetak'}</span>
      </button>
      <button onclick="window.close()" class="btn btn-secondary">
        <span>✕</span>
        <span>${isEn ? 'Close' : 'Tutup'}</span>
      </button>
    </div>
  </div>
  <div class="preview-container">
    <img src="/images/laverie-price-list-brochure-hd.jpg" alt="Laverie Price List Brochure" class="brochure-img" />
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
