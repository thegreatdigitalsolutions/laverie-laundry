export type Locale = "id" | "en";

export interface TranslationDictionary {
  nav: {
    home: string;
    philosophy: string;
    about: string;
    process: string;
    services: string;
    products: string;
    packages: string;
    faq: string;
    bookWhatsapp: string;
    selectOutlet: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    bookBtn: string;
    exploreBtn: string;
    expressBadge: string;
    pickupBadge: string;
    careBadge: string;
  };
  process: {
    tag: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
    introP1: string;
    introP2: string;
    priceLabel: string;
    inquireBtn: string;
  };
  packages: {
    tag: string;
    title: string;
    subtitle: string;
    featuredBadge: string;
    startingAt: string;
    perUnit: string;
    orderBtn: string;
    showcaseTitle: string;
    showcaseDesc: string;
    showcaseCheck1: string;
    showcaseCheck2: string;
    showcaseCheck3: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    chatBtn: string;
    chatMsg: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
  };
  philosophy: {
    tag: string;
    headline: string;
    subheadline: string;
    p1: string;
    p2: string;
    p3: string;
    tagline: string;
    brand: string;
    brandTagline: string;
  };
  about: {
    tag: string;
    title: string;
    subtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    hubsTitle: string;
    hubsSubtitle: string;
    addressLabel: string;
    hoursLabel: string;
    dispatchLabel: string;
    openMaps: string;
    chatHub: string;
    changeLocation: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    locations: string;
    quickLinks: string;
    contact: string;
    copyright: string;
  };
  common: {
    chatPrompt: string;
    selectLanguage: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  id: {
    nav: {
      home: "Beranda",
      philosophy: "Filosofi Kami",
      about: "Filosofi Kami",
      process: "Cara Kerja",
      services: "Layanan",
      products: "Pilihan Paket",
      packages: "Pilihan Paket",
      faq: "FAQ",
      bookWhatsapp: "Pesan via WhatsApp",
      selectOutlet: "Pilih Outlet",
    },
    hero: {
      badge: "Layanan Laundry Premium Express",
      title: "Jangan buang waktu liburan Anda untuk mencuci baju kemarin.",
      highlight: "Pakaian bersih segar. Selesai di hari yang sama.",
      description:
        "Layanan laundry profesional untuk keseharian dan perjalanan Anda. Penjemputan dari lobi hotel atau depan pintu sebelum jam 10 pagi, diantar kembali bersih rapi di malam hari.",
      bookBtn: "Pesan via WhatsApp",
      exploreBtn: "Lihat Pilihan Paket",
      expressBadge: "Layanan Kilat Hotel 12 Jam",
      pickupBadge: "GRATIS Antar Jemput (Radius 5 km) · PIK & Pluit",
      careBadge: "Sanitasi Kain Berstandar Hotel",
    },
    process: {
      tag: "Proses Praktis 3 Langkah",
      title: "Bagaimana Cara Kerjanya",
      subtitle: "Proses mudah tanpa repot dari penjemputan hingga pengantaran kembali ke tangan Anda.",
      step1Title: "1. Pesan & Serahkan Tas Anda",
      step1Desc: "Hubungi kami via WhatsApp sebelum jam 10 pagi. Tinggalkan cucian Anda di resepsionis hotel atau jadwalkan penjemputan depan pintu.",
      step2Title: "2. Pembersihan & Sanitasi Presisi",
      step2Desc: "Pakaian diperiksa per helai, dicuci dengan formula ramah lingkungan, disanitasi ozon, dan disetrika uap profesional.",
      step3Title: "3. Diantar Rapi Malam Hari",
      step3Desc: "Pakaian Anda dikembalikan dalam kemasan steril pelindung debu siap pakai sebelum jam 10 malam.",
    },
    services: {
      tag: "Pengalaman Laverie · 01",
      title: "Layanan Kami",
      subtitle:
        "Setiap pakaian memiliki ceritanya sendiri, dan setiap serat kain berhak mendapatkan perawatan yang memahami karakternya.",
      introP1:
        "Di Laverie, kami percaya perawatan pakaian istimewa lebih dari sekadar kebersihan. Ini tentang menjaga kualitas, menghargai detail, dan mengembalikan kenyamanan pada hal-hal yang Anda hargai.",
      introP2:
        "Dari kebutuhan harian hingga pakaian halus, linen istimewa, dan koleksi pribadi, setiap layanan dirancang dengan penuh kehati-hatian berdasarkan seni merawat. Temukan pendekatan perawatan laundry yang lebih bermakna, di mana setiap detail diperhatikan dan setiap pengalaman terasa elegan tanpa beban.",
      priceLabel: "Harga",
      inquireBtn: "Konsultasi & Pesan",
    },
    packages: {
      tag: "Harga Transparan Tanpa Biaya Tersembunyi",
      title: "Pilihan Paket Laundry",
      subtitle: "Pilih paket yang paling sesuai dengan kebutuhan liburan atau rutinitas harian Anda.",
      featuredBadge: "Paling Populer",
      startingAt: "Mulai dari",
      perUnit: "/ KG",
      orderBtn: "Pesan via WhatsApp",
      showcaseTitle: "Setiap pakaian dikembalikan bersih rapi, harum, dan tertutup rapat.",
      showcaseDesc:
        "Kami tidak pernah mengembalikan pakaian Anda dengan kantong plastik tipis biasa. Laverie membungkus setiap pesanan bersih dalam kemasan bersegel tahan debu dan sirkulasi optimal, lengkap dengan label pakaian khusus dan penyangga kerah agar pakaian Anda selalu siap dibawa bepergian.",
      showcaseCheck1: "Pelindung pakaian anti-debu",
      showcaseCheck2: "Gantungan kayu & beludru sesuai permintaan",
      showcaseCheck3: "Lapisan biodegradable bersertifikat ramah lingkungan",
    },
    faq: {
      tag: "Tanya Jawab",
      title: "Pertanyaan yang Sering Diajukan",
      subtitle: "Semua informasi penting seputar layanan antar jemput, estimasi waktu, dan perawatan pakaian.",
      chatBtn: "Chat via WhatsApp",
      chatMsg: "Halo Laverie Concierge! Saya ingin bertanya seputar penjemputan laundry.",
    },
    testimonials: {
      tag: "Ulasan Pelanggan",
      title: "Apa Kata Mereka Tentang Laverie",
      subtitle: "Dipercaya oleh wisatawan, tamu hotel berbintang, dan residen lokal yang mengutamakan kerapian.",
    },
    philosophy: {
      tag: "OUR PHILOSOPHY",
      headline: "Simplify Your Day.",
      subheadline: "Hidup selayaknya dinikmati, bukan dihabiskan untuk rutinitas tanpa henti.",
      p1: "Kami percaya kemewahan sejati adalah memiliki lebih banyak waktu untuk hal-hal yang benar-benar bermakna. Momen tenang, hubungan yang hangat, kesenangan kecil, dan kebebasan menikmati setiap hari tanpa kekhawatiran tak perlu.",
      p2: "Di Laverie, kami merawat setiap detail agar keseharian Anda terasa lebih ringan. Dari pakaian sehari-hari hingga busana paling istimewa, setiap helai kain dirawat dengan perhatian penuh dan keahlian terbaik.",
      p3: "Karena kami memahami bahwa merawat pakaian Anda juga tentang merawat waktu berharga Anda.",
      tagline: "Lebih sedikit kekhawatiran. Lebih banyak kenikmatan. Lebih banyak ruang untuk hidup.",
      brand: "LAVERIE PREMIUM LAUNDRY",
      brandTagline: "Simplify Your Day.",
    },
    about: {
      tag: "Tentang Laverie Laundry",
      title: "Standar Baru Kenyamanan & Higienitas",
      subtitle: "Kami menggabungkan teknologi pembersihan modern dengan keramahan layanan valet hotel.",
      storyTitle: "Perawatan laundry, dibuat sederhana.",
      storyP1:
        "Lahir dari tingginya ritme perjalanan modern dan kenyamanan perhotelan butik, Laverie mendefinisikan ulang standar perawatan pakaian. Kami percaya waktu berharga Anda seharusnya digunakan untuk menjelajah, berbisnis, atau bersantai—tanpa terbebani urusan mencuci baju atau keterlambatan pakaian hotel.",
      storyP2:
        "Mulai dari linen harian hingga gaun malam istimewa, perawatan presisi kami memadukan detergen bersertifikat ramah lingkungan, pengeringan ozon bersuhu rendah yang lembut, serta penyetrikaan uap artisan untuk melindungi serat kain dan menjaga kesegaran pakaian.",
      check1: "Layanan Kilat 12 Jam Selesai",
      check2: "Koordinasi Resepsionis & Concierge Hotel",
      check3: "Kemasan Rapi Tertutup & Bebas Kusut",
      check4: "Formula Ramah Lingkungan & Hipoalergenik",
      feat1Title: "Perawatan Berkualitas",
      feat1Desc: "Pemeriksaan jenis bahan kain, formula pH seimbang, dan penyetrikaan uap teliti.",
      feat2Title: "Proses Higienis",
      feat2Desc: "Sterilisasi berstandar perhotelan yang membunuh 99,9% bakteri tanpa merusak warna pakaian.",
      feat3Title: "Layanan Mudah & Praktis",
      feat3Desc: "Antar jemput langsung ke depan pintu dengan estimasi 12 jam selesai sebelum jam makan malam Anda.",
      hubsTitle: "Outlet Kami",
      hubsSubtitle: "Kunjungi atau pesan layanan antar jemput dari hub terdekat di area Anda.",
      addressLabel: "Alamat",
      hoursLabel: "Jam Operasional",
      dispatchLabel: "Jangkauan Pengantaran",
      openMaps: "Maps",
      chatHub: "Chat with Us",
      changeLocation: "Ganti Lokasi",
    },
    cta: {
      title: "Nikmati pakaian bersih dan segar tanpa perlu repot mencuci.",
      subtitle: "Jadwalkan penjemputan pertama Anda hari ini sebelum jam 10 pagi untuk pengantaran sore/malam ini.",
      button: "Jadwalkan Penjemputan Sekarang",
    },
    footer: {
      tagline: "Layanan laundry hotel express dan perawatan kain premium terpercaya.",
      locations: "Outlet Kami",
      quickLinks: "Tautan Cepat",
      contact: "Hubungi Kami",
      copyright: "Hak Cipta Dilindungi Undang-Undang.",
    },
    common: {
      chatPrompt: "Halo Laverie Laundry! Saya ingin memesan layanan antar jemput laundry hari ini.",
      selectLanguage: "Pilih Bahasa",
    },
  },
  en: {
    nav: {
      home: "Home",
      philosophy: "Our Philosophy",
      about: "Our Philosophy",
      process: "How It Works",
      services: "Services",
      products: "Packages",
      packages: "Packages",
      faq: "FAQ",
      bookWhatsapp: "Order via WhatsApp",
      selectOutlet: "Select Outlet",
    },
    hero: {
      badge: "Premium Express Laundry Service",
      title: "Don’t waste your luggage on yesterday.",
      highlight: "Fresh clothes. Same day.",
      description:
        "Professional laundry service for your everyday life and travels. Pick up from your hotel lobby or doorstep before 10 AM and enjoy our 12-hour express laundry service delivered back the same evening.",
      bookBtn: "Book via WhatsApp",
      exploreBtn: "Explore Packages",
      expressBadge: "12H Hotel Express",
      pickupBadge: "FREE Pickup & Delivery (5 km Radius) · PIK & Pluit",
      careBadge: "Hospitality Grade Sanitization",
    },
    process: {
      tag: "Simple 3-Step Process",
      title: "How It Works",
      subtitle: "Effortless laundry experience from pickup to evening delivery back to your hands.",
      step1Title: "1. Book & Hand Over",
      step1Desc: "Reach out via WhatsApp before 10 AM. Drop your laundry at your hotel reception or coordinate doorstep pickup.",
      step2Title: "2. Precision Wash & Sanitize",
      step2Desc: "Garments undergo individual assessment, eco-certified wash cycles, ozone sanitization, and artisan steam pressing.",
      step3Title: "3. Evening Delivery",
      step3Desc: "Fresh, neatly folded, and travel-sealed garments are delivered back to your lobby or door before 10 PM.",
    },
    services: {
      tag: "The Laverie Experience · 01",
      title: "Our Services",
      subtitle:
        "Every piece has its own story, and every fabric deserves care that understands its nature.",
      introP1:
        "At Laverie, we believe exceptional garment care goes beyond cleanliness. It is about preserving quality, respecting details, and bringing comfort back to the things you value.",
      introP2:
        "From everyday essentials to delicate garments, cherished linens, and personal collections, each service is thoughtfully designed around the art of caring. Discover a more considered approach to laundry, where every detail matters and every experience feels effortlessly refined.",
      priceLabel: "Price",
      inquireBtn: "Inquire & Book",
    },
    packages: {
      tag: "Transparent Pricing With No Hidden Fees",
      title: "Laundry Packages",
      subtitle: "Choose the turnaround and treatment tier tailored to your itinerary and wardrobe.",
      featuredBadge: "Featured",
      startingAt: "Starting at",
      perUnit: "/ KG",
      orderBtn: "Order via WhatsApp",
      showcaseTitle: "Every garment returned crisp, fragrant, and sealed.",
      showcaseDesc:
        "We never return your clothing in flimsy generic plastic bags. Laverie wraps every clean order in anti-dust, breathable sealed packaging, complete with custom garment tags and collar supports, so your wardrobe travels effortlessly.",
      showcaseCheck1: "Anti-dust dust bag",
      showcaseCheck2: "Wooden & velvet hangers upon request",
      showcaseCheck3: "Eco-certified biodegradable liners",
    },
    faq: {
      tag: "Frequently Asked Questions",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our express hotel turnaround, garment care, and pickup process.",
      chatBtn: "Chat With Us",
      chatMsg: "Hello Laverie Concierge! I have a question about pickup.",
    },
    testimonials: {
      tag: "Guest Testimonials",
      title: "Here’s what people are saying",
      subtitle: "Trusted by travelers, hotel guests, and local residents who demand immaculate fabric care.",
    },
    philosophy: {
      tag: "OUR PHILOSOPHY",
      headline: "Simplify Your Day.",
      subheadline: "Life is meant to be lived, not spent on endless routines.",
      p1: "We believe that the finest luxury is having more time for what truly matters. The quiet moments, the meaningful connections, the little pleasures, and the freedom to enjoy each day without unnecessary worries.",
      p2: "At Laverie, we take care of the details that make everyday life feel lighter. From your everyday essentials to your most delicate garments, every piece receives thoughtful attention and considered care.",
      p3: "Because we understand that taking care of your clothes is also about taking care of your time.",
      tagline: "Less to worry about. More to enjoy. More room for life.",
      brand: "LAVERIE PREMIUM LAUNDRY",
      brandTagline: "Simplify Your Day.",
    },
    about: {
      tag: "About Laverie Laundry",
      title: "A New Standard in Convenience & Hygiene",
      subtitle: "We combine modern textile care technology with the luxury attentiveness of hotel concierge services.",
      storyTitle: "Laundry care, made simple.",
      storyP1:
        "Born from the demanding pace of modern travel and boutique hospitality, Laverie redefines garment care. We believe you should spend your valuable hours exploring, conducting business, or relaxing—never burdened with laundry chores or compromised hotel wardrobe delays.",
      storyP2:
        "From everyday linens to bespoke evening wear, our precision care combines eco-certified detergents, gentle low-heat ozone drying, and hand-finished steam pressing to protect fibers and restore crispness.",
      check1: "12-Hour Express Turnaround",
      check2: "Hotel Concierge Coordination",
      check3: "Sealed & Anti-Crease Packaging",
      check4: "Hypoallergenic Eco Formulations",
      feat1Title: "Quality Care",
      feat1Desc: "Individual fabric assessment, pH-balanced formulas, and meticulous steam pressing.",
      feat2Title: "Hygienic Process",
      feat2Desc: "Hospitality-grade sterilization that removes 99.9% of bacteria without damaging colors.",
      feat3Title: "Easy Service",
      feat3Desc: "Seamless door-to-door handoff with 12-hour turnaround before your evening dinner.",
      hubsTitle: "Our Outlets",
      hubsSubtitle: "Visit in person or dispatch express courier services from our nearest hub.",
      addressLabel: "Address",
      hoursLabel: "Opening Hours",
      dispatchLabel: "Concierge Dispatch",
      openMaps: "Maps",
      chatHub: "Chat with Us",
      changeLocation: "Change Location",
    },
    cta: {
      title: "Experience fresh, pristine laundry without the holiday chores.",
      subtitle: "Schedule your first pickup before 10 AM today for return delivery this evening.",
      button: "Schedule Pickup Now",
    },
    footer: {
      tagline: "Trusted express hotel laundry and premium fabric care.",
      locations: "Our Outlets",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      copyright: "All Rights Reserved.",
    },
    common: {
      chatPrompt: "Hello Laverie Laundry! I would like to book a laundry pickup today.",
      selectLanguage: "Select Language",
    },
  },
};

