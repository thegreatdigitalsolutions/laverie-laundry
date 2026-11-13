export interface TestimonialItem {
  name: string;
  role: string;
  role_en?: string;
  hotel: string;
  rating: number;
  content: string;
  content_en?: string;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Marcus Vance",
    role: "Pelaku Perjalanan Bisnis & Tamu Hotel",
    role_en: "Business Traveler & Hotel Guest",
    hotel: "Swissôtel Jakarta PIK Avenue",
    rating: 5,
    content:
      "Saya menyerahkan jas dan kemeja saya ke resepsionis hotel pukul 09.30 sebelum menghadiri beberapa pertemuan. Saat kembali ke hotel pukul 19.00, semuanya sudah tergantung rapi dalam kantong pelindung pakaian, disetrika dengan sempurna menggunakan uap, dan beraroma segar. Pelayanan yang luar biasa!",
    content_en:
      "I dropped off my suit jacket and shirts at the hotel reception at 9:30 AM before attending meetings. When I returned to the hotel at 7:00 PM, everything was neatly hung in protective garment bags, perfectly steam-pressed, and smelling fresh. Excellent service!",
  },
  {
    name: "Sophia Chen",
    role: "Penghuni Apartemen & Konsultan",
    role_en: "Apartment Resident & Consultant",
    hotel: "Green Bay Pluit SeaView",
    rating: 5,
    content:
      "Menemukan layanan laundry yang benar-benar memperhatikan perawatan bahan halus dan sutra bukanlah hal mudah. Kualitas kemasan dan deterjen Laverie benar-benar di luar ekspektasi saya. Sejauh ini, pengalaman laundry terbaik di PIK dan Jakarta Utara!",
    content_en:
      "Finding a laundry service that truly cares for delicate fabrics and silks is no easy feat. The quality of Laverie packaging and detergents truly exceeded my expectations. By far the best laundry experience in PIK and North Jakarta!",
  },
  {
    name: "David & Claire Miller",
    role: "Wisatawan Liburan & Tamu Hotel",
    role_en: "Holiday Travelers & Hotel Guests",
    hotel: "The Oakwood PIK Jakarta",
    rating: 5,
    content:
      "Kami tidak ingin pulang dengan koper penuh pakaian kotor setelah staycation di PIK. Laverie menjemput langsung tas laundry kami dari lobi hotel dan mengantarkannya kembali dalam keadaan bersih, segar, dan tertata ringkas. Sangat sepadan dengan kualitasnya!",
    content_en:
      "We did not want to leave with suitcases full of dirty clothes after our staycation in PIK. Laverie picked up our laundry bags directly from the hotel lobby and delivered them clean, fresh, and neatly organized. Well worth every penny!",
  },
];

