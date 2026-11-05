export interface OutletItem {
  id: string;
  tabName: string;
  name: string;
  tagline?: string;
  description: string;
  address: string;
  openingHours: string;
  dispatch: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  whatsappMessage: string;
  status?: string; // "Active" | "Inactive"
}

export const defaultOutlets: OutletItem[] = [
  {
    id: "outlet-pik",
    tabName: "PIK, Jakarta",
    name: "Laverie Premium Laundry PIK",
    tagline: "Flagship Atelier & Concierge Hub",
    description:
      "Conveniently situated in Pantai Indah Kapuk (PIK). Drop off your garments or coordinate express hotel lobby and villa pickup.",
    address: "Pantai Indah Kapuk, Jakarta Utara, DKI Jakarta",
    openingHours: "07:30 AM – 21:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Available for hotels, villas, and residences around PIK & North Jakarta",
    mapsUrl: "https://maps.app.goo.gl/aAEsvnwHZAUsbqmq9",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laverie%20Premium%20Laundry%20PIK&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Hello Laverie Laundry PIK! I would like to request a pickup at my location.",
    status: "Active",
  },
  {
    id: "outlet-seminyak",
    tabName: "Seminyak, Bali",
    name: "Laverie Suite & Villa Hub Seminyak",
    tagline: "Resort & Boutique Villa Service",
    description:
      "Dedicated express valet and gentle fabric sanitization hub catering to luxury villas and hotel suites across Seminyak & Kerobokan.",
    address: "Jl. Kayu Aya, Seminyak, Kuta, Badung, Bali",
    openingHours: "07:00 AM – 22:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch: "Daily concierge collection across Seminyak, Petitenget & Legian",
    mapsUrl: "https://maps.google.com/?q=Seminyak+Bali",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Seminyak%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Hello Laverie Laundry Seminyak! I would like to inquire about laundry service.",
    status: "Active",
  },
  {
    id: "outlet-canggu",
    tabName: "Canggu, Bali",
    name: "Laverie Eco Atelier Canggu",
    tagline: "Eco Garment Care & Express Drop-off",
    description:
      "Our sustainable ozone-wash studio serving digital nomads, resident villas, and travelers throughout the Batu Bolong and Berawa coastal enclaves.",
    address: "Jl. Pantai Batu Bolong, Canggu, Kuta Utara, Badung, Bali",
    openingHours: "08:00 AM – 20:00 PM Daily",
    dispatch: "Doorstep pickup covering Berawa, Batu Bolong & Pererenan",
    mapsUrl: "https://maps.google.com/?q=Canggu+Bali",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Canggu%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Hello Laverie Laundry Canggu! I would like to inquire about laundry service.",
    status: "Active",
  },
];
