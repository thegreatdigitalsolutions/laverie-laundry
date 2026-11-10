import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.laveriepremiumlaundry.com";

export const metadata: Metadata = {
  title: "Laundry Premium Jakarta & Jakarta Utara | PIK & GreenBay Pluit",
  description:
    "Laverie Premium Laundry melayani laundry premium, express, dan antar jemput di PIK serta GreenBay Pluit. Temukan outlet, jam operasional, dan kontak WhatsApp kami.",
  alternates: { canonical: "/laundry-premium-jakarta" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${SITE_URL}/laundry-premium-jakarta`,
    title: "Laundry Premium Jakarta | Laverie PIK & GreenBay Pluit",
    description:
      "Layanan laundry premium dan antar jemput di PIK, Pluit, GreenBay, dan Jakarta Utara.",
  },
};

const branches = [
  {
    name: "Laverie Premium Laundry PIK",
    phone: "08170078883",
    whatsapp: "628170078883",
    address: "Pantai Indah Kapuk (PIK), Jakarta Utara, DKI Jakarta",
    hours: "Setiap hari, 07:30–21:00. Express cutoff 10:00 AM.",
    service:
      "Melayani kebutuhan laundry untuk hotel, vila, dan hunian di sekitar Pantai Indah Kapuk serta area Jakarta Utara.",
    map: "https://www.google.com/maps/search/?api=1&query=Laverie+Premium+Laundry+PIK+Jakarta",
  },
  {
    name: "Laverie Premium Laundry GreenBay",
    phone: "08170078884",
    whatsapp: "628170078884",
    address:
      "Bay Walk Mall, Jl. Pluit Karang Ayu Barat LGMF 3, RT.20/RW.2, Pluit, Penjaringan, Jakarta Utara, DKI Jakarta 14450",
    hours: "Setiap hari, 07:00–22:00. Express cutoff 10:00 AM.",
    service:
      "Melayani penjemputan harian untuk pelanggan di kawasan GreenBay Pluit dan area sekitarnya.",
    map: "https://www.google.com/maps/search/?api=1&query=Bay+Walk+Mall+Pluit+Jakarta",
  },
];

export default function LaundryPremiumJakartaPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Laundry Premium Jakarta - Laverie Premium Laundry",
    description:
      "Informasi layanan laundry premium Laverie di PIK dan GreenBay Pluit, Jakarta Utara.",
    url: `${SITE_URL}/laundry-premium-jakarta`,
    about: {
      "@type": "Service",
      name: "Laundry Premium Jakarta",
      provider: {
        "@type": "Organization",
        name: "Laverie Premium Laundry",
        url: SITE_URL,
      },
      areaServed: [
        { "@type": "City", name: "Jakarta Utara" },
        { "@type": "Place", name: "Pantai Indah Kapuk" },
        { "@type": "Place", name: "GreenBay Pluit" },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#03070C] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#00C4D4]">Beranda</Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Laundry Premium Jakarta</span>
        </nav>

        <header className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#00AEBB]">
            Laverie Premium Laundry · Jakarta Utara
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Laundry Premium Jakarta dengan Layanan di PIK & GreenBay Pluit
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Butuh laundry premium di Jakarta Utara? Laverie Premium Laundry
            menyediakan perawatan pakaian dan layanan antar jemput melalui dua
            titik layanan, yaitu Pantai Indah Kapuk (PIK) dan GreenBay Pluit.
            Pilih lokasi yang paling dekat, hubungi outlet, dan konfirmasikan
            jenis pakaian serta kebutuhan waktu pengerjaan sebelum melakukan
            pemesanan.
          </p>
        </header>

        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Lokasi outlet Laverie Jakarta">
          {branches.map((branch) => (
            <article key={branch.name} className="rounded-3xl border border-slate-200 p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-bold">{branch.name}</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{branch.service}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-bold">Alamat</dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-300">{branch.address}</dd>
                </div>
                <div>
                  <dt className="font-bold">Jam operasional</dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-300">{branch.hours}</dd>
                </div>
                <div>
                  <dt className="font-bold">Telepon / WhatsApp</dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-300">{branch.phone}</dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Halo ${branch.name}, saya ingin bertanya tentang layanan laundry.`)}`}
                  className="rounded-full bg-[#00C4D4] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#00B4C3]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi WhatsApp
                </a>
                <a
                  href={branch.map}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold dark:border-white/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat lokasi
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Layanan laundry untuk kebutuhan di Jakarta Utara</h2>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
            Laverie melayani pelanggan yang membutuhkan perawatan pakaian
            praktis di kawasan PIK, Pluit, GreenBay, dan lingkungan sekitarnya.
            Layanan antar jemput dapat dikoordinasikan dengan outlet sesuai
            alamat, cakupan area, jenis cucian, dan ketersediaan kurir.
          </p>
          <h3 className="mt-8 text-xl font-bold">Laundry express dan kebutuhan same-day</h3>
          <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
            Untuk kebutuhan express, hubungi outlet sebelum datang agar tim
            dapat mengonfirmasi batas penerimaan, estimasi penyelesaian, dan
            apakah jenis pakaian Anda dapat diproses dalam waktu yang diminta.
            Cutoff express yang tercantum saat ini adalah pukul 10:00 AM.
          </p>
          <h3 className="mt-8 text-xl font-bold">Cara memesan laundry</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600 dark:text-slate-300">
            <li>Pilih outlet PIK atau GreenBay yang paling sesuai dengan lokasi Anda.</li>
            <li>Hubungi outlet melalui WhatsApp untuk menanyakan layanan dan penjemputan.</li>
            <li>Sampaikan jenis pakaian, alamat pickup, dan target waktu pengerjaan.</li>
            <li>Konfirmasikan harga serta estimasi selesai sebelum pesanan diproses.</li>
          </ol>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-50 p-8 dark:bg-white/[0.05]">
          <h2 className="text-2xl font-bold">Cari laundry premium di PIK atau Pluit?</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Kunjungi halaman utama untuk melihat pilihan layanan, paket, dan
            informasi lengkap Laverie Premium Laundry.
          </p>
          <Link href="/" className="mt-5 inline-flex rounded-full bg-[#00C4D4] px-6 py-3 font-bold text-slate-950">
            Kembali ke Laverie Premium Laundry
          </Link>
        </section>
      </div>
    </main>
  );
}
