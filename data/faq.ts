export interface FAQItem {
  question: string;
  question_en?: string;
  answer: string;
  answer_en?: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Bagaimana cara kerja layanan express hotel 12 jam di hari yang sama?",
    question_en: "How does the same-day 12-hour hotel express laundry work?",
    answer: "Lakukan pemesanan via WhatsApp atau concierge hotel sebelum pukul 10:00 pagi. Tim kami mengambil tas laundry langsung dari resepsionis hotel atau lobi Anda, memproses dan menyetrika uap dengan teliti, lalu mengantarkannya kembali dalam kondisi segar dan tersegel di malam hari sebelum pukul 22:00.",
    answer_en: "Place your booking via WhatsApp or hotel concierge before 10:00 AM. Our team picks up your laundry bag directly from your hotel front desk or room lobby, meticulously processes and steams your garments, and delivers them back fresh and sealed the same evening before 10:00 PM."
  },
  {
    question: "Apakah Anda menyediakan layanan antar jemput untuk tempat tinggal pribadi dan villa?",
    question_en: "Do you offer doorstep pickup for private residences and villas?",
    answer: "Ya! Meskipun layanan kilat 12 jam kami dirancang untuk hotel mitra dan wisatawan, kami juga melayani hunian pribadi, apartemen, dan villa dalam jangkauan pengiriman kami. Slot reguler dan kilat tersedia setiap hari.",
    answer_en: "Yes! While our 12-hour express was designed with partner hotels and travelers in mind, we also service private residences, apartments, and villas within our delivery perimeter. Regular and express turnaround slots are available daily."
  },
  {
    question: "Bagaimana Anda menangani bahan kain halus, pakaian desainer, dan setelan jas?",
    question_en: "How do you handle delicate fabrics, designer wear, and suits?",
    answer: "Pakaian dalam kategori Delicate & Premium menerima pemeriksaan label pakaian individual, sanitasi ozon dingin, deterjen ramah lingkungan pH-netral, serta setrika uap lembut di gantungan khusus dengan penutup debu bersirkulasi udara untuk melindungi serat kain.",
    answer_en: "Garments categorized under our Delicate & Premium care receive individual care labels inspection, cold ozone sanitization, pH-neutral eco detergents, and delicate steam pressing on hangers with breathable dust covers to protect fiber integrity."
  },
  {
    question: "Apa saja metode pembayaran yang diterima?",
    question_en: "What are the payment methods accepted?",
    answer: "Kami mendukung pembayaran digital praktis termasuk QRIS (GoPay, OVO, Dana, BCA Mobile), Transfer Bank, Kartu Kredit/Debit, serta tagihan kamar hotel bagi tamu hotel mitra.",
    answer_en: "We support seamless digital payments including Indonesian QRIS (GoPay, OVO, Dana, BCA Mobile), Bank Transfer, Credit/Debit cards, and room billing charge agreements for partner hotel guests."
  },
  {
    question: "Berapa jumlah minimum pesanan untuk penjemputan laundry?",
    question_en: "What is the minimum order quantity for laundry pickup?",
    answer: "Minimum pesanan penjemputan kami adalah 3 KG untuk cuci & lipat standar, atau nilai pesanan minimum Rp 50.000 untuk layanan kilat maupun dry clean satuan khusus.",
    answer_en: "Our minimum pickup order is 3 KG for standard wash & fold, or a minimum order value of Rp 50.000 for express or delicate piece-rate dry clean services."
  }
];
