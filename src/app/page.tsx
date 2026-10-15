"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  ShieldCheck,
  Newspaper,
  BookOpen,
  Scale,
  Lock,
  HeartPulse,
  Users,
  MessageSquare,
  Zap,
  Share2,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  ExternalLink,
  Sparkles,
  FileCode2,
  Presentation,
  RotateCcw,
  GraduationCap,
  Menu,
  X,
  ArrowDown,
  ArrowUp,
  Eye,
  Radio,
} from "lucide-react";

type FilterMode = "all" | "citizen" | "journalism";

interface CharacteristicItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName: string;
}

interface ComparisonRow {
  id: string;
  aspect: string;
  digitalCitizen: string;
  citizenJournalism: string;
  highlightCitizen: string;
  highlightJournalism: string;
}

interface QuizQuestion {
  id: number;
  code: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const DIGITAL_CITIZEN_CHARS: CharacteristicItem[] = [
  {
    id: "dc-1",
    number: "01",
    title: "Literasi Digital",
    subtitle: "Digital Literacy & Critical Thinking",
    description:
      "Kemampuan mencari, memahami, mengevaluasi, dan memverifikasi kebenaran informasi secara kritis sebelum mempercayai atau membagikannya, sehingga mampu menangkal hoaks dan disinformasi.",
    tag: "Kognitif & Verifikasi",
    iconName: "BookOpen",
  },
  {
    id: "dc-2",
    number: "02",
    title: "Etika & Netiket",
    subtitle: "Digital Etiquette",
    description:
      "Mematuhi standar sopan santun dan tata krama berinteraksi di ruang siber, menghargai keberagaman pendapat, berempati, serta menghindari ujaran kebencian, perundungan siber (cyberbullying), dan provokasi.",
    tag: "Perilaku Sosial",
    iconName: "MessageSquare",
  },
  {
    id: "dc-3",
    number: "03",
    title: "Keamanan & Privasi",
    subtitle: "Digital Security & Privacy",
    description:
      "Kesadaran aktif untuk melindungi data pribadi milik sendiri maupun orang lain, menerapkan kata sandi kuat dan autentikasi dua faktor (2FA), serta mewaspadai kejahatan phishing atau pencurian identitas.",
    tag: "Proteksi Diri",
    iconName: "Lock",
  },
  {
    id: "dc-4",
    number: "04",
    title: "Kepatuhan Hukum Siber",
    subtitle: "Digital Law",
    description:
      "Memahami bahwa ruang digital memiliki konsekuensi hukum nyata (seperti UU ITE dan UU Pelindungan Data Pribadi), menghormati Hak Kekayaan Intelektual (HKI), serta tidak melakukan plagiarisme atau pembajakan.",
    tag: "Tanggung Jawab Hukum",
    iconName: "Scale",
  },
  {
    id: "dc-5",
    number: "05",
    title: "Kesehatan & Kesejahteraan",
    subtitle: "Digital Health & Wellness",
    description:
      "Menjaga keseimbangan fisik dan kesehatan mental saat berinteraksi dengan teknologi, termasuk manajemen waktu layar (screen time), ergonomi tubuh, dan detoksifikasi dari tekanan media sosial.",
    tag: "Keseimbangan Hidup",
    iconName: "HeartPulse",
  },
  {
    id: "dc-6",
    number: "06",
    title: "Akses & Partisipasi Produktif",
    subtitle: "Digital Access & Commerce",
    description:
      "Berpartisipasi secara inklusif dalam ekosistem pembelajaran daring, layanan publik, maupun transaksi ekonomi digital yang cerdas, transparan, dan saling memberdayakan komunitas.",
    tag: "Partisipasi Aktif",
    iconName: "Users",
  },
];

const CITIZEN_JOURNALISM_CHARS: CharacteristicItem[] = [
  {
    id: "cj-1",
    number: "01",
    title: "Pelaku Non-Profesional",
    subtitle: "Ordinary Citizens as Reporters",
    description:
      "Dilakukan oleh warga biasa (mahasiswa, pekerja, masyarakat umum) yang bukan wartawan profesional dan tidak terikat pada struktur organisasi perusahaan pers arus utama.",
    tag: "Berbasis Warga",
    iconName: "Users",
  },
  {
    id: "cj-2",
    number: "02",
    title: "Spontan & Real-Time",
    subtitle: "Immediacy & Eyewitness",
    description:
      "Melaporkan peristiwa secara langsung dari lokasi kejadian sebagai saksi mata pertama (first-hand witness), sehingga sering kali lebih cepat terpublikasi dibandingkan liputan media konvensional.",
    tag: "Kecepatan Lapor",
    iconName: "Zap",
  },
  {
    id: "cj-3",
    number: "03",
    title: "Berbasis Media Sosial & Kanal Terbuka",
    subtitle: "User-Generated Content Platforms",
    description:
      "Memanfaatkan perangkat gawai sehari-hari (smartphone) dan dipublikasikan secara mandiri melalui blog, X (Twitter), Instagram, TikTok, YouTube, atau portal warga seperti Kompasiana.",
    tag: "Media Partisipatif",
    iconName: "Share2",
  },
  {
    id: "cj-4",
    number: "04",
    title: "Fokus Isu Lokal & Akar Rumput",
    subtitle: "Hyperlocal Perspective",
    description:
      "Mengangkat peristiwa dekat di lingkungan sekitar (kondisi jalan rusak, bencana desa, kegiatan komunitas) yang bernilai penting bagi warga lokal namun kerap luput dari pantauan media nasional.",
    tag: "Perspektif Lokal",
    iconName: "MapPin",
  },
  {
    id: "cj-5",
    number: "05",
    title: "Interaktif & Kolaboratif",
    subtitle: "Two-Way Public Dialogue",
    description:
      "Menghapus batas kaku antara pembuat berita dan pembaca; audiens dapat langsung berdiskusi, memberi kesaksian tambahan, atau mengoreksi data melalui kolom komentar secara terbuka.",
    tag: "Kolaborasi Publik",
    iconName: "Radio",
  },
  {
    id: "cj-6",
    number: "06",
    title: "Tanpa Gatekeeping Redaksi Formal",
    subtitle: "Unfiltered & Self-Edited",
    description:
      "Tidak melewati proses penyuntingan berlapis oleh redaktur profesional, sehingga kualitas dan akurasinya sangat bergantung pada kejujuran, etika, serta kesadaran verifikasi sang warga pelapor.",
    tag: "Tantangan Verifikasi",
    iconName: "Eye",
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "focus",
    aspect: "1. Fokus Utama",
    highlightCitizen: "Etika, perilaku, & tanggung jawab berinternet",
    digitalCitizen:
      "Cara bersikap, berinteraksi, dan menggunakan teknologi digital secara aman, etis, kritis, serta bertanggung jawab dalam seluruh aspek kehidupan sehari-hari.",
    highlightJournalism: "Produksi & pelaporan berita oleh warga",
    citizenJournalism:
      "Aktivitas spesifik dalam mencari, merekam, mengolah, dan menyebarluaskan informasi atau berita faktual mengenai suatu peristiwa kepada publik.",
  },
  {
    id: "actor",
    aspect: "2. Subjek / Pelaku",
    highlightCitizen: "Seluruh pengguna teknologi digital",
    digitalCitizen:
      "Setiap individu yang terhubung ke ruang digital (pelajar, mahasiswa, pekerja, konsumen) baik ketika membaca, berkomentar, berbelanja, maupun belajar daring.",
    highlightJournalism: "Warga yang berperan sebagai pewarta aktif",
    citizenJournalism:
      "Masyarakat umum (non-jurnalis profesional) yang secara aktif mengambil peran sebagai saksi mata dan pelapor peristiwa di sekitarnya.",
  },
  {
    id: "goal",
    aspect: "3. Tujuan Utama",
    highlightCitizen: "Ekosistem siber yang aman, sehat, & beradab",
    digitalCitizen:
      "Menciptakan lingkungan digital yang kondusif, inklusif, bebas dari perundungan siber, terlindung dari kejahatan data, dan patuh pada hukum.",
    highlightJournalism: "Demokratisasi informasi & kecepatan kabar lokal",
    citizenJournalism:
      "Memberikan informasi alternatif dari lapangan secara cepat, mengisi ruang kosong liputan media arus utama, dan menyuarakan aspirasi komunitas lokal.",
  },
  {
    id: "activity",
    aspect: "4. Bentuk Aktivitas",
    highlightCitizen: "Menjaga privasi, saring sebelum sharing, & netiket",
    digitalCitizen:
      "Mengamankan akun dengan 2FA, memilah fakta dari hoaks, berdiskusi santun di forum akademik, serta menghormati hak cipta karya digital.",
    highlightJournalism: "Mendokumentasikan & mempublikasikan fakta lapangan",
    citizenJournalism:
      "Memotret atau merekam video kejadian, mewawancarai saksi di lokasi, menulis utas kronologis, dan mengunggah laporan warga ke platform publik.",
  },
  {
    id: "skill",
    aspect: "5. Kompetensi Kunci",
    highlightCitizen: "9 Elemen Kewargaan Digital (Ribble)",
    digitalCitizen:
      "Literasi informasi, keamanan siber dasar (cyber hygiene), netiket komunikasi, kesadaran hukum digital, dan manajemen kesehatan layar.",
    highlightJournalism: "Kepekaan berita & dokumentasi faktual (5W+1H)",
    citizenJournalism:
      "Kepekaan terhadap peristiwa bernilai berita, keterampilan mengambil bukti visual/audio, penyusunan fakta kronologis (5W+1H), dan verifikasi lapangan.",
  },
  {
    id: "rules",
    aspect: "6. Pedoman & Aturan",
    highlightCitizen: "Norma sosial siber, Netiket, & Regulasi (UU ITE/PDP)",
    digitalCitizen:
      "Berpedoman pada etika pergaulan internet (netiquette), panduan komunitas platform, serta perundang-undangan informasi dan transaksi elektronik.",
    highlightJournalism: "Prinsip dasar jurnalistik warga & verifikasi fakta",
    citizenJournalism:
      "Berpedoman pada kejujuran fakta, akurasi lokasi/waktu, keberimbangan sudut pandang, penghormatan privasi korban, serta etika publikasi publik.",
  },
  {
    id: "example",
    aspect: "7. Contoh Nyata",
    highlightCitizen: "Diskusi akademik santun & cek fakta grup keluarga",
    digitalCitizen:
      "Mahasiswa UT berdiskusi di forum Tuton dengan mencantumkan sumber ilmiah serta tidak ikut menyebarkan pesan berantai yang belum jelas kebenarannya.",
    highlightJournalism: "Laporan langsung banjir/kemacetan oleh warga",
    citizenJournalism:
      "Seorang warga merekam kondisi terkini banjir di jalan utamanya lengkap dengan jam, titik lokasi, dan tinggi air untuk membantu warga lain mencari rute aman.",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    code: "PERTANYAAN 01 • PEMBEDA UTAMA",
    question:
      "Manakah pernyataan yang paling tepat menjelaskan perbedaan mendasar antara Digital Citizen dan Citizen Journalism?",
    options: [
      {
        id: "1a",
        text: "Digital Citizen hanya berlaku bagi pejabat publik, sedangkan Citizen Journalism berlaku bagi seluruh pengguna media sosial.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Digital Citizen berlaku bagi setiap individu yang menggunakan teknologi digital dan internet, bukan hanya pejabat publik.",
      },
      {
        id: "1b",
        text: "Digital Citizen berfokus pada etika, literasi, dan tanggung jawab menyeluruh sebagai warga di ruang digital, sedangkan Citizen Journalism berfokus pada peran aktif warga dalam meliput serta melaporkan peristiwa bernilai berita.",
        isCorrect: true,
        feedback:
          "Tepat sekali! Digital Citizen adalah payung perilaku dan etika kewargaan digital, sementara Citizen Journalism adalah aktivitas spesifik memproduksi dan menyiarkan berita oleh warga.",
      },
      {
        id: "1c",
        text: "Digital Citizen mewajibkan kepemilikan kartu pers resmi, sedangkan Citizen Journalism tidak memerlukan koneksi internet.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Baik Digital Citizen maupun Citizen Journalism tidak mewajibkan kartu pers resmi, dan keduanya erat memanfaatkan teknologi digital.",
      },
    ],
  },
  {
    id: 2,
    code: "PERTANYAAN 02 • KARAKTERISTIK & IMPLEMENTASI",
    question:
      "Seorang warga mendokumentasikan kejadian tanah longsor di desanya menggunakan ponsel pintar, mencantumkan waktu dan titik lokasi secara akurat, mengaburkan wajah korban demi privasi, lalu mengunggahnya agar pengendara lain waspada. Tindakan ini mencerminkan...",
    options: [
      {
        id: "2a",
        text: "Praktik Citizen Journalism yang dilandasi oleh kesadaran dan etika Digital Citizen yang baik.",
        isCorrect: true,
        feedback:
          "Benar! Melaporkan kejadian secara langsung dari lapangan adalah wujud Citizen Journalism, sedangkan akurasi data dan menjaga privasi korban adalah wujud etika Digital Citizen.",
      },
      {
        id: "2b",
        text: "Pelanggaran hak cipta digital karena merekam peristiwa di ruang terbuka tanpa izin perusahaan televisi.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Merekam peristiwa kepentingan publik secara faktual dan etis di ruang terbuka merupakan bagian sah dari partisipasi jurnalisme warga.",
      },
      {
        id: "2c",
        text: "Aktivitas Digital Commerce karena menggunakan perangkat ponsel pintar di jalan raya.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Digital Commerce berkaitan dengan transaksi jual-beli daring, bukan pelaporan informasi bencana.",
      },
    ],
  },
  {
    id: 3,
    code: "PERTANYAAN 03 • SINERGI KEDUA KONSEP",
    question:
      "Mengapa seorang pelaku Citizen Journalism sangat membutuhkan karakteristik Digital Citizen sebelum mengunggah laporannya ke publik?",
    options: [
      {
        id: "3a",
        text: "Agar unggahannya otomatis viral dan mendapatkan kompensasi iklan dari platform media sosial.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Tujuan utama etika kewargaan digital bukanlah mengejar viralitas semata, melainkan menjaga kebenaran dan tanggung jawab sosial.",
      },
      {
        id: "3b",
        text: "Karena tanpa literasi dan etika Digital Citizen, laporan yang cepat namun tanpa verifikasi berisiko menjadi hoaks, melanggar privasi orang lain, atau melanggar hukum siber.",
        isCorrect: true,
        feedback:
          "Sangat tepat! Kecepatan laporan warga (Citizen Journalism) harus selalu dikawal oleh filter verifikasi, netiket, dan kesadaran hukum (Digital Citizen).",
      },
      {
        id: "3c",
        text: "Agar laporan warga tidak boleh dikomentari atau didiskusikan oleh pengguna internet lainnya.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Salah satu karakteristik Citizen Journalism justru sifatnya yang interaktif dan membuka ruang diskusi publik yang sehat.",
      },
    ],
  },
];

const SLIDE_SECTIONS = [
  { id: "hero", label: "Sampul" },
  { id: "pengertian", label: "01. Pengertian" },
  { id: "digital-citizen", label: "02. Digital Citizen" },
  { id: "citizen-journalism", label: "03. Citizen Journalism" },
  { id: "perbedaan", label: "04. Tabel Perbedaan" },
  { id: "hubungan", label: "05. Hubungan & Irisan" },
  { id: "studi-kasus", label: "06. Studi Kasus" },
  { id: "kuis", label: "07. Uji Pemahaman" },
  { id: "kesimpulan", label: "08. Kesimpulan" },
  { id: "referensi", label: "09. Referensi & Tugas" },
];

export default function Home() {
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    focus: true,
    actor: true,
    goal: true,
    activity: true,
    skill: true,
    rules: true,
    example: true,
  });
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className={className} />;
      case "MessageSquare":
        return <MessageSquare className={className} />;
      case "Lock":
        return <Lock className={className} />;
      case "Scale":
        return <Scale className={className} />;
      case "HeartPulse":
        return <HeartPulse className={className} />;
      case "Users":
        return <Users className={className} />;
      case "Zap":
        return <Zap className={className} />;
      case "Share2":
        return <Share2 className={className} />;
      case "MapPin":
        return <MapPin className={className} />;
      case "Radio":
        return <Radio className={className} />;
      case "Eye":
        return <Eye className={className} />;
      default:
        return <ShieldCheck className={className} />;
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (presentationMode) {
      const idx = SLIDE_SECTIONS.findIndex((s) => s.id === id);
      if (idx !== -1) setCurrentSlide(idx);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (questionId: number, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
  };

  const copyText = (key: string, text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const quizScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    const picked = selectedAnswers[q.id];
    const found = q.options.find((o) => o.id === picked);
    return acc + (found?.isCorrect ? 1 : 0);
  }, 0);

  const formattedUtAnswer = `JAWABAN TUGAS MATA KULIAH BELAJAR DI ERA DIGITAL (SEMESTER 3 - UNIVERSITAS TERBUKA)

1. Perbedaan dan Karakteristik Digital Citizen serta Citizen Journalism:

A. Pembeda Utama:
- Fokus & Cakupan: Digital Citizen (Warga Digital) berfokus pada cara bersikap, etika, literasi, keamanan, dan tanggung jawab setiap individu saat menggunakan teknologi internet secara umum (Ribble, 2015). Sedangkan Citizen Journalism (Jurnalisme Warga) berfokus pada aktivitas spesifik masyarakat biasa (bukan jurnalis profesional) dalam mengumpulkan, melaporkan, mengolah, dan menyebarkan berita/informasi faktual ke ruang publik (Bowman & Willis, 2003).
- Subjek/Pelaku: Digital Citizen mencakup seluruh pengguna internet dalam aktivitas sehari-hari, sementara Citizen Journalism dilakukan oleh warga yang mengambil peran aktif sebagai pewarta atau saksi mata suatu peristiwa.
- Tujuan: Digital Citizen bertujuan membangun ekosistem digital yang sehat, beradab, aman, dan patuh hukum; sedangkan Citizen Journalism bertujuan menyampaikan informasi cepat dari lapangan, mengangkat isu lokal (hyperlocal), dan mendemokratisasi produksi berita.

B. Karakteristik Digital Citizen:
1) Literasi Digital (mampu mengevaluasi informasi secara kritis & menangkal hoaks).
2) Etika & Netiket (menjaga sopan santun komunikasi daring & bebas cyberbullying).
3) Keamanan & Privasi Digital (melindungi data pribadi & keamanan akun).
4) Kepatuhan Hukum Siber (memahami UU ITE, UU PDP, dan hak cipta).
5) Kesehatan & Kesejahteraan Digital (mengelola screen time & kesehatan mental).
6) Akses & Partisipasi Produktif di ruang siber.

C. Karakteristik Citizen Journalism:
1) Dilakukan oleh warga biasa (non-profesional / di luar institusi pers formal).
2) Spontan dan real-time langsung dari lokasi kejadian (eyewitness).
3) Memanfaatkan perangkat mobile dan platform terbuka (media sosial, blog, portal warga).
4) Berfokus pada isu lokal/komunitas (hyperlocal) yang dekat dengan masyarakat.
5) Interaktif dan kolaboratif (membuka ruang diskusi dua arah di kolom komentar).
6) Tanpa gatekeeping redaksi berlapis sehingga menuntut kesadaran verifikasi mandiri.

2. Tautan Media Pembelajaran Digital (Presentasi Web Interaktif Pengganti MS Sway):
Dibangun menggunakan Next.js & Tailwind CSS dengan struktur narasi interaktif setara MS Sway.`;

  const isSectionVisible = (sectionId: string) => {
    if (!presentationMode) return true;
    return SLIDE_SECTIONS[currentSlide]?.id === sectionId;
  };

  return (
    <div className="min-h-screen bg-[#F9F8FE] text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Sticky Navbar (Desktop & Mobile) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F766E] text-white text-xs font-bold tracking-wide uppercase shrink-0 hover:bg-teal-800 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Belajar di Era Digital</span>
            </button>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 truncate">
              Universitas Terbuka • Semester 3
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => scrollToSection("pengertian")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Pengertian
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("digital-citizen")}
              className="px-2.5 py-1.5 rounded-md hover:bg-teal-50 hover:text-[#0F766E] transition-colors cursor-pointer"
            >
              Digital Citizen
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("citizen-journalism")}
              className="px-2.5 py-1.5 rounded-md hover:bg-orange-50 hover:text-[#7C2D12] transition-colors cursor-pointer"
            >
              Citizen Journalism
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("perbedaan")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Perbedaan
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("hubungan")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Hubungan
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("studi-kasus")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Studi Kasus
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("kuis")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Kuis
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("kesimpulan")}
              className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Kesimpulan
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setPresentationMode((prev) => !prev);
                setCurrentSlide(0);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                presentationMode
                  ? "bg-[#3730A3] text-white border-[#3730A3] shadow-sm"
                  : "bg-indigo-50/80 text-[#3730A3] border-indigo-200 hover:bg-indigo-100"
              }`}
              title="Beralih antara tampilan gulir web dan tampilan slide ala MS Sway"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {presentationMode ? "Mode Gulir Penuh" : "Mode Slide Sway"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowAnswerModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#3730A3] hover:bg-[#2D249B] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              title="Lihat ringkasan jawaban tugas & panduan link pengumpulan UT"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Form Jawaban UT</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Buka navigasi"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile & Quick Topic Filter Bar */}
        <div className="bg-slate-50/90 border-t border-slate-200/60 px-4 py-2">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === "all"
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/90"
                    : "text-slate-600 hover:bg-white/60"
                }`}
              >
                Semua Materi
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("citizen")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === "citizen"
                    ? "bg-[#CDF5F4] text-[#0F766E] border border-[#99F6E4] shadow-sm"
                    : "bg-[#E6FFFF]/70 text-[#0F766E] hover:bg-[#CDF5F4]/60"
                }`}
              >
                Digital Citizen
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("journalism")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterMode === "journalism"
                    ? "bg-[#F8E0D4] text-[#7C2D12] border border-[#FED7AA] shadow-sm"
                    : "bg-[#FDF2EC] text-[#7C2D12] hover:bg-[#F8E0D4]/60"
                }`}
              >
                Citizen Journalism
              </button>
            </div>

            {presentationMode && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3730A3]">
                <button
                  type="button"
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="p-1 rounded bg-white border border-indigo-200 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span>
                  Bagian {currentSlide + 1} / {SLIDE_SECTIONS.length}:{" "}
                  {SLIDE_SECTIONS[currentSlide]?.label}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((s) => Math.min(SLIDE_SECTIONS.length - 1, s + 1))
                  }
                  disabled={currentSlide === SLIDE_SECTIONS.length - 1}
                  className="p-1 rounded bg-white border border-indigo-200 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            {SLIDE_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-[#3730A3] transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      {isSectionVisible("hero") && (
        <section
          id="hero"
          className="relative overflow-hidden bg-white pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-100"
        >
          {/* Decorative Corner Radial Blurs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#CDF5F4]/65 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F8E0D4]/65 blur-3xl"
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3FF] border border-indigo-100 text-[11px] sm:text-xs font-semibold text-slate-700 mb-5 shadow-xs">
              <span>MEDIA PEMBELAJARAN DIGITAL</span>
              <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
              <span>UNIVERSITAS TERBUKA • SEMESTER 3</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Digital Citizen{" "}
              <span className="text-[#0F766E] font-extrabold">&amp;</span>{" "}
              Citizen Journalism
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              Memahami faktor pembeda utama, karakteristik masing-masing peran, serta
              bagaimana etika warga digital dan partisipasi jurnalisme warga saling
              melengkapi dalam ekosistem informasi modern.
            </p>

            {/* Student Context Card */}
            <div className="max-w-xl mx-auto mb-6 bg-[#F9F8FE] border border-indigo-100/90 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-left shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#3730A3] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  UT
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Tugas Mata Kuliah: Belajar di Era Digital
                  </p>
                  <p className="text-[11px] text-slate-600 truncate">
                    Mahasiswa Semester 3 • Konversi Web Interaktif (Next.js &amp; Tailwind CSS)
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EAEDFE] text-[#3730A3] text-[11px] font-bold shrink-0">
                Pengganti Sway
              </span>
            </div>

            {/* Hero Split Illustration Showcase Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-5 sm:p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                {/* Left Badge: Digital Citizen */}
                <div className="order-2 md:order-1 flex flex-col items-center md:items-end">
                  <div className="w-full max-w-xs rounded-2xl bg-[#E6FFFF] border border-[#99F6E4] p-4 text-left shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                        Digital Citizen
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mb-1">
                      Warga Digital yang Beretika
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Literasi kritis, keamanan privasi, kepatuhan hukum, dan sopan santun
                      di ruang siber.
                    </p>
                  </div>
                </div>

                {/* Center: Hero Split Illustration */}
                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#F4F6FF] border border-slate-200/70 p-2 flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src="data:image/png;base64,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"
                      alt="Ilustrasi Perbandingan Digital Citizen dan Citizen Journalism"
                      className="max-w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Right Badge: Citizen Journalism */}
                <div className="order-3 flex flex-col items-center md:items-start">
                  <div className="w-full max-w-xs rounded-2xl bg-[#FDF2EC] border border-[#FED7AA] p-4 text-left shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C2D12]">
                        Citizen Journalism
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mb-1">
                      Jurnalisme Warga Partisipatif
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Meliput, mendokumentasikan, dan melaporkan fakta peristiwa secara
                      langsung dari lapangan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hero CTA Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("pengertian")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3730A3] hover:bg-[#2D249B] text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-900/15 transition-all cursor-pointer"
              >
                <span>Mulai Pelajari Materi</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("perbedaan")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#0F766E]" />
                <span>Lihat Tabel Perbedaan</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 01: PENGERTIAN & KONSEP DASAR */}
      {isSectionVisible("pengertian") && (
        <section
          id="pengertian"
          className="py-14 sm:py-16 bg-[#F3F3FF] border-b border-indigo-100/70"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#0F766E] mb-2">
                01 • PENGERTIAN DASAR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Mengenal Dua Konsep Utama di Era Digital
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Perkembangan teknologi informasi dan media sosial melahirkan dua konsep
                penting yang saling berkaitan namun memiliki ranah pengertian, fungsi,
                serta tanggung jawab yang berbeda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Digital Citizen Definition Card */}
              {(filterMode === "all" || filterMode === "citizen") && (
                <div className="bg-white rounded-2xl border border-slate-200/90 border-t-4 border-t-[#0F766E] p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E6FFFF] text-[#0F766E] text-xs font-bold mb-4">
                      <ShieldCheck className="w-4 h-4" />
                      <span>DIGITAL CITIZEN (WARGA DIGITAL)</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2.5">
                      Apa itu Digital Citizen?
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Menurut <strong>Mike Ribble (2015)</strong> dan{" "}
                      <strong>Mossberger et al. (2008)</strong>, <em>Digital Citizen</em>{" "}
                      adalah individu yang memanfaatkan teknologi informasi dan internet
                      secara rutin, efektif, kritis, serta mematuhi norma perilaku yang
                      bertanggung jawab (etika, keamanan, dan hukum) dalam berpartisipasi
                      di tengah masyarakat digital.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Kata Kunci Utama:</span>
                    <span className="font-bold text-[#0F766E]">
                      Etika, Literasi, Keamanan &amp; Tanggung Jawab
                    </span>
                  </div>
                </div>
              )}

              {/* Citizen Journalism Definition Card */}
              {(filterMode === "all" || filterMode === "journalism") && (
                <div className="bg-white rounded-2xl border border-slate-200/90 border-t-4 border-t-[#7C2D12] p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FDF2EC] text-[#7C2D12] text-xs font-bold mb-4">
                      <Newspaper className="w-4 h-4 text-[#EA580C]" />
                      <span>CITIZEN JOURNALISM (JURNALISME WARGA)</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2.5">
                      Apa itu Citizen Journalism?
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Menurut <strong>Bowman &amp; Willis (2003)</strong> dalam{" "}
                      <em>We Media</em>, <em>Citizen Journalism</em> adalah tindakan warga
                      biasa (bukan jurnalis profesional) yang berperan aktif dalam proses
                      mengumpulkan, melaporkan, menganalisis, serta menyebarluaskan berita
                      dan informasi faktual melalui kanal digital.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Kata Kunci Utama:</span>
                    <span className="font-bold text-[#7C2D12]">
                      Partisipasi Warga, Meliput &amp; Menyebarkan Berita
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 02: DIGITAL CITIZEN & KARAKTERISTIKNYA */}
      {isSectionVisible("digital-citizen") &&
        (filterMode === "all" || filterMode === "citizen") && (
          <section
            id="digital-citizen"
            className="py-14 sm:py-16 bg-white border-b border-slate-100"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="mb-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CDF5F4] text-[#0F766E] text-[11px] font-bold uppercase tracking-wider mb-2">
                  02 • KONSEP PERTAMA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Digital Citizen (Warga Digital)
                </h2>
              </div>

              {/* Highlight Callout Box */}
              <div className="rounded-2xl bg-[#E6FFFF] border border-[#99F6E4] p-5 mb-8 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F766E] mb-1">
                    Esensi Kewargaan Digital (Digital Citizenship)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Menjadi <em>Digital Citizen</em> bukan sekadar memiliki akses internet,
                    melainkan memiliki{" "}
                    <span className="px-1.5 py-0.5 rounded bg-[#CDF5F4] font-semibold text-[#0F766E]">
                      kompetensi literasi
                    </span>
                    ,{" "}
                    <span className="px-1.5 py-0.5 rounded bg-[#CDF5F4] font-semibold text-[#0F766E]">
                      kesadaran etika
                    </span>
                    , dan{" "}
                    <span className="px-1.5 py-0.5 rounded bg-[#CDF5F4] font-semibold text-[#0F766E]">
                      tanggung jawab hukum
                    </span>{" "}
                    dalam setiap aktivitas di dunia maya (mengacu pada{" "}
                    <em>Nine Elements of Digital Citizenship</em> oleh Mike Ribble).
                  </p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-5">
                6 Karakteristik Utama Digital Citizen
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {DIGITAL_CITIZEN_CHARS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0F766E]/50 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#E6FFFF] border border-[#99F6E4] text-[#0F766E] flex items-center justify-center">
                          {renderIcon(item.iconName, "w-4 h-4")}
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-[#0F766E] text-white text-[11px] font-extrabold">
                          {item.number}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#0F766E] mb-2">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                      <span className="text-[11px] font-bold text-[#0F766E]">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* SECTION 03: CITIZEN JOURNALISM & KARAKTERISTIKNYA */}
      {isSectionVisible("citizen-journalism") &&
        (filterMode === "all" || filterMode === "journalism") && (
          <section
            id="citizen-journalism"
            className="py-14 sm:py-16 bg-[#F3F3FF] border-b border-indigo-100/70"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="mb-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F8E0D4] text-[#7C2D12] text-[11px] font-bold uppercase tracking-wider mb-2">
                  03 • KONSEP KEDUA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Citizen Journalism (Jurnalisme Warga)
                </h2>
              </div>

              {/* Highlight Callout Box */}
              <div className="rounded-2xl bg-[#FDF2EC] border border-[#FED7AA] p-5 mb-8 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#7C2D12] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#7C2D12] mb-1">
                    Transformasi Khalayak Menjadi Produsen Berita (Prosumer)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Melalui perangkat <em>smartphone</em> dan koneksi internet, masyarakat
                    tidak lagi hanya menjadi penerima berita pasif, tetapi turut{" "}
                    <span className="px-1.5 py-0.5 rounded bg-[#F8E0D4] font-semibold text-[#7C2D12]">
                      mendokumentasikan fakta
                    </span>{" "}
                    dan{" "}
                    <span className="px-1.5 py-0.5 rounded bg-[#F8E0D4] font-semibold text-[#7C2D12]">
                      mewartakan peristiwa penting
                    </span>{" "}
                    secara langsung dari lingkungan sekitarnya.
                  </p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-5">
                6 Karakteristik Utama Citizen Journalism
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CITIZEN_JOURNALISM_CHARS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#EA580C]/50 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#FDF2EC] border border-[#FED7AA] text-[#EA580C] flex items-center justify-center">
                          {renderIcon(item.iconName, "w-4 h-4")}
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-[#7C2D12] text-white text-[11px] font-extrabold">
                          {item.number}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#9A3412] mb-2">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                      <span className="text-[11px] font-bold text-[#7C2D12]">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* SECTION 04: TABEL PERBEDAAN UTAMA */}
      {isSectionVisible("perbedaan") && (
        <section
          id="perbedaan"
          className="py-14 sm:py-16 bg-white border-b border-slate-100"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#3730A3] mb-2">
                04 • KOMPARASI MENDALAM (INTI JAWABAN NO. 1)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2.5">
                Perbedaan Utama Digital Citizen vs Citizen Journalism
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Matriks perbandingan berdasarkan 7 dimensi pembeda utama untuk memahami
                batas peran antara warga digital secara umum dan pewarta warga secara
                khusus.
              </p>
            </div>

            {/* Desktop Full Comparison Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="w-1/5 py-4 px-5 bg-[#EAEDFE] text-slate-900 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                      Aspek Pembeda
                    </th>
                    <th className="w-2/5 py-4 px-5 bg-[#0F766E] text-white text-xs font-extrabold uppercase tracking-wider border-b border-[#0F766E]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Digital Citizen (Warga Digital)</span>
                      </div>
                    </th>
                    <th className="w-2/5 py-4 px-5 bg-[#7C2D12] text-white text-xs font-extrabold uppercase tracking-wider border-b border-[#7C2D12]">
                      <div className="flex items-center gap-2">
                        <Newspaper className="w-4 h-4" />
                        <span>Citizen Journalism (Jurnalisme Warga)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#F9F8FE]"}
                    >
                      <td className="py-4 px-5 font-extrabold text-slate-900 align-top">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">
                        <div className="font-bold text-[#0F766E] mb-1">
                          {row.highlightCitizen}
                        </div>
                        {row.digitalCitizen}
                      </td>
                      <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">
                        <div className="font-bold text-[#7C2D12] mb-1">
                          {row.highlightJournalism}
                        </div>
                        {row.citizenJournalism}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Accordion Comparison Cards */}
            <div className="md:hidden space-y-3.5">
              {COMPARISON_ROWS.map((row) => {
                const isOpen = expandedRows[row.id] ?? true;
                return (
                  <div
                    key={row.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleRow(row.id)}
                      className="w-full px-4 py-3.5 bg-[#F9F8FE] flex items-center justify-between text-left font-extrabold text-xs text-slate-900 cursor-pointer"
                    >
                      <span>{row.aspect}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 space-y-3 text-xs">
                        <div className="rounded-xl bg-[#E6FFFF]/70 border border-[#99F6E4] p-3">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] mb-1">
                            Digital Citizen
                          </div>
                          <div className="font-bold text-slate-900 mb-1">
                            {row.highlightCitizen}
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {row.digitalCitizen}
                          </p>
                        </div>
                        <div className="rounded-xl bg-[#FDF2EC] border border-[#FED7AA] p-3">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#7C2D12] mb-1">
                            Citizen Journalism
                          </div>
                          <div className="font-bold text-slate-900 mb-1">
                            {row.highlightJournalism}
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {row.citizenJournalism}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 05: BAGAIMANA KEDUANYA SALING TERHUBUNG? */}
      {isSectionVisible("hubungan") && (
        <section
          id="hubungan"
          className="py-14 sm:py-16 bg-[#F3F3FF] border-b border-indigo-100/70"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#3730A3] mb-2">
                05 • SINTESIS &amp; IRISAN PERAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2.5">
                Bagaimana Keduanya Saling Terhubung?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Meskipun berbeda, <em>Digital Citizen</em> dan{" "}
                <em>Citizen Journalism</em> bukanlah dua hal yang terpisah, melainkan
                beririsan erat untuk membangun ruang informasi publik yang tepercaya.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
              {/* Desktop 3-Circle Venn Diagram */}
              <div className="hidden md:flex items-center justify-center py-4">
                {/* Left Circle: Digital Citizen */}
                <div className="w-72 h-72 rounded-full bg-[#DCEAEA] border-2 border-[#99F6E4] flex flex-col items-center justify-center text-center p-7 -mr-8 z-10 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#0F766E] text-white flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F766E] mb-1">
                    Digital Citizen
                  </h3>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    Fondasi etika, literasi kritis, keamanan privasi, dan kesadaran hukum
                    setiap pengguna internet.
                  </p>
                </div>

                {/* Center Overlapping Circle: Irisan Keduanya */}
                <div className="w-76 h-76 rounded-full bg-[#3730A3] border-4 border-white text-white flex flex-col items-center justify-center text-center p-7 z-20 shadow-xl">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/40 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                    Irisan Keduanya
                  </span>
                  <h3 className="text-base font-extrabold mb-2">
                    Jurnalis Warga Beretika
                  </h3>
                  <p className="text-xs text-indigo-100 leading-relaxed">
                    Warga yang aktif melaporkan peristiwa secara cepat namun tetap{" "}
                    <strong className="text-white">
                      terverifikasi, objektif, santun, dan menghormati privasi
                    </strong>
                    .
                  </p>
                </div>

                {/* Right Circle: Citizen Journalism */}
                <div className="w-72 h-72 rounded-full bg-[#F8E0D4] border-2 border-[#FED7AA] flex flex-col items-center justify-center text-center p-7 -ml-8 z-10 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#7C2D12] text-white flex items-center justify-center mb-2.5">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#7C2D12] mb-1">
                    Citizen Journalism
                  </h3>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    Partisipasi aktif warga mendokumentasikan dan menyiarkan berita dari
                    lokasi peristiwa ke publik.
                  </p>
                </div>
              </div>

              {/* Mobile Stacked Synthesis View */}
              <div className="md:hidden space-y-3 mb-6">
                <div className="rounded-2xl bg-[#CDF5F4] border border-[#99F6E4] p-4 text-center">
                  <h3 className="text-xs font-extrabold uppercase text-[#0F766E] mb-1">
                    Digital Citizen
                  </h3>
                  <p className="text-xs text-slate-800">
                    Fondasi etika, literasi informasi, privasi, dan kepatuhan hukum siber.
                  </p>
                </div>
                <div className="flex justify-center">
                  <span className="px-3 py-1 rounded-full bg-[#3730A3] text-white text-[10px] font-extrabold uppercase">
                    + Beririsan Menjadi +
                  </span>
                </div>
                <div className="rounded-2xl bg-[#EAEDFE] border border-indigo-200 p-4 text-center">
                  <h3 className="text-xs font-extrabold uppercase text-[#3730A3] mb-1">
                    Citizen Journalism yang Bertanggung Jawab
                  </h3>
                  <p className="text-xs text-slate-800">
                    Mewartakan fakta lapangan secara cepat sekaligus terverifikasi dan
                    beretika.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8E0D4] border border-[#FED7AA] p-4 text-center">
                  <h3 className="text-xs font-extrabold uppercase text-[#7C2D12] mb-1">
                    Citizen Journalism
                  </h3>
                  <p className="text-xs text-slate-800">
                    Keberanian dan kepekaan warga melaporkan peristiwa lokal secara
                    real-time.
                  </p>
                </div>
              </div>

              {/* Bottom Synthesis Quote Banner */}
              <div className="mt-6 rounded-2xl bg-[#EAEDFE] border border-indigo-200/80 p-4 sm:p-5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#3730A3] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                  <strong>Prinsip Kunci:</strong> Setiap pelaku{" "}
                  <em>Citizen Journalism</em> yang baik wajib terlebih dahulu menjadi{" "}
                  <em>Digital Citizen</em> yang beretika. Tanpa literasi dan etika warga
                  digital, kecepatan melaporkan informasi justru berisiko menyebarkan
                  disinformasi atau melanggar hak privasi orang lain.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 06: STUDI KASUS KONTEKSTUAL */}
      {isSectionVisible("studi-kasus") && (
        <section
          id="studi-kasus"
          className="py-14 sm:py-16 bg-white border-b border-slate-100"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#0F766E] mb-2">
                06 • ILUSTRASI KONTEKSTUAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2.5">
                Studi Kasus: Menyikapi Bencana Banjir di Lingkungan
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bagaimana perbedaan tindakan nyata antara <em>Digital Citizen</em> dan{" "}
                <em>Citizen Journalism</em> ketika menghadapi satu peristiwa darurat yang
                sama?
              </p>
            </div>

            {/* Scenario Banner */}
            <div className="rounded-2xl bg-[#EAEDFE] border border-indigo-200/80 p-5 mb-6 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-[#3730A3] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#3730A3] mb-1">
                  Skenario Kejadian
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  Hujan deras sejak dini hari menyebabkan banjir setinggi 70 cm yang
                  merendam jalan utama kecamatan. Di grup WhatsApp warga beredar foto
                  tanggul jebol yang ternyata merupakan foto kejadian tiga tahun lalu di
                  kota lain.
                </p>
              </div>
            </div>

            {/* 3 Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#3730A3] text-white text-xs font-extrabold flex items-center justify-center">
                      01
                    </span>
                    <span className="text-xs font-bold text-[#3730A3]">
                      Verifikasi &amp; Saring
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                    Menangkal Hoaks di Grup Warga
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Mengecek keaslian foto tanggul jebol melalui pencarian gambar dan kanal
                    resmi BPBD/BMKG, lalu dengan bahasa santun memberi tahu anggota grup
                    bahwa foto tersebut adalah dokumentasi lama agar warga tidak panik.
                  </p>
                </div>
                <span className="inline-block self-start px-2.5 py-1 rounded-md bg-[#E6FFFF] text-[#0F766E] text-[11px] font-bold">
                  Peran Digital Citizen (Literasi &amp; Netiket)
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#0F766E] text-white text-xs font-extrabold flex items-center justify-center">
                      02
                    </span>
                    <span className="text-xs font-bold text-[#0F766E]">
                      Proteksi &amp; Empati
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                    Menjaga Privasi Korban Terdampak
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Membagikan kontak darurat evakuasi resmi dan tautan donasi tepercaya,
                    serta berkomitmen tidak menyebarkan foto warga atau anak-anak yang
                    sedang dievakuasi dalam kondisi rentan.
                  </p>
                </div>
                <span className="inline-block self-start px-2.5 py-1 rounded-md bg-[#E6FFFF] text-[#0F766E] text-[11px] font-bold">
                  Peran Digital Citizen (Privasi &amp; Etika)
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#7C2D12] text-white text-xs font-extrabold flex items-center justify-center">
                      03
                    </span>
                    <span className="text-xs font-bold text-[#7C2D12]">
                      Pewarta Lapangan
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                    Melaporkan Kondisi Banjir Real-Time
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Merekam video kondisi jalan raya secara langsung dari depan rumah,
                    menyebutkan nama jalan, pukul pengambilan gambar (08.15 WIB), tinggi
                    genangan, serta rute jalan alternatif yang masih aman dilalui.
                  </p>
                </div>
                <span className="inline-block self-start px-2.5 py-1 rounded-md bg-[#FDF2EC] text-[#7C2D12] text-[11px] font-bold">
                  Peran Citizen Journalism (Reportase Warga)
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 07: UJI PEMAHAMAN SINGKAT */}
      {isSectionVisible("kuis") && (
        <section
          id="kuis"
          className="py-14 sm:py-16 bg-[#F3F3FF] border-b border-indigo-100/70"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#3730A3] mb-2">
                07 • EVALUASI INTERAKTIF
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Uji Pemahaman Singkat
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Klik salah satu pilihan jawaban pada 3 pertanyaan berikut untuk menguji
                pemahaman Anda terhadap materi.
              </p>

              {/* Score Pill */}
              <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-xs font-bold text-slate-800">
                <span>
                  Terjawab: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[#0F766E]">
                  Skor Benar: {quizScore} / {QUIZ_QUESTIONS.length}
                </span>
                {Object.keys(selectedAnswers).length > 0 && (
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1 text-[#3730A3] hover:underline ml-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {QUIZ_QUESTIONS.map((q) => {
                const pickedId = selectedAnswers[q.id];
                const pickedOption = q.options.find((o) => o.id === pickedId);

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs"
                  >
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      {q.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-4 leading-snug">
                      {q.question}
                    </h3>

                    <div className="space-y-2.5">
                      {q.options.map((opt) => {
                        const isSelected = pickedId === opt.id;
                        let btnStyle =
                          "bg-[#EAEDFE]/65 hover:bg-[#EAEDFE] border-indigo-100 text-slate-800";
                        if (isSelected) {
                          btnStyle = opt.isCorrect
                            ? "bg-[#E6FFFF] border-[#0F766E] text-slate-900 ring-1 ring-[#0F766E]"
                            : "bg-red-50 border-red-400 text-slate-900 ring-1 ring-red-400";
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className="leading-relaxed">{opt.text}</span>
                            {isSelected ? (
                              opt.isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                              )
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {pickedOption && (
                      <div
                        className={`mt-4 rounded-xl p-3.5 text-xs leading-relaxed flex items-start gap-2.5 ${
                          pickedOption.isCorrect
                            ? "bg-[#E6FFFF] border border-[#99F6E4] text-teal-950"
                            : "bg-amber-50 border border-amber-200 text-amber-950"
                        }`}
                      >
                        {pickedOption.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div>{pickedOption.feedback}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 08: IKHTISAR PENTING */}
      {isSectionVisible("kesimpulan") && (
        <section
          id="kesimpulan"
          className="py-14 sm:py-16 bg-[#3730A3] text-white"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-indigo-200 mb-2">
                08 • KESIMPULAN MATERI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2.5">
                Ikhtisar Penting
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                Tiga rumusan inti yang menjawab perbedaan dan karakteristik{" "}
                <em>Digital Citizen</em> serta <em>Citizen Journalism</em> di era
                transformasi digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-[#2D249B] border border-indigo-400/30 p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-300/30 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-teal-300" />
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">
                    Perbedaan Cakupan &amp; Peran
                  </h3>
                  <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                    <em>Digital Citizen</em> adalah identitas dan pedoman perilaku etis
                    bagi <strong>setiap pengguna internet</strong>, sedangkan{" "}
                    <em>Citizen Journalism</em> adalah aktivitas spesifik warga ketika
                    bertindak sebagai <strong>pelapor berita</strong> bagi publik.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-teal-300">
                  01 • Etika Umum vs Aktivitas Jurnalistik
                </span>
              </div>

              <div className="rounded-2xl bg-[#2D249B] border border-indigo-400/30 p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-300/30 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-amber-300" />
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">
                    Karakteristik yang Khas
                  </h3>
                  <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                    <em>Digital Citizen</em> dicirikan oleh literasi kritis, netiket,
                    keamanan data, dan kepatuhan hukum. <em>Citizen Journalism</em>{" "}
                    dicirikan oleh pelaku non-profesional, kecepatan saksi mata
                    (<em>real-time</em>), isu lokal, dan ruang diskusi terbuka.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-amber-300">
                  02 • 9 Elemen Ribble vs Partisipasi Warga
                </span>
              </div>

              <div className="rounded-2xl bg-[#2D249B] border border-indigo-400/30 p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-300/30 flex items-center justify-center mb-4">
                    <Award className="w-5 h-5 text-indigo-200" />
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">
                    Sinergi di Era Digital
                  </h3>
                  <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                    Jurnalisme warga yang sehat hanya dapat terwujud apabila pelakunya
                    memiliki kematangan sebagai <em>Digital Citizen</em>—sehingga setiap
                    informasi yang disebarkan telah melewati verifikasi fakta dan
                    menghormati etika.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-indigo-200">
                  03 • Cepat Sekaligus Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 09: REFERENSI AKADEMIK & PANEL TUGAS UT */}
      {isSectionVisible("referensi") && (
        <section id="referensi" className="py-14 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                09 • REFERENSI AKADEMIK &amp; PENGUMPULAN TUGAS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Daftar Pustaka &amp; Tautan Media Pembelajaran
              </h2>
            </div>

            {/* References Card */}
            <div className="rounded-2xl border border-slate-200 bg-[#F9F8FE] p-6 mb-6">
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong>Bowman, S., &amp; Willis, C. (2003).</strong>{" "}
                  <em>
                    We Media: How Audiences Are Shaping the Future of News and Information
                  </em>
                  . Reston, VA: The Media Center at the American Press Institute.
                </li>
                <li>
                  <strong>Ribble, M. (2015).</strong>{" "}
                  <em>
                    Digital Citizenship in Schools: Nine Elements All Students Should Know
                  </em>{" "}
                  (3rd ed.). Eugene, OR: International Society for Technology in Education
                  (ISTE).
                </li>
                <li>
                  <strong>Mossberger, K., Tolbert, C. J., &amp; McNeal, R. S. (2008).</strong>{" "}
                  <em>Digital Citizenship: The Internet, Society, and Participation</em>.
                  Cambridge, MA: MIT Press.
                </li>
                <li>
                  <strong>Universitas Terbuka. (2024).</strong>{" "}
                  <em>
                    Buku Materi Pokok (BMP) Belajar di Era Digital (MKWU4109)
                  </em>
                  . Tangerang Selatan: Penerbit Universitas Terbuka.
                </li>
              </ul>
            </div>

            {/* Bottom Callout Banner */}
            <div className="rounded-2xl bg-[#EAEDFE] border border-indigo-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center shrink-0 font-extrabold text-xs">
                  UT
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Siap Dikumpulkan untuk Tugas Nomor 1 &amp; Nomor 2
                  </h3>
                  <p className="text-xs text-slate-600">
                    Salin ringkasan jawaban teks atau publikasikan proyek Next.js ini ke
                    Vercel untuk memperoleh tautan publik pengganti MS Sway.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyText("ut-answer", formattedUtAnswer)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedKey === "ut-answer" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#3730A3]" />
                      <span>Salin Jawaban No. 1 &amp; 2</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowAnswerModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3730A3] hover:bg-[#2D249B] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Panduan Link Tugas #2</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#F9F8FE] border-t border-slate-200/80 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800">
              Media Pembelajaran Digital — Belajar di Era Digital
            </p>
            <p>
              Mahasiswa Universitas Terbuka Semester 3 • Dibangun dengan Next.js &amp;
              Tailwind CSS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Atas</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL: FORM JAWABAN UT & PANDUAN DEPLOY */}
      {showAnswerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-2xl p-6">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E]">
                  PANDUAN PENGUMPULAN TUGAS UNIVERSITAS TERBUKA
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Format Jawaban Nomor 1 &amp; Cara Mendapatkan Link Nomor 2
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAnswerModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="rounded-2xl bg-[#E6FFFF] border border-[#99F6E4] p-4">
                <h4 className="font-extrabold text-[#0F766E] mb-1">
                  Cara Mendapatkan Link Publik (Nomor 2) di Mac Tanpa Install MS Sway:
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                  <li>
                    Ekstrak file proyek atau gunakan folder{" "}
                    <strong>digital-citizen-ut</strong>.
                  </li>
                  <li>
                    Untuk menjalankan di Mac secara lokal: buka Terminal di folder proyek,
                    lalu jalankan <code>npm run dev</code>.
                  </li>
                  <li>
                    Untuk mendapatkan <strong>Link Publik</strong> yang bisa dibuka tutor
                    UT: unggah folder proyek ke GitHub atau jalankan{" "}
                    <code>npx vercel</code> di Terminal Mac Anda — dalam 1 menit Anda akan
                    mendapatkan tautan seperti{" "}
                    <code>https://digital-citizen-ut.vercel.app</code> untuk ditempel pada
                    form jawaban Nomor 2!
                  </li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Draf Jawaban Siap Tempel (Soal 1 &amp; 2):
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText("modal-copy", formattedUtAnswer)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#3730A3] text-white text-xs font-bold cursor-pointer"
                  >
                    {copiedKey === "modal-copy" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Berhasil Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Teks Jawaban</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs whitespace-pre-wrap font-mono overflow-x-auto leading-relaxed">
                  {formattedUtAnswer}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
