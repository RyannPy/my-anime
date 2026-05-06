import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ── DATA ──────────────────────────────────────────────
const ANIME_CARDS = [
  { id: 1, title: "Classroom of the Elite", genre: "School", rating: 9.2, img: "/images/anime_1.jpg" },
  { id: 2, title: "Oshi no Ko", genre: "Drama", rating: 9.0, img: "/images/anime_2.jpg" },
  { id: 3, title: "Grand Blue", genre: "Comedy", rating: 9.5, img: "/images/anime_3.jpg" },
  { id: 4, title: "Eighty Six", genre: "Drama", rating: 8.9, img: "/images/anime_4.jpg" },
  { id: 5, title: "Naruto", genre: "Action", rating: 9.3, img: "/images/anime_5.jpg" },
];

const FEATURES = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    title: "Catat Tontonan",
    desc: "Simpan semua anime yang sudah kamu tonton beserta detail lengkapnya dalam satu tempat.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Rating & Review",
    desc: "Beri penilaian dan tulis review singkat untuk setiap anime yang kamu selesaikan.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Histori Tontonan",
    desc: "Lihat kembali semua anime yang pernah kamu tonton, lengkap dengan tanggal dan waktu.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Statistik Anime",
    desc: "Analisis genre favorit, rata-rata rating, dan tren tontonanmu lewat dashboard analytics.",
  },
];

// ── ANIMATION VARIANTS ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── STAR RATING ───────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="text-xs font-semibold text-slate-600">{rating}</span>
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────
const Landing = () => {
  const navigate = useNavigate();

  const goToAuth = (mode = "login") => {
    navigate("/auth", { state: { mode } });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-mono text-slate-900">

      {/* ── NAVBAR ─────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/30">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-widest text-slate-900">MYANIME</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {["Fitur", "Preview", "Mulai"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goToAuth("login")}
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 sm:block"
            >
              Login
            </button>
            <button
              onClick={() => goToAuth("register")}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white py-20 md:py-32">
        {/* Dekoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          {/* Teks kiri */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Anime Tracker Terbaik
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
            >
              Catat Setiap{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Anime</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full rounded-full bg-blue-200/60" />
              </span>{" "}
              yang Kamu Tonton
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500">
              MyAnime adalah tracker personal untuk menyimpan, menilai, dan menganalisis perjalanan anime-mu. Semua dalam satu tempat yang rapi dan modern.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => goToAuth("register")}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-blue-600/40"
              >
                Mulai Gratis
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={() => goToAuth("login")}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Sudah Punya Akun?
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["/images/anime_1.jpg", "/images/anime_2.jpg", "/images/anime_3.jpg"].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover shadow" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-800">1,200+</span> anime sudah tercatat
              </p>
            </motion.div>
          </motion.div>

          {/* Collage kanan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative grid grid-cols-3 auto-rows-[120px] md:auto-rows-[150px] gap-3 md:gap-4 w-full">
              {/* Card besar kiri */}
              <div className="relative col-span-1 row-span-2 overflow-hidden rounded-3xl shadow-2xl shadow-slate-400/20">
                <img src="/images/anime_3.jpg" alt="anime" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                  <p className="text-xs font-bold text-white md:text-sm">Grand Blue</p>
                  <StarRating rating={9.5} />
                </div>
              </div>
              {/* Cards kanan atas */}
              <div className="relative col-span-2 row-span-1 overflow-hidden rounded-3xl shadow-xl shadow-slate-400/20">
                <img src="/images/anime_1.jpg" alt="anime" className="h-full w-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                  <p className="text-xs font-bold text-white md:text-sm">Classroom of the Elite</p>
                  <StarRating rating={9.2} />
                </div>
              </div>
              {/* Card kanan bawah - 2 cards */}
              <div className="relative col-span-1 row-span-1 overflow-hidden rounded-3xl shadow-xl shadow-slate-400/20">
                <img src="/images/anime_2.jpg" alt="anime" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3">
                  <p className="text-xs font-bold text-white">Oshi no Ko</p>
                </div>
              </div>
              <div className="relative col-span-1 row-span-1 overflow-hidden rounded-3xl shadow-xl shadow-slate-400/20">
                <img src="/images/anime_4.jpg" alt="anime" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3">
                  <p className="text-xs font-bold text-white">Eighty Six</p>
                </div>
              </div>
            </div>
            {/* Badge melayang */}
            <div className="absolute -left-6 bottom-10 hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xl lg:block">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Anime ditambahkan!</p>
                  <p className="text-xs text-slate-400">Ryuu no Ken · barusan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FITUR ──────────────────────────────────── */}
      <section id="fitur" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-500">
              Fitur Unggulan
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 md:text-5xl">
              Semua yang Kamu Butuhkan
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-slate-500">
              MyAnime dirancang untuk penggemar anime yang ingin mengelola koleksi tontonan dengan cara yang lebih terstruktur dan menyenangkan.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-7 transition hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-xl hover:shadow-blue-100/50"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PREVIEW SECTION ────────────────────────── */}
      <section id="preview" className="overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-500">
              Koleksi Kamu
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 md:text-5xl">
              Tampilan Aplikasi
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-slate-500">
              Lihat bagaimana animemu akan tersimpan dengan rapi dalam tampilan card yang modern dan informatif.
            </motion.p>
          </motion.div>

          {/* Card Grid dengan ukuran bervariasi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] lg:auto-rows-[240px] gap-4 md:gap-6"
          >
            {ANIME_CARDS.map((anime, i) => (
              <motion.div
                key={anime.id}
                variants={fadeUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-3xl shadow-lg ${
                  i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                }`}
              >
                <div className="h-full w-full">
                  <img
                    src={anime.img}
                    alt={anime.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="mb-2 inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {anime.genre}
                    </span>
                    <p className={`font-bold text-white ${i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                      {anime.title}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-amber-400">{anime.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MULAI / CTA SECTION ────────────────────── */}
      <section id="mulai" className="relative overflow-hidden bg-blue-600 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-400/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-200">
              Siap Memulai?
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Mulai Catat Anime<br />Favoritmu Sekarang
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-lg text-lg text-blue-100/90">
              Bergabunglah dan kelola koleksi animemu dengan lebih terstruktur, rapi, dan menyenangkan.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => goToAuth("register")}
                className="rounded-2xl bg-white px-10 py-4 text-sm font-bold text-blue-600 shadow-xl shadow-blue-900/20 transition hover:bg-blue-50 hover:shadow-2xl"
              >
                Daftar Sekarang — Gratis
              </button>
              <button
                onClick={() => goToAuth("login")}
                className="rounded-2xl border-2 border-white/30 px-10 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10"
              >
                Sudah Punya Akun
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-widest text-slate-700">MYANIME</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 RyannPy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
