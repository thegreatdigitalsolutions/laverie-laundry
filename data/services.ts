export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  category_id: string;
  title: string;
  title_id: string;
  titleSecondary?: string;
  titleSecondary_id?: string;
  description: string;
  description_id: string;
  quote: string;
  quote_id: string;
  price: string;
  price_id: string;
  priceStarting: string;
  priceStarting_id: string;
  unit: string;
  unit_id: string;
  minimumOrder?: string;
  minimumOrder_id?: string;
  image: string;
  whatsappMessage: string;
  whatsappMessage_en: string;
  collaboration?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "premium-kilo",
    number: "01",
    category: "01 / PREMIUM KILO",
    category_id: "01 / PREMIUM KILO",
    title: "Everyday Essentials",
    title_id: "Everyday Essentials",
    titleSecondary: "Premium Kilo",
    titleSecondary_id: "Premium Kilo",
    description:
      "Designed for the rhythm of everyday life, our Premium Kilo service brings thoughtful care to the clothes you wear most. Each piece is treated with attention to cleanliness, freshness, and comfort, leaving your everyday wardrobe feeling beautifully refreshed.",
    description_id:
      "Dirancang untuk ritme keseharian Anda, layanan Premium Kilo menghadirkan perawatan penuh perhatian untuk pakaian yang paling sering Anda kenakan. Setiap helai dirawat dengan fokus pada kebersihan, kesegaran, dan kenyamanan, menjadikan busana harian Anda terasa segar kembali.",
    quote:
      "Because everyday essentials deserve more than just a wash — they deserve care that makes every day feel a little more effortless.",
    quote_id:
      "Karena pakaian harian Anda layak mendapatkan lebih dari sekadar dicuci — mereka berhak atas perawatan yang membuat setiap hari terasa lebih ringan.",
    price: "Start from 15K per Kilo (minimum order 3 Kilograms)",
    price_id: "Mulai dari 15K per Kilo (minimum order 3 Kilogram)",
    priceStarting: "15K",
    priceStarting_id: "15K",
    unit: "/ Kilo",
    unit_id: "/ Kilo",
    minimumOrder: "Min. order 3 Kilograms",
    minimumOrder_id: "Min. order 3 Kilogram",
    image: "/images/services/premium-kilo.png",
    whatsappMessage:
      "Halo Laverie! Saya tertarik untuk konsultasi dan memesan layanan 01 / Premium Kilo (Everyday Essentials).",
    whatsappMessage_en:
      "Hello Laverie! I would like to inquire and book the 01 / Premium Kilo (Everyday Essentials) service.",
  },
  {
    id: "delicates",
    number: "02",
    category: "02 / DELICATES",
    category_id: "02 / DELICATES",
    title: "The Delicates",
    title_id: "The Delicates",
    description:
      "Some garments call for a different kind of attention. Our Delicates service is thoughtfully designed for pieces that require a gentler approach, from delicate fabrics to treasured wardrobe essentials. Each garment receives individual attention, with careful handling and considered treatment to preserve its texture, character, and natural elegance.",
    description_id:
      "Beberapa pakaian membutuhkan perhatian yang berbeda. Layanan Delicates kami dirancang secara khusus untuk busana yang membutuhkan pendekatan lebih lembut, mulai dari bahan kain halus hingga pakaian kesayangan Anda. Setiap helai ditangani secara individual dengan teknik cermat untuk menjaga tekstur, karakter, dan keanggunan alaminya.",
    quote: "Because the pieces you value deserve care beyond the ordinary.",
    quote_id:
      "Karena pakaian berharga Anda layak mendapatkan perawatan di luar yang biasa.",
    price: "Start from 35K per piece",
    price_id: "Mulai dari 35K per helai",
    priceStarting: "35K",
    priceStarting_id: "35K",
    unit: "/ piece",
    unit_id: "/ helai",
    image: "/images/services/delicates.png",
    whatsappMessage:
      "Halo Laverie! Saya ingin konsultasi dan memesan layanan 02 / Delicates (The Delicates).",
    whatsappMessage_en:
      "Hello Laverie! I would like to inquire and book the 02 / Delicates (The Delicates) service.",
  },
  {
    id: "bedlinen",
    number: "03",
    category: "03 / BEDLINEN",
    category_id: "03 / BEDLINEN",
    title: "The Linen Collection",
    title_id: "The Linen Collection",
    titleSecondary: "Bedlinen",
    titleSecondary_id: "Bedlinen",
    description:
      "A restful home begins with the comfort of beautifully cared-for linens. From bed sheets to duvet covers and pillowcases, each piece receives thoughtful cleaning and attentive finishing to restore its freshness, softness, and inviting feel. With a considered approach to every detail, we bring renewed comfort to your personal sanctuary, making every return to rest feel effortlessly special.",
    description_id:
      "Kenyamanan istirahat di rumah berawal dari sprei dan linen yang dirawat dengan sempurna. Dari sprei, duvet cover, hingga sarung bantal, setiap helai dibersihkan dan diselesaikan dengan penuh perhatian untuk mengembalikan kesegaran, kelembutan, dan rasa nyaman. Kami menghadirkan kembali kenyamanan pada ruang istirahat pribadi Anda.",
    quote: "Because true comfort is found in the little things.",
    quote_id:
      "Karena kenyamanan sejati berawal dari hal-hal kecil yang dirawat dengan baik.",
    price: "Start from 50K per piece",
    price_id: "Mulai dari 50K per helai",
    priceStarting: "50K",
    priceStarting_id: "50K",
    unit: "/ piece",
    unit_id: "/ helai",
    image: "/images/services/bedlinen.png",
    whatsappMessage:
      "Halo Laverie! Saya ingin konsultasi dan memesan layanan 03 / Bedlinen (The Linen Collection).",
    whatsappMessage_en:
      "Hello Laverie! I would like to inquire and book the 03 / Bedlinen (The Linen Collection) service.",
  },
  {
    id: "recoloring",
    number: "04",
    category: "04 / RECOLORING",
    category_id: "04 / RECOLORING",
    title: "Color Revival",
    title_id: "Color Revival",
    titleSecondary: "Recoloring",
    titleSecondary_id: "Recoloring",
    description:
      "Some pieces are simply too special to let go. Our Recoloring service offers a thoughtful way to bring renewed life to garments that have lost their original vibrancy, restoring depth and richness to their color. Through a careful recoloring process, we help refresh the appearance of your cherished pieces while preserving what makes them worth keeping.",
    description_id:
      "Beberapa pakaian terlalu berharga untuk dilepaskan begitu saja. Layanan Recoloring kami menawarkan cara terbaik untuk mengembalikan kehidupan pada busana yang telah memudar, memulihkan kedalaman dan kekayaan warnanya. Melalui proses pewarnaan ulang yang presisi, kami memperbarui tampilan pakaian kesayangan Anda tanpa menghilangkan kenangan berharga di setiap seratnya.",
    quote:
      "A new expression of color, with the same memories woven into every thread.",
    quote_id:
      "Ekspresi warna yang baru, dengan kenangan yang tetap hidup di setiap jalinan benang.",
    price: "Start from 80K per piece",
    price_id: "Mulai dari 80K per helai",
    priceStarting: "80K",
    priceStarting_id: "80K",
    unit: "/ piece",
    unit_id: "/ helai",
    image: "/images/services/recoloring.png",
    whatsappMessage:
      "Halo Laverie! Saya ingin konsultasi dan memesan layanan 04 / Recoloring (Color Revival).",
    whatsappMessage_en:
      "Hello Laverie! I would like to inquire and book the 04 / Recoloring (Color Revival) service.",
  },
  {
    id: "shoepreme",
    number: "05",
    category: "05 / IN COLLABORATION WITH SHOEPREME",
    category_id: "05 / IN COLLABORATION WITH SHOEPREME",
    title: "Shoe & Bag Atelier",
    title_id: "Shoe & Bag Atelier",
    titleSecondary: "Shoepreme",
    titleSecondary_id: "Shoepreme",
    collaboration: "Shoepreme",
    description:
      "Some of your most treasured pieces deserve attention beyond everyday care. Through our collaboration with Shoepreme, we bring specialized care to your shoes and bags, treating each piece with an understanding of its material, craftsmanship, and character. From gentle cleaning to thoughtful restoration, every process is approached with precision and attention to detail, helping preserve the beauty and extend the life of the pieces you love.",
    description_id:
      "Beberapa koleksi paling berharga Anda berhak mendapatkan perhatian di luar perawatan biasa. Melalui kolaborasi eksklusif kami bersama Shoepreme, kami menghadirkan perawatan khusus untuk sepatu dan tas Anda, memperlakukan setiap item dengan pemahaman mendalam atas material dan keahlian buatannya. Dari pembersihan lembut hingga restorasi menyeluruh, membantu merawat keindahan dan memperpanjang masa pakai barang kesayangan Anda.",
    quote: "Because exceptional care should never stop at your wardrobe.",
    quote_id:
      "Karena perawatan istimewa tidak seharusnya berhenti hanya pada pakaian Anda.",
    price: "Start from 100K per pair",
    price_id: "Mulai dari 100K per pasang",
    priceStarting: "100K",
    priceStarting_id: "100K",
    unit: "/ pair",
    unit_id: "/ pasang",
    image: "/images/services/shoepreme.png",
    whatsappMessage:
      "Halo Laverie! Saya ingin konsultasi dan memesan layanan 05 / Shoe & Bag Atelier bersama Shoepreme.",
    whatsappMessage_en:
      "Hello Laverie! I would like to inquire and book the 05 / Shoe & Bag Atelier in collaboration with Shoepreme.",
  },
];

