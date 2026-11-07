export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  price: string;
  unit: string;
  turnaround: string;
  turnaround_en?: string;
  description: string;
  description_en?: string;
  features: string[];
  features_en?: string[];
  popular?: boolean;
  whatsappMessage: string;
  whatsappMessage_en?: string;
}

export const packages: PackageItem[] = [
  {
    id: "regular",
    name: "Regular Care",
    price: "Rp 15.000",
    unit: "/ KG",
    turnaround: "24 - 48 Jam",
    turnaround_en: "24 - 48 Hours",
    description: "Perawatan menyeluruh untuk pakaian sehari-hari dan kebutuhan penting Anda.",
    description_en: "Comprehensive care for your everyday garments and essentials.",
    features: [
      "Pencucian lembut dengan suhu terkontrol",
      "Siklus pengeringan tumble yang lembut",
      "Lipatan rapi & kemasan standar hotel",
      "Pelembut kain tersertifikasi ramah lingkungan",
      "Gratis tas laundry standar",
    ],
    features_en: [
      "Gentle temperature-controlled wash",
      "Soft tumble dry cycle",
      "Neat hotel-grade fold & packaging",
      "Eco-certified fabric softener",
      "Complimentary standard bag",
    ],
    popular: false,
    whatsappMessage: "Halo Laverie! Saya ingin memesan paket Regular Care (/KG).",
    whatsappMessage_en: "Hello Laverie! I would like to order the Regular Care package (/KG).",
  },
  {
    id: "express",
    name: "12H Hotel Express",
    badge: "FEATURED",
    price: "Rp 25.000",
    unit: "/ KG",
    turnaround: "Hari yang Sama (12 Jam)",
    turnaround_en: "Same Day (12 Hours)",
    description: "Dirancang khusus untuk perjalanan bisnis, liburan singkat, dan jadwal mendesak.",
    description_en: "Tailored for business trips, short getaways, and urgent itineraries.",
    features: [
      "Prioritas express selesai di hari yang sama",
      "Antar jemput lobi hotel / pintu sebelum jam 10:00",
      "Pakaian diantar kembali sebelum jam 22:00 malam",
      "Setrika uap penghilang kerutan pakaian",
      "Sanitasi ozon anti-bakteri",
      "Kemasan steril siap bepergian",
    ],
    features_en: [
      "Priority same-day express turnaround",
      "Hotel lobby or doorstep pickup before 10 AM",
      "Evening return before 10 PM",
      "Wrinkle-release steam press",
      "Anti-bacterial ozone sanitization",
      "Sealed travel-ready packaging",
    ],
    popular: true,
    whatsappMessage: "Halo Laverie! Saya ingin memesan paket 12H Hotel Express (Same Day).",
    whatsappMessage_en: "Hello Laverie! I would like to book the 12H Hotel Express package (Same Day).",
  },
  {
    id: "premium",
    name: "Delicate & Premium",
    badge: "BESPOKE CARE",
    price: "Rp 35.000",
    unit: "/ Piece / KG",
    turnaround: "24 - 36 Jam",
    turnaround_en: "24 - 36 Hours",
    description: "Perawatan khusus untuk jas, sutra, pakaian desainer, dan linen halus.",
    description_en: "Specialized gentle care for suits, silks, designer wear, and fine linen.",
    features: [
      "Pemeriksaan jenis kain & penanganan noda khusus",
      "Deterjen premium yang telah teruji dermatologis",
      "Setrika uap manual & perapian presisi tinggi",
      "Gantungan pakaian & penutup debu bersirkulasi udara",
      "Ideal untuk blazer bisnis, gaun & bahan wol",
    ],
    features_en: [
      "Individual fabric inspection & spot treatment",
      "Dermatologically tested premium detergent",
      "Hand steam & artisan pressing",
      "Garment hanger & breathable dust cover",
      "Ideal for business blazers, dresses & woolens",
    ],
    popular: false,
    whatsappMessage: "Halo Laverie! Saya ingin bertanya tentang paket Delicate & Premium Care.",
    whatsappMessage_en: "Hello Laverie! I would like to enquire about the Delicate & Premium Care package.",
  },
];
