export interface OutletItem {
  id: string;
  tabName: string;
  name: string;
  phone?: string;
  description: string;
  description_en?: string;
  address: string;
  openingHours: string;
  dispatch: string;
  dispatch_en?: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  whatsappMessage: string;
  whatsappMessage_en?: string;
  status?: string;
}

export const defaultOutlets: OutletItem[] = [
  {
    id: "outlet-pik",
    tabName: "PIK, Jakarta",
    name: "Laverie Premium Laundry PIK",
    phone: "08170078883",
    description:
      "Berlokasi di kawasan Pantai Indah Kapuk (PIK), Jakarta Utara. Pelanggan dapat mengantarkan pakaian langsung ke outlet atau mengatur layanan penjemputan ekspres dari lobi hotel, vila, dan hunian di sekitar PIK dan Jakarta Utara.",
    description_en:
      "Located in Pantai Indah Kapuk (PIK), North Jakarta. Customers can drop off garments or arrange express pickup from hotel lobbies, villas, and residences around PIK and North Jakarta.",
    address: "Pantai Indah Kapuk (PIK), Jakarta Utara, DKI Jakarta",
    openingHours: "07:30 AM – 09:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Tersedia untuk hotel, vila, dan hunian di sekitar PIK dan Jakarta Utara.",
    dispatch_en: "Available for hotels, villas, and residences around PIK and North Jakarta.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Laverie+Premium+Laundry+PIK+Jakarta",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laverie%20Premium%20Laundry%20PIK%20Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Premium Laundry PIK! Saya ingin bertanya mengenai layanan laundry dan penjemputan.",
    whatsappMessage_en:
      "Hello Laverie Premium Laundry PIK! I would like to ask about your laundry and pickup services.",
    status: "Active",
  },
  {
    id: "outlet-greenbay",
    tabName: "GreenBay",
    name: "Laverie Premium Laundry GreenBay",
    phone: "08170078884",
    description:
      "Pusat layanan valet ekspres dan sanitasi pakaian dengan perawatan lembut, khusus melayani vila, hotel, apartemen, dan hunian di kawasan GreenBay Pluit serta Jakarta Utara.",
    description_en:
      "An express valet and garment sanitization hub providing gentle fabric care for villas, hotels, apartments, and residences around GreenBay Pluit and North Jakarta.",
    address:
      "Bay Walk Mall, Jl. Pluit Karang Ayu Barat LGMF 3, RT.20/RW.2, Pluit, Penjaringan, Jakarta Utara, DKI Jakarta 14450",
    openingHours: "07:00 AM – 10:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Layanan penjemputan harian di seluruh area layanan GreenBay Pluit dan sekitarnya.",
    dispatch_en: "Daily pickup service throughout the GreenBay Pluit service area and surrounding neighborhoods.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bay+Walk+Mall%2C+Pluit+Karang+Ayu+Barat%2C+Jakarta+14450",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Bay%20Walk%20Mall%2C%20Pluit%20Karang%20Ayu%20Barat%2C%20Jakarta%2014450&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Premium Laundry GreenBay! Saya ingin bertanya mengenai layanan laundry dan penjemputan.",
    whatsappMessage_en:
      "Hello Laverie Premium Laundry GreenBay! I would like to ask about your laundry and pickup services.",
    status: "Active",
  },
];
