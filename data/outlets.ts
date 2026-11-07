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
  status?: string; // "Active" | "Inactive"
}

export const defaultOutlets: OutletItem[] = [
  {
    id: "outlet-pik",
    tabName: "PIK, Jakarta",
    name: "Laverie Premium Laundry PIK",
    phone: "+62 811-1907-8899",
    description:
      "Berlokasi strategis di Pantai Indah Kapuk (PIK). Antar langsung pakaian Anda atau atur layanan antar jemput express di lobi hotel dan villa.",
    description_en:
      "Conveniently situated in Pantai Indah Kapuk (PIK). Drop off your garments or coordinate express hotel lobby and villa pickup.",
    address: "Pantai Indah Kapuk, Jakarta Utara, DKI Jakarta",
    openingHours: "07:30 AM – 21:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Tersedia untuk hotel, villa, dan residensial di sekitar PIK & Jakarta Utara",
    dispatch_en: "Available for hotels, villas, and residences around PIK & North Jakarta",
    mapsUrl: "https://maps.app.goo.gl/aAEsvnwHZAUsbqmq9",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laverie%20Premium%20Laundry%20PIK&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Premium Laundry PIK! Saya ingin bertanya mengenai layanan laundry dan penjemputan.",
    whatsappMessage_en:
      "Hello Laverie Premium Laundry PIK! I want to ask about your laundry services and pickup.",
    status: "Active",
  },
  {
    id: "outlet-seminyak",
    tabName: "Seminyak, Bali",
    name: "Laverie Suite & Villa Hub Seminyak",
    phone: "+62 812-3890-1234",
    description:
      "Pusat layanan express valet dan sanitasi kain lembut yang melayani villa mewah dan hotel suite di seluruh Seminyak & Kerobokan.",
    description_en:
      "Dedicated express valet and gentle fabric sanitization hub catering to luxury villas and hotel suites across Seminyak & Kerobokan.",
    address: "Jl. Kayu Aya, Seminyak, Kuta, Badung, Bali",
    openingHours: "07:00 AM – 22:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Penjemputan concierge setiap hari di area Seminyak, Petitenget & Legian",
    dispatch_en: "Daily concierge collection across Seminyak, Petitenget & Legian",
    mapsUrl: "https://maps.google.com/?q=Seminyak+Bali",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Seminyak%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Suite & Villa Hub Seminyak! Saya ingin bertanya mengenai layanan laundry dan penjemputan.",
    whatsappMessage_en:
      "Hello Laverie Suite & Villa Hub Seminyak! I want to ask about your laundry services and pickup.",
    status: "Active",
  },
  {
    id: "outlet-canggu",
    tabName: "Canggu, Bali",
    name: "Laverie Eco Atelier Canggu",
    phone: "+62 813-5300-5678",
    description:
      "Studio cuci ozon ramah lingkungan kami melayani digital nomad, penghuni villa, dan wisatawan di kawasan pesisir Batu Bolong dan Berawa.",
    description_en:
      "Our sustainable ozone-wash studio serving digital nomads, resident villas, and travelers throughout the Batu Bolong and Berawa coastal enclaves.",
    address: "Jl. Pantai Batu Bolong, Canggu, Kuta Utara, Badung, Bali",
    openingHours: "08:00 AM – 20:00 PM Daily",
    dispatch: "Penjemputan depan pintu mencakup area Berawa, Batu Bolong & Pererenan",
    dispatch_en: "Doorstep pickup covering Berawa, Batu Bolong & Pererenan",
    mapsUrl: "https://maps.google.com/?q=Canggu+Bali",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Canggu%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Eco Atelier Canggu! Saya ingin bertanya mengenai layanan laundry dan penjemputan.",
    whatsappMessage_en:
      "Hello Laverie Eco Atelier Canggu! I want to ask about your laundry services and pickup.",
    status: "Active",
  },
];
