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
  coverageAreas?: string[];
}

export const TARGET_AREAS = [
  "PIK 1",
  "PIK 2",
  "Muara Karang",
  "Pluit",
  "Greenbay",
  "Pantai Mutiara",
] as const;

export type TargetArea = (typeof TARGET_AREAS)[number];

export const defaultOutlets: OutletItem[] = [
  {
    id: "outlet-pik",
    tabName: "PIK (Pantai Indah Kapuk)",
    name: "Laverie Premium Laundry PIK",
    phone: "08170078883",
    description:
      "Melayani area utama PIK 1, PIK 2, dan Muara Karang dalam radius 5 km. Nikmati fasilitas GRATIS antar jemput pakaian langsung ke pintu hunian atau lobi hotel Anda.",
    description_en:
      "Serving prime areas of PIK 1, PIK 2, and Muara Karang within a 5 km radius. Enjoy complimentary FREE pickup and delivery directly to your doorstep or hotel lobby.",
    address: "Pantai Indah Kapuk (PIK), Jakarta Utara, DKI Jakarta",
    openingHours: "07:30 AM – 09:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch:
      "GRATIS Antar Jemput (Radius maks. 5 km): PIK 1, PIK 2, Muara Karang. Di luar 5 km silakan chat outlet.",
    dispatch_en:
      "FREE Pickup & Delivery (Max 5 km radius): PIK 1, PIK 2, Muara Karang. Beyond 5 km please chat outlet.",
    coverageAreas: ["PIK 1", "PIK 2", "Muara Karang"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Laverie+Premium+Laundry+PIK+Jakarta",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Laverie%20Premium%20Laundry%20PIK%20Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Premium Laundry PIK! Saya ingin memesan layanan antar jemput gratis untuk area PIK / Muara Karang.",
    whatsappMessage_en:
      "Hello Laverie Premium Laundry PIK! I would like to book free pickup & delivery for the PIK / Muara Karang area.",
    status: "Active",
  },
  {
    id: "outlet-greenbay",
    tabName: "GreenBay Pluit",
    name: "Laverie Premium Laundry GreenBay",
    phone: "08170078884",
    description:
      "Pusat layanan ekspres Bay Walk Mall, melayani area Greenbay, Pluit, Pantai Mutiara, dan Muara Karang dalam radius 5 km dengan fasilitas GRATIS antar jemput.",
    description_en:
      "Express valet hub at Bay Walk Mall, serving Greenbay, Pluit, Pantai Mutiara, and Muara Karang within 5 km with complimentary FREE pickup and delivery.",
    address:
      "Bay Walk Mall, Jl. Pluit Karang Ayu Barat LGMF 3, RT.20/RW.2, Pluit, Penjaringan, Jakarta Utara, DKI Jakarta 14450",
    openingHours: "07:00 AM – 10:00 PM Daily (Express cutoff 10:00 AM)",
    dispatch:
      "GRATIS Antar Jemput (Radius maks. 5 km): Greenbay, Pluit, Pantai Mutiara, Muara Karang. Di luar 5 km silakan chat outlet.",
    dispatch_en:
      "FREE Pickup & Delivery (Max 5 km radius): Greenbay, Pluit, Pantai Mutiara, Muara Karang. Beyond 5 km please chat outlet.",
    coverageAreas: ["Greenbay", "Pluit", "Pantai Mutiara", "Muara Karang"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bay+Walk+Mall%2C+Pluit+Karang+Ayu+Barat%2C+Jakarta+14450",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Bay%20Walk%20Mall%2C%20Pluit%20Karang%20Ayu%20Barat%2C%20Jakarta%2014450&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsappMessage:
      "Halo Laverie Premium Laundry GreenBay! Saya ingin memesan layanan antar jemput gratis untuk area Greenbay / Pluit / Pantai Mutiara.",
    whatsappMessage_en:
      "Hello Laverie Premium Laundry GreenBay! I would like to book free pickup & delivery for Greenbay / Pluit / Pantai Mutiara.",
    status: "Active",
  },
];
