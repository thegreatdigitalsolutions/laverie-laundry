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
    role: "Wisatawan Bisnis & Tamu Hotel",
    role_en: "Business Traveler & Hotel Guest",
    hotel: "The Seminyak Suite Hotel",
    rating: 5,
    content:
      "Menyerahkan jas dan kemeja saya ke resepsionis jam 9:30 pagi sebelum rapat. Jam 7 malam saat kembali ke hotel, semuanya sudah digantung rapi dalam dust bag, disetrika uap sempurna, dan wangi segar. Layanan luar biasa!",
    content_en:
      "Handed my suit and shirts to the front desk at 9:30 AM before my meetings. By 7 PM when I returned to the hotel, everything was neatly hung in dust bags, steamed to perfection, and smelled wonderful. Exceptional service!",
  },
  {
    name: "Sophia Chen",
    role: "Digital Nomad & Penghuni Villa",
    role_en: "Digital Nomad & Villa Resident",
    hotel: "Canggu Eco Villas",
    rating: 5,
    content:
      "Sangat jarang menemukan layanan laundry yang benar-benar menjaga pakaian berbahan halus dan sutra. Kemasan dan kualitas deterjen Laverie sangat mengesankan. Pengalaman laundry terbaik di Bali sejauh ini.",
    content_en:
      "Finding a laundry service that genuinely respects delicate fabrics and silks is rare. Laverie’s packaging and detergent quality blew me away. Best laundry experience in Bali by far.",
  },
  {
    name: "David & Claire Miller",
    role: "Wisatawan Liburan",
    role_en: "Holiday Getaway Travelers",
    hotel: "Alila Resort & Villas",
    rating: 5,
    content:
      "Kami tidak ingin pulang dengan koper penuh baju liburan kotor. Laverie menjemput koper laundry kami langsung dari resepsionis resor dan mengantarkan semuanya segar serta terkemas rapi. Sangat sebanding dengan kualitasnya!",
    content_en:
      "We didn't want to fly back with a suitcase full of dirty holiday clothes. Laverie picked up our luggage bags directly from our resort reception and delivered everything fresh and compact. Worth every Rupiah!",
  },
];

