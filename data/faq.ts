export interface FAQItem {
  question: string;
  question_en?: string;
  answer: string;
  answer_en?: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Area mana saja yang mendapatkan fasilitas GRATIS Antar Jemput?",
    question_en: "Which areas qualify for FREE Pickup & Delivery?",
    answer:
      "Layanan GRATIS Antar Jemput berlaku untuk radius maksimal 5 km dari outlet kami (PIK dan GreenBay Pluit), mencakup area: PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, dan Pantai Mutiara. Bagi lokasi di luar radius 5 km, silakan chat concierge kami via WhatsApp untuk opsi penjemputan atau pengiriman khusus via kurir.",
    answer_en:
      "FREE Pickup & Delivery applies to locations within a maximum 5 km radius from our outlets (PIK and GreenBay Pluit), covering: PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, and Pantai Mutiara. For addresses beyond 5 km, please chat our concierge via WhatsApp to arrange custom courier pickup.",
  },
  {
    question: "Bagaimana cara kerja layanan express hotel 12 jam di hari yang sama?",
    question_en: "How does the same-day 12-hour hotel express laundry work?",
    answer:
      "Lakukan pemesanan via WhatsApp atau concierge hotel sebelum pukul 10:00 pagi. Tim kami mengambil tas laundry langsung dari resepsionis hotel atau lobi Anda, memproses dan menyetrika uap dengan teliti, lalu mengantarkannya kembali dalam kondisi segar dan tersegel di malam hari sebelum pukul 22:00.",
    answer_en:
      "Place your booking via WhatsApp or hotel concierge before 10:00 AM. Our team picks up your laundry bag directly from your hotel front desk or room lobby, meticulously processes and steams your garments, and delivers them back fresh and sealed the same evening before 10:00 PM.",
  },
  {
    question: "Apakah Anda menyediakan layanan antar jemput untuk tempat tinggal pribadi dan villa?",
    question_en: "Do you offer doorstep pickup for private residences and villas?",
    answer:
      "Ya! Meskipun layanan kilat 12 jam kami dirancang untuk hotel mitra dan wisatawan, kami juga melayani hunian pribadi, apartemen, dan villa dalam jangkauan pengiriman kami (radius 5 km). Slot reguler dan kilat tersedia setiap hari.",
    answer_en:
      "Yes! While our 12-hour express was designed with partner hotels and travelers in mind, we also service private residences, apartments, and villas within our 5 km delivery perimeter. Regular and express turnaround slots are available daily.",
  },
  {
    question: "Bagaimana Anda menangani bahan kain halus, pakaian desainer, dan setelan jas?",
    question_en: "How do you handle delicate fabrics, designer wear, and suits?",
    answer:
      "Pakaian dalam kategori Delicate & Premium menerima pemeriksaan label pakaian individual, sanitasi ozon dingin, deterjen ramah lingkungan pH-netral, serta setrika uap lembut di gantungan khusus dengan penutup debu bersirkulasi udara untuk melindungi serat kain.",
    answer_en:
      "Garments categorized under our Delicate & Premium care receive individual care labels inspection, cold ozone sanitization, pH-neutral eco detergents, and delicate steam pressing on hangers with breathable dust covers to protect fiber integrity.",
  },
  {
    question: "Apa saja metode pembayaran yang diterima?",
    question_en: "What are the payment methods accepted?",
    answer:
      "Untuk saat ini, metode pembayaran yang tersedia hanya dapat dilakukan melalui transfer bank atau pembayaran tunai (cash).",
    answer_en:
      "Currently, the available payment methods are only via bank transfer or cash.",
  },
  {
    question: "Berapa jumlah minimum pesanan untuk penjemputan laundry?",
    question_en: "What is the minimum order quantity for laundry pickup?",
    answer:
      "Minimum pesanan penjemputan kami adalah 3 KG untuk cuci & lipat standar (Premium Kilo), atau nilai pesanan minimum Rp 50.000 untuk layanan kilat maupun perawatan pakaian satuan khusus.",
    answer_en:
      "Our minimum pickup order is 3 KG for standard wash & fold (Premium Kilo), or a minimum order value of Rp 50.000 for express or delicate piece-rate specialty services.",
  },
];
