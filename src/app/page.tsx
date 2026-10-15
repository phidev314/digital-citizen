"use client";

import React, { useState, useEffect } from "react";
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
  Sparkles,
  Presentation,
  RotateCcw,
  GraduationCap,
  X,
  ArrowDown,
  ArrowUp,
  Eye,
  Radio,
  Bookmark,
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
  tabColor: "mint" | "lavender" | "pink" | "sky" | "cream";
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

interface NotebookTab {
  id: string;
  label: string;
  shortLabel: string;
  colorHex: string;
  borderHex: string;
  textColor: string;
}

const NOTEBOOK_TABS: NotebookTab[] = [
  { id: "hero", label: "Sampul", shortLabel: "Cover", colorHex: "#98d4bb", borderHex: "#7ec4a8", textColor: "#1a1a1a" },
  { id: "pengertian", label: "01. Konsep Dasar", shortLabel: "01. Konsep", colorHex: "#c7b8ea", borderHex: "#b5a3dd", textColor: "#1a1a1a" },
  { id: "digital-citizen", label: "02. Digital Citizen", shortLabel: "02. Warga", colorHex: "#98d4bb", borderHex: "#7ec4a8", textColor: "#1a1a1a" },
  { id: "citizen-journalism", label: "03. Citizen Journalism", shortLabel: "03. Pewarta", colorHex: "#f4b8c5", borderHex: "#e59fb0", textColor: "#1a1a1a" },
  { id: "perbedaan", label: "04. Tabel Komparasi", shortLabel: "04. Tabel", colorHex: "#a8d8ea", borderHex: "#93c6d9", textColor: "#1a1a1a" },
  { id: "hubungan", label: "05. Sinergi Peran", shortLabel: "05. Sinergi", colorHex: "#ffe6a7", borderHex: "#ebd18e", textColor: "#1a1a1a" },
  { id: "studi-kasus", label: "06. Kasus Lapangan", shortLabel: "06. Kasus", colorHex: "#c7b8ea", borderHex: "#b5a3dd", textColor: "#1a1a1a" },
  { id: "kuis", label: "07. Uji Pemahaman", shortLabel: "07. Kuis", colorHex: "#f4b8c5", borderHex: "#e59fb0", textColor: "#1a1a1a" },
  { id: "kesimpulan", label: "08. Ikhtisar Akhir", shortLabel: "08. Ikhtisar", colorHex: "#98d4bb", borderHex: "#7ec4a8", textColor: "#1a1a1a" },
  { id: "referensi", label: "09. Tugas & Pustaka", shortLabel: "09. Pustaka", colorHex: "#a8d8ea", borderHex: "#93c6d9", textColor: "#1a1a1a" },
];

const DIGITAL_CITIZEN_CHARS: CharacteristicItem[] = [
  {
    id: "dc-1",
    number: "01",
    title: "Literasi Digital Kritis",
    subtitle: "Digital Literacy & Critical Thinking",
    description:
      "Kemampuan mencari, memahami, menganalisis, dan memverifikasi kebenaran informasi sebelum mempercayai atau membagikannya, sehingga kebal terhadap hoaks dan disinformasi.",
    tag: "Kognitif & Verifikasi",
    iconName: "BookOpen",
    tabColor: "mint",
  },
  {
    id: "dc-2",
    number: "02",
    title: "Etika Komunikasi (Netiket)",
    subtitle: "Digital Etiquette & Empathy",
    description:
      "Mematuhi standar tata krama pergaulan di ruang siber, menghormati keragaman pendapat, berempati, serta menjauhi perundungan siber (cyberbullying) dan ujaran kebencian.",
    tag: "Norma Sosial",
    iconName: "MessageSquare",
    tabColor: "lavender",
  },
  {
    id: "dc-3",
    number: "03",
    title: "Keamanan & Privasi Data",
    subtitle: "Digital Security & Privacy",
    description:
      "Kesadaran aktif melindungi data pribadi diri sendiri dan orang lain, menerapkan kata sandi kuat serta autentikasi ganda (2FA), serta mewaspadai bahaya rekayasa sosial (phishing).",
    tag: "Proteksi Diri",
    iconName: "Lock",
    tabColor: "sky",
  },
  {
    id: "dc-4",
    number: "04",
    title: "Kepatuhan Hukum Siber",
    subtitle: "Digital Law & IP Rights",
    description:
      "Memahami konsekuensi hukum nyata di ruang siber (UU ITE dan UU PDP), menghormati Hak Cipta dan Hak Kekayaan Intelektual, serta tidak melakukan plagiarisme digital.",
    tag: "Tanggung Jawab Hukum",
    iconName: "Scale",
    tabColor: "cream",
  },
  {
    id: "dc-5",
    number: "05",
    title: "Kesehatan & Kebugaran Mental",
    subtitle: "Digital Health & Wellness",
    description:
      "Menjaga keseimbangan ritme hidup dengan teknologi, mencakup pengaturan batas waktu layar (screen time), ergonomi tubuh, serta pencegahan stres akibat adiksi digital.",
    tag: "Keseimbangan Hidup",
    iconName: "HeartPulse",
    tabColor: "pink",
  },
  {
    id: "dc-6",
    number: "06",
    title: "Partisipasi & Akses Inklusif",
    subtitle: "Digital Access & Inclusion",
    description:
      "Berperan aktif secara produktif dalam ekosistem pembelajaran daring (Tuton UT), layanan administrasi publik, serta transaksi digital yang transparan dan memberdayakan komunitas.",
    tag: "Partisipasi Positif",
    iconName: "Users",
    tabColor: "mint",
  },
];

const CITIZEN_JOURNALISM_CHARS: CharacteristicItem[] = [
  {
    id: "cj-1",
    number: "01",
    title: "Pelaku Warga Non-Profesional",
    subtitle: "Citizens as First Reporters",
    description:
      "Dilakukan secara mandiri oleh masyarakat umum (mahasiswa, pekerja, warga lingkungan) yang bukan wartawan profesional dan tidak terikat pada hierarki redaksi media arus utama.",
    tag: "Berbasis Publik",
    iconName: "Users",
    tabColor: "pink",
  },
  {
    id: "cj-2",
    number: "02",
    title: "Spontanitas Saksi Mata Real-Time",
    subtitle: "First-Hand Eyewitness Immediacy",
    description:
      "Melaporkan peristiwa seketika saat kejadian berlangsung dari lokasi tempat warga berada, menghasilkan kabar yang sering kali jauh lebih cepat dibanding liputan kru televisi atau pers formal.",
    tag: "Kecepatan Lapor",
    iconName: "Zap",
    tabColor: "mint",
  },
  {
    id: "cj-3",
    number: "03",
    title: "Kanal Terbuka & Media Sosial",
    subtitle: "User-Generated Content Media",
    description:
      "Memanfaatkan gawai sehari-hari (smartphone) untuk mendokumentasikan fakta dan disiarkan melalui blog personal, forum komunitas, Instagram, X (Twitter), YouTube, atau portal jurnalisme warga.",
    tag: "Kanal Partisipatif",
    iconName: "Share2",
    tabColor: "sky",
  },
  {
    id: "cj-4",
    number: "04",
    title: "Fokus Isu Lokal & Akar Rumput",
    subtitle: "Hyperlocal Perspective",
    description:
      "Mengangkat realitas peristiwa sekitar (kerusakan fasilitas desa, bencana lokal, inisiatif warga) yang sangat krusial bagi warga setempat namun sering luput dari radar liputan media nasional.",
    tag: "Perspektif Hyperlocal",
    iconName: "MapPin",
    tabColor: "cream",
  },
  {
    id: "cj-5",
    number: "05",
    title: "Interaksi Dua Arah & Kolaboratif",
    subtitle: "Two-Way Public Discourse",
    description:
      "Menghilangkan sekat kaku produsen-konsumen berita; publik dapat langsung berdiskusi, memberikan kesaksian silang, atau mengoreksi data laporan pada kolom komentar secara terbuka.",
    tag: "Diskursus Terbuka",
    iconName: "Radio",
    tabColor: "lavender",
  },
  {
    id: "cj-6",
    number: "06",
    title: "Tanpa Kurasi Redaksi Berlapis",
    subtitle: "Self-Edited & Verification Challenge",
    description:
      "Karena tidak melalui tahapan editor dan redaktur ahli, mutu serta kebenaran laporan bergantung penuh pada integritas moral, ketelitian, dan etika verifikasi sang pewarta warga.",
    tag: "Tantangan Verifikasi",
    iconName: "Eye",
    tabColor: "pink",
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "focus",
    aspect: "1. Fokus Utama",
    highlightCitizen: "Etika & tanggung jawab berinternet",
    digitalCitizen:
      "Fokus pada bagaimana setiap individu bersikap, berinteraksi, dan memanfaatkan teknologi secara aman, kritis, etis, dan mematuhi hukum dalam seluruh lini kehidupan siber.",
    highlightJournalism: "Produksi & penyiaran berita warga",
    citizenJournalism:
      "Fokus pada aktivitas spesifik dalam mencari, mendokumentasikan, merangkum fakta (5W+1H), dan menyebarkan kabar peristiwa bernilai berita ke ruang publik.",
  },
  {
    id: "actor",
    aspect: "2. Pelaku / Subjek",
    highlightCitizen: "Seluruh pengguna teknologi digital",
    digitalCitizen:
      "Setiap orang yang terhubung ke jaringan digital (pelajar, mahasiswa, pekerja, masyarakat luas) baik saat membaca, berdiskusi, berbelanja, maupun belajar.",
    highlightJournalism: "Warga yang aktif menjadi pewarta",
    citizenJournalism:
      "Masyarakat awam (bukan wartawan resmi berkartu pers) yang secara proaktif bertindak sebagai saksi mata dan pelapor fakta di lingkungan sekitarnya.",
  },
  {
    id: "goal",
    aspect: "3. Tujuan Utama",
    highlightCitizen: "Masyarakat siber yang aman & beradab",
    digitalCitizen:
      "Menciptakan ekosistem siber yang kondusif, beretika, bebas perundungan siber, terlindung dari pencurian data, dan saling menghargai.",
    highlightJournalism: "Demokratisasi informasi & kecepatan fakta lokal",
    citizenJournalism:
      "Memberikan kabar alternatif secara cepat dari lapangan, mengisi kekosongan liputan pers arus utama, dan menyuarakan aspirasi komunitas.",
  },
  {
    id: "activity",
    aspect: "4. Bentuk Aktivitas",
    highlightCitizen: "Saring sebelum sharing, 2FA, & netiket",
    digitalCitizen:
      "Mengamankan data akun, mengecek kebenaran berita sebelum membagikan, berkomentar santun di forum akademik, dan menghormati hak cipta.",
    highlightJournalism: "Merekam fakta, memotret, & menulis laporan",
    citizenJournalism:
      "Mengambil dokumentasi foto/video di lokasi kejadian, mewawancarai narasumber warga, menyusun kronologi peristiwa, dan mengunggahnya ke kanal publik.",
  },
  {
    id: "skill",
    aspect: "5. Kompetensi Kunci",
    highlightCitizen: "9 Elemen Kewargaan Digital (Ribble)",
    digitalCitizen:
      "Literasi digital kritis, etika pergaulan siber, kepatuhan hukum siber (UU ITE/PDP), privasi akun, dan manajemen screen time.",
    highlightJournalism: "Naluri berita & dokumentasi faktual (5W+1H)",
    citizenJournalism:
      "Kepekaan terhadap peristiwa bernilai kabar, keterampilan menangkap bukti autentik lapangan, verifikasi data visual, dan penyusunan narasi obyektif.",
  },
  {
    id: "rules",
    aspect: "6. Pedoman & Regulasi",
    highlightCitizen: "Netiket & Regulasi Negara (UU ITE / PDP)",
    digitalCitizen:
      "Berpedoman pada etika sopan santun berinternet, aturan komunitas platform, dan undang-undang perlindungan informasi serta data pribadi.",
    highlightJournalism: "Kejujuran fakta & etika jurnalisme warga",
    citizenJournalism:
      "Berpedoman pada akurasi waktu dan lokasi, keberimbangan sudut pandang, larangan fitnah, serta penghormatan hak privasi korban musibah.",
  },
  {
    id: "example",
    aspect: "7. Contoh Nyata",
    highlightCitizen: "Diskusi santun di Tuton & penangkal hoaks grup",
    digitalCitizen:
      "Mahasiswa UT berdiskusi secara ilmiah di Tuton dengan sitasi lengkap, serta menahan diri tidak menyebarkan kabar hoaks di grup percakapan keluarga.",
    highlightJournalism: "Laporan warga terkait banjir di jalan utama",
    citizenJournalism:
      "Warga merekam kondisi jalan terendam banjir lengkap dengan keterangan jam pengambilan, kedalaman genangan, dan rute alternatif untuk membantu warga lain.",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    code: "PERTANYAAN 01 • PEMBEDA UTAMA",
    question:
      "Manakah pernyataan yang paling tepat membedakan peran antara Digital Citizen dan Citizen Journalism?",
    options: [
      {
        id: "1a",
        text: "Digital Citizen hanya berlaku bagi praktisi TI profesional, sedangkan Citizen Journalism adalah tugas instansi humas pemerintah.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Digital Citizen berlaku bagi semua pengguna internet tanpa kecuali, dan Citizen Journalism dilakukan oleh warga biasa non-profesional.",
      },
      {
        id: "1b",
        text: "Digital Citizen berfokus pada etika, literasi, dan tanggung jawab menyeluruh pengguna di dunia digital; sedangkan Citizen Journalism berfokus pada peran aktif warga meliput dan menyiarkan peristiwa bernilai berita.",
        isCorrect: true,
        feedback:
          "Tepat sekali! Digital Citizen merupakan fondasi etika dan literasi siber seluruh warga, sementara Citizen Journalism adalah aktivitas spesifik pelaporan informasi faktual.",
      },
      {
        id: "1c",
        text: "Digital Citizen mengharuskan kepemilikan izin pers resmi, sedangkan Citizen Journalism dilarang mengunggah dokumentasi visual ke media sosial.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Digital Citizen tidak membutuhkan izin pers, dan Citizen Journalism justru sangat memanfaatkan dokumentasi visual di media sosial.",
      },
    ],
  },
  {
    id: 2,
    code: "PERTANYAAN 02 • KARAKTERISTIK SPESIFIK",
    question:
      "Salah satu ciri khas utama dari Citizen Journalism yang membedakannya dari jurnalisme pers komersial konvensional adalah:",
    options: [
      {
        id: "2a",
        text: "Pelakunya warga biasa yang melaporkan peristiwa secara spontan dari lokasi tanpa melewati proses kurasi redaksi formal.",
        isCorrect: true,
        feedback:
          "Sangat tepat! Spontanitas saksi mata warga dan ketiadaan struktur redaktur berlapis merupakan pembeda fundamental Citizen Journalism.",
      },
      {
        id: "2b",
        text: "Selalu berbayar dan hanya dapat dibaca melalui surat kabar cetak mingguan.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Citizen Journalism umumnya didistribusikan secara gratis dan terbuka melalui internet dan platform digital.",
      },
      {
        id: "2c",
        text: "Wajib mendapatkan persetujuan dewan pers sebelum mengunggah status atau video di media sosial.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Jurnalisme warga bersifat mandiri dan tidak berada di bawah struktur birokrasi dewan pers formal.",
      },
    ],
  },
  {
    id: 3,
    code: "PERTANYAAN 03 • SINERGI KEDUA PERAN",
    question:
      "Mengapa seorang pewarta warga (Citizen Journalist) tetap dituntut memiliki kompetensi seorang Digital Citizen yang matang?",
    options: [
      {
        id: "3a",
        text: "Agar unggahannya secara otomatis menerima insentif finansial dan monetisasi algoritma iklan.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Tujuan etika kewargaan digital bukan berburu monetisasi semata, melainkan menjaga akurasi dan kemaslahatan publik.",
      },
      {
        id: "3b",
        text: "Karena tanpa literasi kritis dan kesadaran etika Digital Citizen, laporan cepat warga rentan menyebarkan disinformasi, memicu kepanikan, atau melanggar hak privasi orang lain.",
        isCorrect: true,
        feedback:
          "Sangat tepat! Kecepatan informasi warga wajib dikawal oleh verifikasi fakta, sopan santun komunikasi, dan kepatuhan hukum siber.",
      },
      {
        id: "3c",
        text: "Agar audiens dilarang memberikan tanggapan maupun kritik koreksi pada kolom komentar.",
        isCorrect: false,
        feedback:
          "Kurang tepat. Karakteristik penting jurnalisme warga justru interaksi dialogis dan transparansi koreksi publik.",
      },
    ],
  },
];

export default function Home() {
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTabId, setActiveTabId] = useState<string>("hero");
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

  // When presentationMode is active, the tab corresponds to the current slide
  const effectiveActiveTabId = presentationMode
    ? NOTEBOOK_TABS[currentSlide]?.id || "hero"
    : activeTabId;

  // ScrollSpy to keep the active notebook tab synchronized with viewport scroll
  useEffect(() => {
    if (presentationMode) return;

    let animId: number;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = NOTEBOOK_TABS.length - 1; i >= 0; i--) {
        const tab = NOTEBOOK_TABS[i];
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveTabId(tab.id);
            break;
          }
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animId = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, [presentationMode]);

  // Keyboard arrow navigation for Presentation Slide mode
  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        if (e.key === " ") e.preventDefault();
        setCurrentSlide((s) => {
          const next = Math.min(NOTEBOOK_TABS.length - 1, s + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return next;
        });
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentSlide((s) => {
          const prev = Math.max(0, s - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return prev;
        });
      } else if (e.key === "Home") {
        setCurrentSlide(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        setCurrentSlide(NOTEBOOK_TABS.length - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationMode]);

  const goToSlide = (slideIndex: number) => {
    const target = Math.max(0, Math.min(NOTEBOOK_TABS.length - 1, slideIndex));
    setCurrentSlide(target);
    setActiveTabId(NOTEBOOK_TABS[target]?.id || "hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setActiveTabId(id);
    if (presentationMode) {
      const idx = NOTEBOOK_TABS.findIndex((s) => s.id === id);
      if (idx !== -1) {
        setCurrentSlide(idx);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const togglePresentationMode = () => {
    if (!presentationMode) {
      const currentIdx = NOTEBOOK_TABS.findIndex((t) => t.id === effectiveActiveTabId);
      const startSlide = currentIdx !== -1 ? currentIdx : 0;
      setCurrentSlide(startSlide);
      setPresentationMode(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const targetId = NOTEBOOK_TABS[currentSlide]?.id || "hero";
      setPresentationMode(false);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  const handleFilterChange = (mode: FilterMode) => {
    setFilterMode(mode);
    if (presentationMode) {
      if (mode === "citizen") {
        goToSlide(2);
      } else if (mode === "journalism") {
        goToSlide(3);
      } else {
        goToSlide(1);
      }
      return;
    }

    if (mode === "citizen") {
      scrollToSection("digital-citizen");
    } else if (mode === "journalism") {
      scrollToSection("citizen-journalism");
    } else {
      scrollToSection("pengertian");
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
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
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

  const formattedUtAnswer = `LEMBAR TUGAS 2 MATA KULIAH BELAJAR DI ERA DIGITAL (MKDI4202)
UNIVERSITAS TERBUKA - SEMESTER 3

IDENTITAS MAHASISWA:
Nama Mahasiswa : Luthfy Rahmani
NIM            : 056385504
UPBJJ-UT       : Bandung

1. Perbedaan dan Karakteristik Digital Citizen serta Citizen Journalism:

A. Pembeda Utama:
- Fokus & Cakupan: Digital Citizen (Warga Digital) berfokus pada cara bersikap, etika, literasi, keamanan, dan tanggung jawab setiap individu saat menggunakan teknologi internet secara umum (Ribble, 2015). Sedangkan Citizen Journalism (Jurnalisme Warga) berfokus pada aktivitas spesifik masyarakat biasa (bukan jurnalis profesional) dalam mengumpulkan, melaporkan, mengolah, dan menyebarkan berita/informasi faktual ke ruang publik (Bowman & Willis, 2003).
- Subjek/Pelaku: Digital Citizen mencakup seluruh pengguna internet dalam aktivitas sehari-hari, sementara Citizen Journalism dilakukan oleh warga yang mengambil peran aktif sebagai pewarta atau saksi mata suatu peristiwa.
- Tujuan: Digital Citizen bertujuan membangun ekosistem digital yang sehat, beradab, aman, dan patuh hukum; sedangkan Citizen Journalism bertujuan menyampaikan informasi cepat dari lapangan, mengangkat isu lokal (hyperlocal), dan mendemokratisasi produksi berita.

B. Karakteristik Digital Citizen:
1) Literasi Digital Kritis (mampu mengevaluasi informasi secara kritis & menangkal hoaks).
2) Etika Komunikasi & Netiket (menjaga sopan santun daring & bebas cyberbullying).
3) Keamanan & Privasi Digital (melindungi data pribadi & autentikasi 2FA).
4) Kepatuhan Hukum Siber (memahami UU ITE, UU PDP, dan hak cipta).
5) Kesehatan & Kebugaran Mental (mengelola screen time & kesehatan mental).
6) Akses & Partisipasi Produktif di ruang siber.

C. Karakteristik Citizen Journalism:
1) Dilakukan oleh warga biasa (non-profesional / di luar institusi pers formal).
2) Spontan dan real-time langsung dari lokasi kejadian (first-hand witness).
3) Memanfaatkan perangkat mobile dan platform terbuka (media sosial, blog, portal warga).
4) Berfokus pada isu lokal/komunitas (hyperlocal) yang dekat dengan masyarakat.
5) Interaktif dan kolaboratif (membuka ruang diskusi dua arah di kolom komentar).
6) Tanpa kurasi redaksi berlapis sehingga menuntut kesadaran verifikasi mandiri.

2. Tautan Media Pembelajaran Digital (Notebook Editorial Interaktif):
Dibuat menggunakan Next.js & Tailwind CSS sesuai spesifikasi desain Notebook Tabs editorial dengan peramban interaktif.`;

  const isSectionVisible = (sectionId: string) => {
    if (!presentationMode) return true;
    return NOTEBOOK_TABS[currentSlide]?.id === sectionId;
  };

  return (
    <div className="min-h-[100dvh] bg-[#2d2d2d] text-[#1a1a1a] flex flex-col items-center justify-start py-4 sm:py-8 px-2 sm:px-4 lg:px-8 selection:bg-[#98d4bb] selection:text-[#1a1a1a]">
      {/* Outer Notebook Container with Desk Depth */}
      <div className="relative w-full max-w-[1280px] min-h-[92vh] flex flex-col">
        {/* Sticky Mobile/Tablet Tab Bar */}
        <div className="lg:hidden sticky top-2 z-40 mb-3 bg-[#2d2d2d]/95 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
            {NOTEBOOK_TABS.map((tab) => {
              const isActive = effectiveActiveTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    backgroundColor: isActive ? tab.colorHex : "rgba(248, 246, 241, 0.12)",
                    color: isActive ? "#1a1a1a" : "#f8f6f1",
                    borderColor: isActive ? tab.borderHex : "transparent",
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                    isActive ? "shadow-md scale-105" : "hover:bg-white/20"
                  }`}
                >
                  {tab.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* PHYSICAL NOTEBOOK PAPER SHEET */}
        <div
          className={`relative w-full paper-container rounded-sm sm:rounded-md border border-[#e4ded3] flex flex-col flex-1 overflow-visible ${
            presentationMode ? "min-h-[920px]" : "min-h-[92vh]"
          }`}
        >
          {/* DESKTOP PHYSICAL NOTEBOOK TABS ANCHORED TO RIGHT EDGE */}
          <aside
            aria-label="Notebook Index Tabs"
            className="hidden lg:flex flex-col gap-2.5 absolute -right-[46px] top-24 z-30 pointer-events-auto"
          >
            {NOTEBOOK_TABS.map((tab) => {
              const isActive = effectiveActiveTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  title={`Buka Tab: ${tab.label}`}
                  style={{
                    backgroundColor: tab.colorHex,
                    borderColor: tab.borderHex,
                  }}
                  className={`group relative flex items-center justify-center w-[46px] py-4 rounded-r-lg border-y border-r shadow-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "translate-x-2 shadow-xl ring-2 ring-black/20"
                      : "hover:translate-x-1.5 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Subtle tab line indicator */}
                  <span
                    className={`writing-mode-vertical font-ui text-[clamp(10px,0.85vw,12px)] font-bold tracking-wider text-[#1a1a1a] select-none uppercase`}
                  >
                    {tab.label}
                  </span>

                  {/* Active pip on the tab edge */}
                  {isActive && (
                    <span className="absolute -left-1 w-2 h-4 rounded-r-sm bg-[#1a1a1a] shadow-xs" />
                  )}
                </button>
              );
            })}
          </aside>

          {/* NOTEBOOK HEADER BAR */}
          <header className="border-b border-[#e4ded3] bg-[#f8f6f1]/90 backdrop-blur-xs px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
            {/* Left Binder Title Brand */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#2d2d2d] text-[#98d4bb] text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer shadow-xs active:translate-y-[1px]"
              >
                <GraduationCap className="w-4 h-4 text-[#98d4bb]" />
                <span className="font-editorial-heading">BELAJAR DI ERA DIGITAL</span>
              </button>
            </div>

            {/* Center Content Filter Pills */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleFilterChange("all")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-ui font-semibold transition-all cursor-pointer border shadow-xs active:translate-y-[1px] ${
                  filterMode === "all"
                    ? "bg-[#2d2d2d] text-[#f8f6f1] border-[#2d2d2d]"
                    : "bg-[#f8f6f1] text-[#2d2d2d] border-[#e4ded3] hover:bg-white"
                }`}
                title="Tampilkan semua materi tanpa filter"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Semua</span>
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange("citizen")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-ui font-semibold transition-all cursor-pointer border shadow-xs active:translate-y-[1px] ${
                  filterMode === "citizen"
                    ? "bg-[#98d4bb] text-[#1a1a1a] border-[#7ec4a8] ring-1 ring-[#1a1a1a]"
                    : "bg-[#f8f6f1] text-[#2d2d2d] border-[#e4ded3] hover:bg-[#98d4bb]/30"
                }`}
                title="Fokuskan ke materi Digital Citizen"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#1a1a1a]" />
                <span>Digital Citizen</span>
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange("journalism")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-ui font-semibold transition-all cursor-pointer border shadow-xs active:translate-y-[1px] ${
                  filterMode === "journalism"
                    ? "bg-[#f4b8c5] text-[#1a1a1a] border-[#e59fb0] ring-1 ring-[#1a1a1a]"
                    : "bg-[#f8f6f1] text-[#2d2d2d] border-[#e4ded3] hover:bg-[#f4b8c5]/30"
                }`}
                title="Fokuskan ke materi Citizen Journalism"
              >
                <Newspaper className="w-3.5 h-3.5 text-[#1a1a1a]" />
                <span>Citizen Journalism</span>
              </button>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePresentationMode}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-ui font-semibold border transition-all cursor-pointer active:translate-y-[1px] ${
                  presentationMode
                    ? "bg-[#c7b8ea] text-[#1a1a1a] border-[#b5a3dd] shadow-xs ring-1 ring-[#1a1a1a]"
                    : "bg-white text-[#2d2d2d] border-[#e4ded3] hover:bg-[#f8f6f1]"
                }`}
                title="Beralih antara Mode Gulir Bebas dan Mode Slide Terfokus (Sway)"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {presentationMode ? "Keluar Slide (Mode Gulir)" : "Mode Slide Sway"}
                </span>
              </button>
            </div>
          </header>

          {/* Active Filter Notification Banner */}
          {filterMode !== "all" && (
            <div className="bg-[#ffe6a7] border-b border-[#ebd18e] px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-ui text-[#1a1a1a] sticky top-[53px] z-10 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] animate-pulse" />
                <span>
                  Mode Filter Aktif:{" "}
                  <strong>
                    {filterMode === "citizen"
                      ? "Fokus Digital Citizen (Warga Digital)"
                      : "Fokus Citizen Journalism (Jurnalisme Warga)"}
                  </strong>
                  . Menyaring bab materi, karakteristik, dan komparasi spesifik.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleFilterChange("all")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#2d2d2d] hover:bg-black text-[#ffe6a7] font-code text-[11px] font-bold cursor-pointer transition-colors active:translate-y-[1px]"
              >
                <X className="w-3 h-3" />
                <span>Reset / Tampilkan Semua</span>
              </button>
            </div>
          )}

          {/* Presentation Slide Pagination Banner (Sticky in Slide Mode) */}
          {presentationMode && (
            <div
              className={`bg-[#ffe6a7]/70 border-b border-[#ebd18e] px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs font-ui font-semibold text-[#1a1a1a] sticky z-10 backdrop-blur-xs shadow-xs ${
                filterMode !== "all" ? "top-[93px]" : "top-[53px]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#1a1a1a]" />
                <span>
                  Lembar {currentSlide + 1} dari {NOTEBOOK_TABS.length}:{" "}
                  <strong className="font-editorial-heading text-sm">
                    {NOTEBOOK_TABS[currentSlide]?.label}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-[11px] font-code text-[#2d2d2d]/60 mr-2">
                  Gunakan tombol panah ◄ ► pada keyboard
                </span>
                <button
                  type="button"
                  onClick={() => goToSlide(currentSlide - 1)}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 rounded-sm bg-white border border-[#2d2d2d]/20 text-[#1a1a1a] disabled:opacity-40 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs active:translate-y-[1px] font-semibold"
                >
                  <ChevronLeft className="w-4 h-4 inline mr-0.5" /> Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(currentSlide + 1)}
                  disabled={currentSlide === NOTEBOOK_TABS.length - 1}
                  className="px-3 py-1.5 rounded-sm bg-white border border-[#2d2d2d]/20 text-[#1a1a1a] disabled:opacity-40 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs active:translate-y-[1px] font-semibold"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4 inline ml-0.5" />
                </button>
              </div>
            </div>
          )}

          {/* MAIN NOTEBOOK BODY WITH LEFT BINDER HOLES */}
          <div className="relative flex flex-1 w-full overflow-hidden">
            {/* LEFT SPINE: AUTHENTIC BINDER HOLES STRIP */}
            <div
              aria-hidden="true"
              className="w-8 sm:w-12 md:w-14 border-r border-dashed border-[#e4ded3] bg-[#f5f2eb] flex flex-col items-center justify-around py-8 select-none shrink-0"
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="binder-hole" title="Binder Ring Hole" />
              ))}
            </div>

            {/* NOTEBOOK PAGE CONTENT CONTAINER */}
            <main
              className={`flex-1 w-full px-4 sm:px-8 md:px-12 py-8 sm:py-12 max-w-[1200px] mx-auto overflow-y-auto ${
                presentationMode ? "min-h-[700px] flex flex-col justify-start" : ""
              }`}
            >
              {/* SECTION: HERO (SPLIT-SCREEN LAYOUT) */}
              {isSectionVisible("hero") && (
                <section
                  id="hero"
                  className="pt-2 pb-14 sm:pb-20 border-b border-[#e4ded3]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Split Column: Editorial Typography */}
                    <div className="lg:col-span-7 flex flex-col items-start">
                      {/* Academic Metadata Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#ffe6a7]/60 border border-[#ebd18e] text-[11px] font-code font-bold text-[#1a1a1a] mb-5 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                        <span>MKDI4202 • UNIVERSITAS TERBUKA</span>
                        <span className="text-[#2d2d2d]/40">/</span>
                        <span>SEMESTER 3</span>
                      </div>

                      {/* Display / Hero Heading */}
                      <h1 className="font-editorial-heading text-3xl sm:text-5xl lg:text-[clamp(2.5rem,4.5vw,3.75rem)] font-bold text-[#1a1a1a] leading-[1.08] tracking-tight mb-5">
                        Digital Citizen{" "}
                        <span className="font-serif italic text-[#2d2d2d]/70">&amp;</span>{" "}
                        Citizen Journalism
                      </h1>

                      {/* Editorial Subtitle */}
                      <p className="font-ui text-base sm:text-lg text-[#2d2d2d]/85 leading-relaxed mb-6 max-w-xl">
                        Kajian komparatif dan eksplorasi karakteristik warga digital serta
                        pewarta warga dalam membangun ekosistem informasi yang sehat, kritis,
                        dan beretika.
                      </p>

                      {/* Student Context Card with Student Identity */}
                      <div className="w-full max-w-xl mb-8 bg-white border border-[#e4ded3] rounded-sm p-4 sm:p-5 shadow-xs">
                        <div className="flex items-start sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-[#e4ded3]/80">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] text-[#98d4bb] flex items-center justify-center shrink-0 font-editorial-heading font-bold text-sm shadow-xs">
                              UT
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-ui font-bold text-[#1a1a1a]">
                                Tugas 2 • MKDI4202 Belajar di Era Digital
                              </p>
                              <p className="text-[11px] font-ui text-[#2d2d2d]/70">
                                Media Pembelajaran Digital • Format Notebook Tabs
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Student Identity Ledger Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-ui pt-0.5">
                          <div className="bg-[#fcfbf8] rounded-sm p-2.5 border border-[#e4ded3]/80">
                            <span className="block font-code text-[10px] text-[#2d2d2d]/60 uppercase tracking-wider mb-0.5">
                              Nama Mahasiswa
                            </span>
                            <span className="font-bold text-[#1a1a1a] text-xs sm:text-[13px] block truncate">
                              Luthfy Rahmani
                            </span>
                          </div>
                          <div className="bg-[#fcfbf8] rounded-sm p-2.5 border border-[#e4ded3]/80">
                            <span className="block font-code text-[10px] text-[#2d2d2d]/60 uppercase tracking-wider mb-0.5">
                              NIM
                            </span>
                            <span className="font-code font-bold text-[#1a1a1a] text-xs sm:text-[13px] block tracking-wide">
                              056385504
                            </span>
                          </div>
                          <div className="bg-[#fcfbf8] rounded-sm p-2.5 border border-[#e4ded3]/80">
                            <span className="block font-code text-[10px] text-[#2d2d2d]/60 uppercase tracking-wider mb-0.5">
                              UPBJJ UT
                            </span>
                            <span className="font-bold text-[#1a1a1a] text-xs sm:text-[13px] block">
                              Bandung
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => scrollToSection("pengertian")}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#2d2d2d] hover:bg-black text-[#98d4bb] text-xs sm:text-sm font-ui font-semibold shadow-md transition-all cursor-pointer active:translate-y-[1px]"
                        >
                          <span>Buka Lembar Materi</span>
                          <ArrowDown className="w-4 h-4 text-[#98d4bb]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => scrollToSection("perbedaan")}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white hover:bg-[#ffe6a7]/30 text-[#1a1a1a] border border-[#2d2d2d]/30 text-xs sm:text-sm font-ui font-semibold transition-all cursor-pointer active:translate-y-[1px]"
                        >
                          <Layers className="w-4 h-4 text-[#1a1a1a]" />
                          <span>Tabel Komparasi</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Split Column: Editorial Tactile Visual */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-md bg-white border border-[#e4ded3] rounded-sm p-6 shadow-md">
                        {/* Decorative Bookmark Ribbon at top */}
                        <div className="absolute -top-3 right-8 w-6 h-8 bg-[#f4b8c5] shadow-xs rounded-b-xs" />
                        <div className="absolute -top-3 right-16 w-6 h-10 bg-[#98d4bb] shadow-xs rounded-b-xs" />

                        <div className="border-b border-[#e4ded3] pb-3 mb-4 flex items-center justify-between">
                          <span className="font-code text-[11px] font-bold text-[#2d2d2d]/60">
                            LEMBAR TELAAH • SESI 5
                          </span>
                          <span className="px-2 py-0.5 rounded-sm bg-[#c7b8ea]/40 text-[#1a1a1a] font-code text-[10px] font-bold">
                            EDISI 2026
                          </span>
                        </div>

                        {/* Vector Artwork Illustration */}
                        <div className="w-full bg-[#f8f6f1] rounded-sm border border-[#e4ded3] p-5 mb-5 flex flex-col items-center justify-center">
                          <svg
                            viewBox="0 0 320 200"
                            className="w-full h-auto"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Open notebook base */}
                            <rect
                              x="30"
                              y="30"
                              width="260"
                              height="140"
                              rx="4"
                              fill="#FFFFFF"
                              stroke="#2D2D2D"
                              strokeWidth="2"
                            />
                            {/* Center spine */}
                            <line
                              x1="160"
                              y1="30"
                              x2="160"
                              y2="170"
                              stroke="#E4DED3"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                            {/* Left Page: Digital Citizen Icon & Lines */}
                            <circle cx="95" cy="70" r="22" fill="#98D4BB" />
                            <path
                              d="M95 58L85 63V71C85 77 89 83 95 85C101 83 105 77 105 71V63L95 58Z"
                              stroke="#1A1A1A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <rect x="55" y="105" width="80" height="6" rx="2" fill="#2D2D2D" opacity="0.8" />
                            <rect x="55" y="118" width="60" height="5" rx="2" fill="#2D2D2D" opacity="0.4" />
                            <rect x="55" y="129" width="70" height="5" rx="2" fill="#2D2D2D" opacity="0.4" />

                            {/* Right Page: Citizen Journalism Icon & Lines */}
                            <circle cx="225" cy="70" r="22" fill="#F4B8C5" />
                            <path
                              d="M216 63H234V77H216V63Z"
                              stroke="#1A1A1A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M220 67H230" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                            <path d="M220 71H228" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                            <path d="M220 74H226" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                            <rect x="185" y="105" width="80" height="6" rx="2" fill="#2D2D2D" opacity="0.8" />
                            <rect x="185" y="118" width="75" height="5" rx="2" fill="#2D2D2D" opacity="0.4" />
                            <rect x="185" y="129" width="55" height="5" rx="2" fill="#2D2D2D" opacity="0.4" />

                            {/* Center Binder Clips */}
                            <rect x="156" y="50" width="8" height="12" rx="3" fill="#2D2D2D" />
                            <rect x="156" y="94" width="8" height="12" rx="3" fill="#2D2D2D" />
                            <rect x="156" y="138" width="8" height="12" rx="3" fill="#2D2D2D" />
                          </svg>
                        </div>

                        {/* Dual Role Badges */}
                        <div className="grid grid-cols-2 gap-3 text-left">
                          <button
                            type="button"
                            onClick={() => handleFilterChange("citizen")}
                            className={`p-3 rounded-sm transition-all text-left cursor-pointer active:translate-y-[1px] ${
                              filterMode === "citizen"
                                ? "bg-[#98d4bb]/50 border-2 border-[#7ec4a8] shadow-sm ring-1 ring-[#1a1a1a]"
                                : filterMode === "journalism"
                                ? "opacity-45 bg-[#98d4bb]/10 border border-[#98d4bb]/40"
                                : "bg-[#98d4bb]/20 border border-[#98d4bb] hover:bg-[#98d4bb]/30"
                            }`}
                            title="Klik untuk memfilter Digital Citizen"
                          >
                            <span className="font-code text-[10px] font-bold text-[#1a1a1a] flex items-center justify-between mb-0.5">
                              <span>01. DIGITAL CITIZEN</span>
                              {filterMode === "citizen" && <Check className="w-3 h-3 text-[#1a1a1a]" />}
                            </span>
                            <span className="font-ui text-xs font-semibold text-[#2d2d2d] block">
                              Etika, Netiket, Privasi &amp; Literasi Kritis
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFilterChange("journalism")}
                            className={`p-3 rounded-sm transition-all text-left cursor-pointer active:translate-y-[1px] ${
                              filterMode === "journalism"
                                ? "bg-[#f4b8c5]/50 border-2 border-[#e59fb0] shadow-sm ring-1 ring-[#1a1a1a]"
                                : filterMode === "citizen"
                                ? "opacity-45 bg-[#f4b8c5]/10 border border-[#f4b8c5]/40"
                                : "bg-[#f4b8c5]/20 border border-[#f4b8c5] hover:bg-[#f4b8c5]/30"
                            }`}
                            title="Klik untuk memfilter Citizen Journalism"
                          >
                            <span className="font-code text-[10px] font-bold text-[#1a1a1a] flex items-center justify-between mb-0.5">
                              <span>02. CITIZEN JOURNALISM</span>
                              {filterMode === "journalism" && <Check className="w-3 h-3 text-[#1a1a1a]" />}
                            </span>
                            <span className="font-ui text-xs font-semibold text-[#2d2d2d] block">
                              Dokumentasi Fakta, Saksi Mata &amp; Isu Lokal
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 01: KONSEP DASAR & PENGERTIAN */}
              {isSectionVisible("pengertian") && (
                <section
                  id="pengertian"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-3xl mb-10">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#c7b8ea]/40 border border-[#c7b8ea] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 01 • PENGERTIAN AKADEMIK
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 leading-tight">
                      Mengenal Dua Ranah Konseptual di Ruang Digital
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Perkembangan teknologi informasi melahirkan dua konsep penting yang
                      saling melengkapi, namun memiliki batasan peran, ruang lingkup, dan
                      tanggung jawab yang spesifik.
                    </p>
                  </div>

                  {/* Asymmetric 2-Card Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Digital Citizen Definition */}
                    {(filterMode === "all" || filterMode === "citizen") && (
                      <div className={`bg-white rounded-sm border border-[#e4ded3] border-t-4 border-t-[#98d4bb] p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all ${
                        filterMode === "citizen" ? "lg:col-span-2 shadow-md ring-2 ring-[#7ec4a8]" : ""
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#98d4bb]/30 text-[#1a1a1a] text-xs font-code font-bold">
                              <ShieldCheck className="w-4 h-4 text-[#1a1a1a]" />
                              <span>WARGA DIGITAL (DIGITAL CITIZEN)</span>
                            </div>
                            <span className="font-code text-xs font-bold text-[#2d2d2d]/50">
                              REF: RIBBLE (2015)
                            </span>
                          </div>

                          <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3">
                            Apa Definisi Digital Citizen?
                          </h3>

                          <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed mb-6">
                            Menurut <strong>Mike Ribble (2015)</strong> serta{" "}
                            <strong>Mossberger et al. (2008)</strong>, <em>Digital Citizen</em>{" "}
                            adalah setiap individu yang menggunakan teknologi informasi dan
                            internet secara teratur, efektif, dan bertanggung jawab dengan
                            mematuhi norma etika, keamanan, dan hukum dalam berinteraksi di
                            tengah masyarakat siber.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#e4ded3] flex flex-wrap items-center justify-between text-xs font-ui">
                          <span className="font-semibold text-[#2d2d2d]/60">Prinsip Pokok:</span>
                          <span className="font-bold text-[#1a1a1a] px-2 py-0.5 rounded-sm bg-[#98d4bb]/20">
                            Etika, Keamanan Privasi, &amp; Tanggung Jawab Sosial
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Citizen Journalism Definition */}
                    {(filterMode === "all" || filterMode === "journalism") && (
                      <div className={`bg-white rounded-sm border border-[#e4ded3] border-t-4 border-t-[#f4b8c5] p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all ${
                        filterMode === "journalism" ? "lg:col-span-2 shadow-md ring-2 ring-[#e59fb0]" : ""
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#f4b8c5]/30 text-[#1a1a1a] text-xs font-code font-bold">
                              <Newspaper className="w-4 h-4 text-[#1a1a1a]" />
                              <span>JURNALISME WARGA (CITIZEN JOURNALISM)</span>
                            </div>
                            <span className="font-code text-xs font-bold text-[#2d2d2d]/50">
                              REF: BOWMAN &amp; WILLIS
                            </span>
                          </div>

                          <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3">
                            Apa Definisi Citizen Journalism?
                          </h3>

                          <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed mb-6">
                            Menurut <strong>Bowman &amp; Willis (2003)</strong> dalam karya{" "}
                            <em>We Media</em>, <em>Citizen Journalism</em> adalah aksi warga
                            biasa (non-jurnalis profesional) yang berperan aktif dalam proses
                            mengumpulkan, merekam, mengolah, dan menyebarkan berita atau laporan
                            faktual suatu peristiwa secara mandiri ke ruang publik.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#e4ded3] flex flex-wrap items-center justify-between text-xs font-ui">
                          <span className="font-semibold text-[#2d2d2d]/60">Prinsip Pokok:</span>
                          <span className="font-bold text-[#1a1a1a] px-2 py-0.5 rounded-sm bg-[#f4b8c5]/20">
                            Partisipasi Warga, Saksi Mata Lapangan, &amp; Kabar Faktual
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* SECTION 02: DIGITAL CITIZEN & 6 KARAKTERISTIK (ZIG-ZAG FEATURE LAYOUT) */}
              {isSectionVisible("digital-citizen") &&
                (presentationMode || filterMode === "all" || filterMode === "citizen") && (
                  <section
                    id="digital-citizen"
                    className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                  >
                    <div className="max-w-3xl mb-8">
                      <span className="inline-block px-2.5 py-1 rounded-sm bg-[#98d4bb]/30 border border-[#98d4bb] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                        BAGIAN 02 • ELEMEN PERTAMA
                      </span>
                      <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                        Digital Citizen (Warga Digital)
                      </h2>
                      <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                        Kewargaan digital bukan sekadar kepemilikan kuota atau perangkat,
                        melainkan kematangan literasi kognitif, kehati-hatian etis, dan
                        kepatuhan hukum siber.
                      </p>
                    </div>

                    {/* Editorial Highlight Banner */}
                    <div className="rounded-sm bg-white border border-[#98d4bb] p-5 sm:p-6 mb-10 flex items-start gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded-sm bg-[#98d4bb] text-[#1a1a1a] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-editorial-heading text-base font-bold text-[#1a1a1a] mb-1">
                          Prinsip Sembilan Elemen Mike Ribble
                        </h3>
                        <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed">
                          Menjadi warga digital sejati menuntut keseimbangan antara hak
                          kebebasan berekspresi dengan kewajiban melindungi data pribadi,
                          menghargai karya cipta orang lain, serta menjaga kesehatan mental
                          dari tekanan arus informasi.
                        </p>
                      </div>
                    </div>

                    <h3 className="font-editorial-heading text-xl font-bold text-[#1a1a1a] mb-6">
                      6 Karakteristik Utama Digital Citizen
                    </h3>

                    {/* Zig-Zag Alternating Layout (No 3-equal columns) */}
                    <div className="space-y-6">
                      {/* Row 1: Item 1 (Wide Left) + Item 2 (Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#98d4bb]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 01
                              </span>
                              <BookOpen className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[0].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[0].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[0].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[0].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#c7b8ea]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 02
                              </span>
                              <MessageSquare className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[1].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[1].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[1].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[1].tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Item 3 (Left) + Item 4 (Wide Right) - Alternating zig-zag */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#a8d8ea]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 03
                              </span>
                              <Lock className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[2].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[2].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[2].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[2].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#ffe6a7]/50 text-[#1a1a1a]">
                                KARAKTERISTIK 04
                              </span>
                              <Scale className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[3].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[3].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[3].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[3].tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Item 5 (Wide Left) + Item 6 (Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#f4b8c5]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 05
                              </span>
                              <HeartPulse className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[4].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[4].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[4].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[4].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#98d4bb]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 06
                              </span>
                              <Users className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {DIGITAL_CITIZEN_CHARS[5].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {DIGITAL_CITIZEN_CHARS[5].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {DIGITAL_CITIZEN_CHARS[5].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {DIGITAL_CITIZEN_CHARS[5].tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

              {/* SECTION 03: CITIZEN JOURNALISM & 6 KARAKTERISTIK (ZIG-ZAG FEATURE LAYOUT) */}
              {isSectionVisible("citizen-journalism") &&
                (presentationMode || filterMode === "all" || filterMode === "journalism") && (
                  <section
                    id="citizen-journalism"
                    className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                  >
                    <div className="max-w-3xl mb-8">
                      <span className="inline-block px-2.5 py-1 rounded-sm bg-[#f4b8c5]/30 border border-[#f4b8c5] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                        BAGIAN 03 • ELEMEN KEDUA
                      </span>
                      <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                        Citizen Journalism (Jurnalisme Warga)
                      </h2>
                      <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                        Transformasi khalayak pembaca pasif menjadi produsen berita aktif
                        (prosumer) yang meliput peristiwa langsung dari lapangan.
                      </p>
                    </div>

                    {/* Editorial Highlight Banner */}
                    <div className="rounded-sm bg-white border border-[#f4b8c5] p-5 sm:p-6 mb-10 flex items-start gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded-sm bg-[#f4b8c5] text-[#1a1a1a] flex items-center justify-center shrink-0">
                        <Newspaper className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-editorial-heading text-base font-bold text-[#1a1a1a] mb-1">
                          Demokratisasi Informasi Melalui Smartphone
                        </h3>
                        <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed">
                          Keberadaan media sosial dan ponsel pintar memungkinkan warga
                          melaporkan peristiwa lokal seketika (real-time), mengisi sudut
                          pandang yang sering terabaikan oleh media nasional.
                        </p>
                      </div>
                    </div>

                    <h3 className="font-editorial-heading text-xl font-bold text-[#1a1a1a] mb-6">
                      6 Karakteristik Utama Citizen Journalism
                    </h3>

                    {/* Zig-Zag Alternating Layout (No 3-equal columns) */}
                    <div className="space-y-6">
                      {/* Row 1: Item 1 (Wide Left) + Item 2 (Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#f4b8c5]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 01
                              </span>
                              <Users className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[0].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[0].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[0].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[0].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#98d4bb]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 02
                              </span>
                              <Zap className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[1].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[1].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[1].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[1].tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Item 3 (Left) + Item 4 (Wide Right) - Alternating */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#a8d8ea]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 03
                              </span>
                              <Share2 className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[2].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[2].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[2].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[2].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#ffe6a7]/50 text-[#1a1a1a]">
                                KARAKTERISTIK 04
                              </span>
                              <MapPin className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[3].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[3].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[3].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[3].tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Item 5 (Wide Left) + Item 6 (Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#c7b8ea]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 05
                              </span>
                              <Radio className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[4].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[4].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[4].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[4].tag}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-code text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#f4b8c5]/40 text-[#1a1a1a]">
                                KARAKTERISTIK 06
                              </span>
                              <Eye className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                            <h4 className="font-editorial-heading text-lg font-bold text-[#1a1a1a] mb-1">
                              {CITIZEN_JOURNALISM_CHARS[5].title}
                            </h4>
                            <p className="font-ui text-xs font-semibold text-[#2d2d2d]/60 mb-3">
                              {CITIZEN_JOURNALISM_CHARS[5].subtitle}
                            </p>
                            <p className="font-ui text-sm text-[#2d2d2d]/85 leading-relaxed">
                              {CITIZEN_JOURNALISM_CHARS[5].description}
                            </p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e4ded3]">
                            <span className="font-code text-[11px] font-bold text-[#1a1a1a]">
                              Fokus: {CITIZEN_JOURNALISM_CHARS[5].tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

              {/* SECTION 04: TABEL KOMPARASI UTAMA (INTI JAWABAN NOMOR 1) */}
              {isSectionVisible("perbedaan") && (
                <section
                  id="perbedaan"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-3xl mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#a8d8ea]/40 border border-[#a8d8ea] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 04 • KOMPARASI SISTEMATIS
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      Tabel Perbedaan Utama (Inti Jawaban No. 1)
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Matriks perbandingan komprehensif berdasarkan 7 dimensi pembeda
                      untuk memperjelas irisan dan perbedaan peran secara akademik.
                    </p>
                  </div>

                  {/* Desktop Editorial Ledger Table */}
                  <div className="hidden md:block overflow-hidden rounded-sm border border-[#2d2d2d]/30 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse font-ui">
                      <thead>
                        <tr className="border-b border-[#2d2d2d]">
                          <th className="w-1/4 py-4 px-5 bg-[#2d2d2d] text-[#ffe6a7] text-xs font-code font-bold uppercase tracking-wider">
                            Dimensi Pembeda
                          </th>
                          <th
                            className={`w-[37.5%] py-4 px-5 text-[#1a1a1a] text-xs font-code font-bold uppercase tracking-wider border-l border-[#2d2d2d]/20 transition-all ${
                              filterMode === "citizen"
                                ? "bg-[#98d4bb] ring-2 ring-inset ring-[#2d2d2d]"
                                : filterMode === "journalism"
                                ? "bg-[#98d4bb]/40 opacity-55"
                                : "bg-[#98d4bb]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-[#1a1a1a]" />
                              <span>Digital Citizen (Warga Digital)</span>
                              {filterMode === "citizen" && (
                                <span className="ml-auto px-1.5 py-0.5 rounded-xs bg-[#2d2d2d] text-[#98d4bb] text-[10px]">
                                  FOKUS
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            className={`w-[37.5%] py-4 px-5 text-[#1a1a1a] text-xs font-code font-bold uppercase tracking-wider border-l border-[#2d2d2d]/20 transition-all ${
                              filterMode === "journalism"
                                ? "bg-[#f4b8c5] ring-2 ring-inset ring-[#2d2d2d]"
                                : filterMode === "citizen"
                                ? "bg-[#f4b8c5]/40 opacity-55"
                                : "bg-[#f4b8c5]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Newspaper className="w-4 h-4 text-[#1a1a1a]" />
                              <span>Citizen Journalism (Pewarta Warga)</span>
                              {filterMode === "journalism" && (
                                <span className="ml-auto px-1.5 py-0.5 rounded-xs bg-[#2d2d2d] text-[#f4b8c5] text-[10px]">
                                  FOKUS
                                </span>
                              )}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e4ded3] text-xs">
                        {COMPARISON_ROWS.map((row, index) => (
                          <tr
                            key={row.id}
                            className={index % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}
                          >
                            <td className="py-4 px-5 font-bold text-[#1a1a1a] align-top bg-[#f8f6f1]/60">
                              <span className="font-editorial-heading text-sm text-[#1a1a1a] block mb-0.5">
                                {row.aspect}
                              </span>
                            </td>
                            <td
                              className={`py-4 px-5 text-[#2d2d2d]/85 leading-relaxed align-top border-l border-[#e4ded3] transition-all ${
                                filterMode === "citizen"
                                  ? "bg-[#98d4bb]/10 font-medium"
                                  : filterMode === "journalism"
                                  ? "opacity-50"
                                  : ""
                              }`}
                            >
                              <div className="font-bold text-[#1a1a1a] mb-1 px-2 py-0.5 rounded-xs bg-[#98d4bb]/30 inline-block">
                                {row.highlightCitizen}
                              </div>
                              <p className="mt-1">{row.digitalCitizen}</p>
                            </td>
                            <td
                              className={`py-4 px-5 text-[#2d2d2d]/85 leading-relaxed align-top border-l border-[#e4ded3] transition-all ${
                                filterMode === "journalism"
                                  ? "bg-[#f4b8c5]/10 font-medium"
                                  : filterMode === "citizen"
                                  ? "opacity-50"
                                  : ""
                              }`}
                            >
                              <div className="font-bold text-[#1a1a1a] mb-1 px-2 py-0.5 rounded-xs bg-[#f4b8c5]/30 inline-block">
                                {row.highlightJournalism}
                              </div>
                              <p className="mt-1">{row.citizenJournalism}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Accordion Cards */}
                  <div className="md:hidden space-y-3">
                    {COMPARISON_ROWS.map((row) => {
                      const isOpen = expandedRows[row.id] ?? true;
                      return (
                        <div
                          key={row.id}
                          className="rounded-sm border border-[#e4ded3] bg-white overflow-hidden shadow-xs"
                        >
                          <button
                            type="button"
                            onClick={() => toggleRow(row.id)}
                            className="w-full px-4 py-3.5 bg-[#f5f2eb] flex items-center justify-between text-left font-editorial-heading font-bold text-xs text-[#1a1a1a] cursor-pointer"
                          >
                            <span>{row.aspect}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-[#2d2d2d]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#2d2d2d]" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="p-4 space-y-3 text-xs font-ui">
                              <div
                                className={`rounded-sm border p-3 transition-all ${
                                  filterMode === "citizen"
                                    ? "bg-[#98d4bb]/25 border-[#7ec4a8] ring-1 ring-[#7ec4a8]"
                                    : filterMode === "journalism"
                                    ? "opacity-50 bg-[#98d4bb]/10 border-[#98d4bb]/30"
                                    : "bg-[#98d4bb]/15 border-[#98d4bb]"
                                }`}
                              >
                                <div className="font-code text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">
                                  Digital Citizen {filterMode === "citizen" && "• FOKUS"}
                                </div>
                                <div className="font-bold text-[#1a1a1a] mb-1">
                                  {row.highlightCitizen}
                                </div>
                                <p className="text-[#2d2d2d]/80 leading-relaxed">
                                  {row.digitalCitizen}
                                </p>
                              </div>

                              <div
                                className={`rounded-sm border p-3 transition-all ${
                                  filterMode === "journalism"
                                    ? "bg-[#f4b8c5]/25 border-[#e59fb0] ring-1 ring-[#e59fb0]"
                                    : filterMode === "citizen"
                                    ? "opacity-50 bg-[#f4b8c5]/10 border-[#f4b8c5]/30"
                                    : "bg-[#f4b8c5]/15 border-[#f4b8c5]"
                                }`}
                              >
                                <div className="font-code text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">
                                  Citizen Journalism {filterMode === "journalism" && "• FOKUS"}
                                </div>
                                <div className="font-bold text-[#1a1a1a] mb-1">
                                  {row.highlightJournalism}
                                </div>
                                <p className="text-[#2d2d2d]/80 leading-relaxed">
                                  {row.citizenJournalism}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* SECTION 05: SINERGI & IRISAN PERAN */}
              {isSectionVisible("hubungan") && (
                <section
                  id="hubungan"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-3xl mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#ffe6a7]/60 border border-[#ebd18e] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 05 • SINTESIS &amp; SINERGI
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      Bagaimana Keduanya Saling Terhubung?
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Meskipun berbeda fokus, <em>Digital Citizen</em> dan{" "}
                      <em>Citizen Journalism</em> saling beririsan kuat dalam mewujudkan
                      lingkungan informasi yang tepercaya.
                    </p>
                  </div>

                  <div className="bg-white rounded-sm border border-[#e4ded3] p-6 sm:p-10 shadow-xs">
                    {/* Desktop 3-Circle Venn Diagram with Pastel Notebook Aesthetics */}
                    <div className="hidden md:flex items-center justify-center py-6">
                      {/* Left Circle: Digital Citizen */}
                      <div className="w-64 h-64 rounded-full bg-[#98d4bb]/30 border-2 border-[#7ec4a8] flex flex-col items-center justify-center text-center p-6 -mr-6 z-10 shadow-xs">
                        <div className="w-8 h-8 rounded-full bg-[#2d2d2d] text-[#98d4bb] flex items-center justify-center mb-2">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h3 className="font-editorial-heading text-sm font-bold text-[#1a1a1a] mb-1">
                          Digital Citizen
                        </h3>
                        <p className="font-ui text-[11px] text-[#2d2d2d]/80 leading-relaxed">
                          Fondasi moral: etika, netiket sopan, keamanan privasi, dan literasi
                          kritis seluruh pengguna siber.
                        </p>
                      </div>

                      {/* Overlapping Center Circle: Irisan Peran */}
                      <div className="w-72 h-72 rounded-full bg-[#2d2d2d] border-4 border-[#ffe6a7] text-white flex flex-col items-center justify-center text-center p-6 z-20 shadow-xl">
                        <span className="px-2.5 py-0.5 rounded-sm bg-[#ffe6a7] text-[#1a1a1a] font-code text-[10px] font-bold uppercase tracking-wider mb-2">
                          IRISAN UTAMA
                        </span>
                        <h3 className="font-editorial-heading text-base font-bold text-[#ffe6a7] mb-1.5">
                          Pewarta Warga Beretika
                        </h3>
                        <p className="font-ui text-xs text-white/90 leading-relaxed">
                          Warga yang cepat melaporkan peristiwa lapangan namun tetap{" "}
                          <strong>memverifikasi fakta, santun, dan taat hukum</strong>.
                        </p>
                      </div>

                      {/* Right Circle: Citizen Journalism */}
                      <div className="w-64 h-64 rounded-full bg-[#f4b8c5]/30 border-2 border-[#e59fb0] flex flex-col items-center justify-center text-center p-6 -ml-6 z-10 shadow-xs">
                        <div className="w-8 h-8 rounded-full bg-[#2d2d2d] text-[#f4b8c5] flex items-center justify-center mb-2">
                          <Newspaper className="w-4 h-4" />
                        </div>
                        <h3 className="font-editorial-heading text-sm font-bold text-[#1a1a1a] mb-1">
                          Citizen Journalism
                        </h3>
                        <p className="font-ui text-[11px] text-[#2d2d2d]/80 leading-relaxed">
                          Aksi peliputan: merekam fakta lapangan, saksi mata, dan mengangkat
                          isu lokal ke publik.
                        </p>
                      </div>
                    </div>

                    {/* Mobile Synthesis Stack */}
                    <div className="md:hidden space-y-3 mb-6">
                      <div className="rounded-sm bg-[#98d4bb]/20 border border-[#98d4bb] p-4 text-center">
                        <h3 className="font-editorial-heading text-xs font-bold text-[#1a1a1a] mb-1">
                          1. Digital Citizen (Fondasi Moral)
                        </h3>
                        <p className="font-ui text-xs text-[#2d2d2d]/80">
                          Etika, literasi verifikasi, keamanan akun, dan kesadaran hukum.
                        </p>
                      </div>

                      <div className="text-center font-code text-xs font-bold text-[#2d2d2d]">
                        + Sinergi Menghasilkan +
                      </div>

                      <div className="rounded-sm bg-[#2d2d2d] text-[#ffe6a7] p-4 text-center shadow-md">
                        <h3 className="font-editorial-heading text-xs font-bold mb-1">
                          Pewarta Warga Beretika &amp; Bertanggung Jawab
                        </h3>
                        <p className="font-ui text-xs text-white/80">
                          Menyampaikan kabar cepat sekaligus akurat, santun, dan menghargai privasi.
                        </p>
                      </div>

                      <div className="rounded-sm bg-[#f4b8c5]/20 border border-[#f4b8c5] p-4 text-center">
                        <h3 className="font-editorial-heading text-xs font-bold text-[#1a1a1a] mb-1">
                          2. Citizen Journalism (Aksi Lapangan)
                        </h3>
                        <p className="font-ui text-xs text-[#2d2d2d]/80">
                          Keberanian warga mendokumentasikan fakta lokal seketika (real-time).
                        </p>
                      </div>
                    </div>

                    {/* Editorial Synthesis Quote */}
                    <div className="mt-8 rounded-sm bg-[#f5f2eb] border border-[#e4ded3] p-5 sm:p-6 flex items-start gap-3.5">
                      <Sparkles className="w-5 h-5 text-[#2d2d2d] shrink-0 mt-0.5" />
                      <p className="font-ui text-xs sm:text-sm font-medium text-[#2d2d2d] leading-relaxed">
                        <strong>Simpulan Kunci:</strong> Setiap pelaku <em>Citizen Journalism</em>{" "}
                        yang kredibel wajib menjadi <em>Digital Citizen</em> yang matang
                        terlebih dahulu. Kecepatan tanpa filter verifikasi dan etika hanya akan
                        menghasilkan kabar bohong atau pelanggaran privasi sesama warga.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 06: STUDI KASUS KONTEKSTUAL (BENCANA BANJIR) */}
              {isSectionVisible("studi-kasus") && (
                <section
                  id="studi-kasus"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-3xl mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#c7b8ea]/40 border border-[#c7b8ea] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 06 • ILUSTRASI APLIKATIF
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      Studi Kasus: Menyikapi Bencana Banjir Lokal
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Bagaimana perbedaan aksi nyata antara peran <em>Digital Citizen</em> dan{" "}
                      <em>Citizen Journalism</em> saat menghadapi situasi darurat di lingkungan
                      tempat tinggal?
                    </p>
                  </div>

                  {/* Field Scenario File Banner */}
                  <div className="rounded-sm bg-white border border-[#2d2d2d]/30 p-5 mb-8 flex items-start gap-4 shadow-xs">
                    <div className="w-9 h-9 rounded-sm bg-[#ffe6a7] text-[#1a1a1a] flex items-center justify-center shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-code text-[11px] font-bold text-[#2d2d2d]/60 mb-0.5 uppercase">
                        Skenario Kasus Lapangan:
                      </div>
                      <p className="font-ui text-xs sm:text-sm text-[#1a1a1a] leading-relaxed">
                        Hujan deras melanda sejak malam dan merendam jalan utama kecamatan. Di
                        grup percakapan RT beredar video dramatis tanggul jebol yang ternyata
                        adalah rekaman musibah di daerah lain tiga tahun lalu, memicu
                        kepanikan ibu-ibu warga.
                      </p>
                    </div>
                  </div>

                  {/* Asymmetric Case Action Cards (Zig-zag timeline) */}
                  <div className="space-y-4">
                    {/* Action 1: Digital Citizen (Filter Hoaks) */}
                    <div
                      className={`bg-white rounded-sm border border-[#e4ded3] border-l-4 border-l-[#98d4bb] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                        filterMode === "citizen"
                          ? "ring-2 ring-[#7ec4a8] shadow-md bg-[#98d4bb]/5 scale-[1.01]"
                          : filterMode === "journalism"
                          ? "opacity-45"
                          : ""
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-code text-xs font-bold px-2 py-0.5 rounded-sm bg-[#98d4bb]/40 text-[#1a1a1a]">
                            TINDAKAN 01
                          </span>
                          <span className="font-editorial-heading font-bold text-sm text-[#1a1a1a]">
                            Verifikasi Fakta &amp; Menenangkan Warga
                          </span>
                          {filterMode === "citizen" && (
                            <span className="px-1.5 py-0.5 rounded-xs bg-[#2d2d2d] text-[#98d4bb] font-code text-[10px] font-bold">
                              FOKUS AKTIF
                            </span>
                          )}
                        </div>
                        <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed">
                          Mengecek rekaman tanggul melalui pencarian gambar terbalik dan kanal
                          resmi BPBD. Mengabarkan dengan santun di grup bahwa video tersebut
                          lama, sehingga kepanikan warga mereda.
                        </p>
                      </div>
                      <span className="font-code text-[11px] font-bold px-3 py-1.5 rounded-sm bg-[#98d4bb]/20 border border-[#98d4bb] text-[#1a1a1a] shrink-0">
                        Peran Digital Citizen
                      </span>
                    </div>

                    {/* Action 2: Digital Citizen (Proteksi Privasi) */}
                    <div
                      className={`bg-white rounded-sm border border-[#e4ded3] border-l-4 border-l-[#c7b8ea] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                        filterMode === "citizen"
                          ? "ring-2 ring-[#b5a3dd] shadow-md bg-[#c7b8ea]/5 scale-[1.01]"
                          : filterMode === "journalism"
                          ? "opacity-45"
                          : ""
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-code text-xs font-bold px-2 py-0.5 rounded-sm bg-[#c7b8ea]/40 text-[#1a1a1a]">
                            TINDAKAN 02
                          </span>
                          <span className="font-editorial-heading font-bold text-sm text-[#1a1a1a]">
                            Menghormati Hak Privasi &amp; Empati Korban
                          </span>
                          {filterMode === "citizen" && (
                            <span className="px-1.5 py-0.5 rounded-xs bg-[#2d2d2d] text-[#c7b8ea] font-code text-[10px] font-bold">
                              FOKUS AKTIF
                            </span>
                          )}
                        </div>
                        <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed">
                          Membagikan nomor call-center evakuasi resmi dan menolak menyebarkan
                          foto warga atau balita terdampak banjir yang berada dalam kondisi
                          rentan tanpa izin.
                        </p>
                      </div>
                      <span className="font-code text-[11px] font-bold px-3 py-1.5 rounded-sm bg-[#c7b8ea]/20 border border-[#c7b8ea] text-[#1a1a1a] shrink-0">
                        Peran Digital Citizen
                      </span>
                    </div>

                    {/* Action 3: Citizen Journalism (Reportase Faktual) */}
                    <div
                      className={`bg-white rounded-sm border border-[#e4ded3] border-l-4 border-l-[#f4b8c5] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                        filterMode === "journalism"
                          ? "ring-2 ring-[#e59fb0] shadow-md bg-[#f4b8c5]/5 scale-[1.01]"
                          : filterMode === "citizen"
                          ? "opacity-45"
                          : ""
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-code text-xs font-bold px-2 py-0.5 rounded-sm bg-[#f4b8c5]/40 text-[#1a1a1a]">
                            TINDAKAN 03
                          </span>
                          <span className="font-editorial-heading font-bold text-sm text-[#1a1a1a]">
                            Melaporkan Titik Banjir &amp; Rute Alternatif Real-Time
                          </span>
                          {filterMode === "journalism" && (
                            <span className="px-1.5 py-0.5 rounded-xs bg-[#2d2d2d] text-[#f4b8c5] font-code text-[10px] font-bold">
                              FOKUS AKTIF
                            </span>
                          )}
                        </div>
                        <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed">
                          Merekam kondisi jalan utama dari depan teras, mencantumkan jam (07.45
                          WIB), kedalaman air (60 cm), serta menyebutkan rute gang alternatif
                          yang masih kering untuk pengendara motor.
                        </p>
                      </div>
                      <span className="font-code text-[11px] font-bold px-3 py-1.5 rounded-sm bg-[#f4b8c5]/20 border border-[#f4b8c5] text-[#1a1a1a] shrink-0">
                        Peran Citizen Journalism
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 07: UJI PEMAHAMAN SINGKAT (EVALUASI INTERAKTIF) */}
              {isSectionVisible("kuis") && (
                <section
                  id="kuis"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-2xl mx-auto text-center mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#f4b8c5]/30 border border-[#f4b8c5] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 07 • EVALUASI INTERAKTIF
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-2">
                      Uji Pemahaman Singkat
                    </h2>
                    <p className="font-ui text-xs sm:text-sm text-[#2d2d2d]/80 mb-5">
                      Pilihlah opsi yang paling tepat pada lembar kuis berikut untuk menguji
                      penguasaan materi Anda.
                    </p>

                    {/* Score Ledger Pill */}
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-white border border-[#2d2d2d]/30 shadow-xs text-xs font-code font-bold text-[#1a1a1a]">
                      <span>
                        Terjawab: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length}
                      </span>
                      <span className="text-[#2d2d2d]/30">|</span>
                      <span>
                        Skor Benar: {quizScore} / {QUIZ_QUESTIONS.length}
                      </span>
                      {Object.keys(selectedAnswers).length > 0 && (
                        <button
                          type="button"
                          onClick={resetQuiz}
                          className="inline-flex items-center gap-1 text-[#2d2d2d] hover:underline ml-1 cursor-pointer font-ui font-semibold"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quiz Sheets */}
                  <div className="max-w-3xl mx-auto space-y-6">
                    {QUIZ_QUESTIONS.map((q) => {
                      const pickedId = selectedAnswers[q.id];
                      const pickedOption = q.options.find((o) => o.id === pickedId);

                      return (
                        <div
                          key={q.id}
                          className="bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs"
                        >
                          <span className="inline-block font-code text-[11px] font-bold text-[#2d2d2d]/50 mb-2">
                            {q.code}
                          </span>
                          <h3 className="font-editorial-heading text-base sm:text-lg font-bold text-[#1a1a1a] mb-4 leading-snug">
                            {q.question}
                          </h3>

                          <div className="space-y-2.5">
                            {q.options.map((opt) => {
                              const isSelected = pickedId === opt.id;
                              let btnClass =
                                "bg-[#fcfbf8] hover:bg-[#f5f2eb] border-[#e4ded3] text-[#1a1a1a]";
                              if (isSelected) {
                                btnClass = opt.isCorrect
                                  ? "bg-[#98d4bb]/30 border-[#7ec4a8] text-[#1a1a1a] ring-1 ring-[#7ec4a8]"
                                  : "bg-[#f4b8c5]/30 border-[#e59fb0] text-[#1a1a1a] ring-1 ring-[#e59fb0]";
                              }

                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, opt.id)}
                                  className={`w-full text-left px-4 py-3 rounded-sm border text-xs sm:text-sm font-ui font-medium flex items-center justify-between gap-3 transition-all cursor-pointer active:translate-y-[1px] ${btnClass}`}
                                >
                                  <span className="leading-relaxed">{opt.text}</span>
                                  {isSelected ? (
                                    opt.isCorrect ? (
                                      <CheckCircle2 className="w-4 h-4 text-[#1a1a1a] shrink-0" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-[#1a1a1a] shrink-0" />
                                    )
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-[#2d2d2d]/30 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {pickedOption && (
                            <div
                              className={`mt-4 rounded-sm p-4 text-xs font-ui leading-relaxed flex items-start gap-3 ${
                                pickedOption.isCorrect
                                  ? "bg-[#98d4bb]/20 border border-[#7ec4a8] text-[#1a1a1a]"
                                  : "bg-[#ffe6a7]/40 border border-[#ebd18e] text-[#1a1a1a]"
                              }`}
                            >
                              {pickedOption.isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                              )}
                              <div>{pickedOption.feedback}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* SECTION 08: KESIMPULAN & IKHTISAR AKHIR (ASYMMETRIC GRID) */}
              {isSectionVisible("kesimpulan") && (
                <section
                  id="kesimpulan"
                  className="py-14 sm:py-20 border-b border-[#e4ded3] scroll-mt-24"
                >
                  <div className="max-w-3xl mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#98d4bb]/30 border border-[#98d4bb] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 08 • IKHTISAR AKHIR
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      Tiga Intisari Pokok Pembelajaran
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Rangkuman komprehensif yang menjawab tuntas tugas mata kuliah Belajar di
                      Era Digital Sesi 5.
                    </p>
                  </div>

                  {/* Asymmetric 2-Row Layout (No 3 equal columns) */}
                  <div className="space-y-6">
                    {/* Primary Highlight Card (Full Width Hero) */}
                    <div className="rounded-sm bg-[#2d2d2d] text-[#f8f6f1] p-6 sm:p-8 shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-7 h-7 rounded-sm bg-[#98d4bb] text-[#1a1a1a] font-editorial-heading font-bold text-xs flex items-center justify-center">
                          01
                        </span>
                        <span className="font-code text-xs font-bold text-[#98d4bb] uppercase tracking-wider">
                          Distingsi Peran Fundamental
                        </span>
                      </div>
                      <h3 className="font-editorial-heading text-lg sm:text-xl font-bold text-white mb-2">
                        Etika Payung Umum vs Tindakan Pewartaan Spesifik
                      </h3>
                      <p className="font-ui text-xs sm:text-sm text-white/85 leading-relaxed max-w-3xl">
                        <strong>Digital Citizen</strong> adalah status dan etika perilaku bagi{" "}
                        <em>setiap individu pengguna internet</em> di segala aktivitas digital.
                        Sementara <strong>Citizen Journalism</strong> adalah peran aktif warga
                        saat mengambil inisiatif untuk meliput, merangkum fakta 5W+1H, dan
                        menyebarluaskan berita lapangan ke ruang publik.
                      </p>
                    </div>

                    {/* Secondary Paired Asymmetric Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-6 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-7 h-7 rounded-sm bg-[#c7b8ea] text-[#1a1a1a] font-editorial-heading font-bold text-xs flex items-center justify-center">
                              02
                            </span>
                            <span className="font-code text-xs font-bold text-[#2d2d2d]/70 uppercase">
                              Karakteristik Khas
                            </span>
                          </div>
                          <h4 className="font-editorial-heading text-base font-bold text-[#1a1a1a] mb-2">
                            9 Elemen Ribble vs Partisipasi Hyperlocal
                          </h4>
                          <p className="font-ui text-xs text-[#2d2d2d]/85 leading-relaxed">
                            Digital Citizen dicirikan oleh literasi verifikasi, netiket, privasi,
                            dan kepatuhan hukum siber. Citizen Journalism dicirikan oleh
                            pelaku non-profesional, kesaksian spontan saksi mata, isu lokal, dan
                            kanal partisipatif terbuka.
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-6 bg-white rounded-sm border border-[#e4ded3] p-6 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-7 h-7 rounded-sm bg-[#f4b8c5] text-[#1a1a1a] font-editorial-heading font-bold text-xs flex items-center justify-center">
                              03
                            </span>
                            <span className="font-code text-xs font-bold text-[#2d2d2d]/70 uppercase">
                              Kebutuhan Sinergi
                            </span>
                          </div>
                          <h4 className="font-editorial-heading text-base font-bold text-[#1a1a1a] mb-2">
                            Cepat Sekaligus Terverifikasi &amp; Beradab
                          </h4>
                          <p className="font-ui text-xs text-[#2d2d2d]/85 leading-relaxed">
                            Jurnalisme warga hanya akan membawa kemaslahatan jika dipraktikkan
                            oleh warga yang memiliki kedewasaan sebagai warga digital
                            beretika—mengutamakan kebenaran fakta di atas sekadar viralitas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 09: REFERENSI & PANEL TUGAS UT */}
              {isSectionVisible("referensi") && (
                <section id="referensi" className="py-14 sm:py-20 scroll-mt-24">
                  <div className="max-w-3xl mb-8">
                    <span className="inline-block px-2.5 py-1 rounded-sm bg-[#a8d8ea]/40 border border-[#a8d8ea] text-[#1a1a1a] font-code text-[11px] font-bold uppercase tracking-wider mb-3">
                      BAGIAN 09 • PUSTAKA &amp; PENGUMPULAN
                    </span>
                    <h2 className="font-editorial-heading text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">
                      Daftar Pustaka &amp; Berkas Tugas
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-[#2d2d2d]/80 leading-relaxed">
                      Kutipan literatur rujukan ilmiah serta panel cepat untuk menyalin format
                      jawaban Soal 1 dan Soal 2 bagi mahasiswa UT.
                    </p>
                  </div>

                  {/* Academic Citations Card */}
                  <div className="bg-white rounded-sm border border-[#e4ded3] p-6 sm:p-8 shadow-xs">
                    <h3 className="font-editorial-heading text-base font-bold text-[#1a1a1a] mb-4">
                      Referensi Akademik (Format APA)
                    </h3>
                    <ul className="space-y-3 font-ui text-xs sm:text-sm text-[#2d2d2d]/85 leading-relaxed list-disc pl-5">
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
                        <em>Buku Materi Pokok (BMP) Belajar di Era Digital (MKDI4202)</em>.
                        Tangerang Selatan: Penerbit Universitas Terbuka.
                      </li>
                    </ul>
                  </div>
                </section>
              )}

              {/* SLIDE NAVIGATION FOOTER INSIDE MAIN (FOR PRESENTATION MODE) */}
              {presentationMode && (
                <div className="pt-8 pb-4 flex items-center justify-between border-t border-[#e4ded3] mt-10 text-xs font-ui">
                  <button
                    type="button"
                    onClick={() => goToSlide(currentSlide - 1)}
                    disabled={currentSlide === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#e4ded3] text-[#1a1a1a] disabled:opacity-40 cursor-pointer hover:bg-slate-50 font-semibold shadow-xs transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>
                      {currentSlide > 0
                        ? `Sebelumnya: ${NOTEBOOK_TABS[currentSlide - 1]?.shortLabel}`
                        : "Lembar Awal"}
                    </span>
                  </button>
                  <span className="font-code text-xs text-[#2d2d2d]/70 font-bold">
                    Lembar {currentSlide + 1} / {NOTEBOOK_TABS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToSlide(currentSlide + 1)}
                    disabled={currentSlide === NOTEBOOK_TABS.length - 1}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2d2d2d] text-[#f8f6f1] disabled:opacity-40 cursor-pointer hover:bg-black font-semibold shadow-xs transition-colors"
                  >
                    <span>
                      {currentSlide < NOTEBOOK_TABS.length - 1
                        ? `Selanjutnya: ${NOTEBOOK_TABS[currentSlide + 1]?.shortLabel}`
                        : "Lembar Akhir"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </main>
          </div>

          {/* NOTEBOOK FOOTER STRIP */}
          <footer className="border-t border-[#e4ded3] bg-[#f5f2eb] px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-ui text-[#2d2d2d]/70">
            <div>
              <p className="font-bold text-[#1a1a1a]">
                Belajar di Era Digital - Universitas Terbuka Semester 3
              </p>
              <p className="text-[11px]">
                Desain Notebook Tabs Editorial - Bodoni Moda &amp; DM Sans
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#e4ded3] text-[#1a1a1a] font-semibold hover:bg-slate-100 transition-colors cursor-pointer shadow-xs active:translate-y-[1px]"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Sampul</span>
            </button>
          </footer>
        </div>
      </div>

      {/* MODAL: FORM JAWABAN UT & PANDUAN PENGUMPULAN */}
      {showAnswerModal && (
        <div className="fixed inset-0 z-50 bg-[#2d2d2d]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#f8f6f1] rounded-sm max-w-2xl w-full max-h-[88vh] overflow-y-auto border border-[#2d2d2d] shadow-2xl p-6 sm:p-8 paper-container">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#e4ded3] mb-5">
              <div>
                <span className="font-code text-[10px] font-bold text-[#2d2d2d]/60 uppercase tracking-wider block">
                  BERKAS TUGAS 2 • UNIVERSITAS TERBUKA
                </span>
                <h3 className="font-editorial-heading text-xl font-bold text-[#1a1a1a]">
                  Draf Jawaban Nomor 1 &amp; Panduan Tautan Nomor 2
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAnswerModal(false)}
                className="p-1.5 rounded-sm bg-white border border-[#e4ded3] hover:bg-slate-100 text-[#1a1a1a] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm font-ui text-[#2d2d2d] leading-relaxed">
              {/* Submission Guide */}
              <div className="rounded-sm bg-white border border-[#98d4bb] p-4 shadow-xs">
                <h4 className="font-editorial-heading font-bold text-sm text-[#1a1a1a] mb-2">
                  Petunjuk Pengumpulan Tugas Nomor 2 di Mac:
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-[#2d2d2d]/85">
                  <li>
                    Proyek ini telah dikonfigurasi sebagai media pembelajaran digital
                    interaktif mandiri pengganti Microsoft Sway dengan format Notebook Tabs.
                  </li>
                  <li>
                    Untuk preview di Mac: buka Terminal dan jalankan <code>npm run dev</code>.
                  </li>
                  <li>
                    Untuk mendapatkan tautan publik untuk Tutor UT: unggah proyek ini ke Vercel
                    (cukup ketik <code>npx vercel</code> di Terminal) untuk mendapatkan link seperti{" "}
                    <code>https://digital-citizen-ut.vercel.app</code> lalu cantumkan di form jawaban.
                  </li>
                </ol>
              </div>

              {/* Ready-to-Copy Draft */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-code font-bold text-xs uppercase text-[#1a1a1a]">
                    Teks Jawaban Siap Tempel (Nomor 1 &amp; 2):
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText("modal-copy", formattedUtAnswer)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#2d2d2d] text-[#ffe6a7] text-xs font-ui font-bold cursor-pointer active:translate-y-[1px]"
                  >
                    {copiedKey === "modal-copy" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#98d4bb]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-sm bg-[#2d2d2d] text-[#ffe6a7] text-xs whitespace-pre-wrap font-code overflow-x-auto leading-relaxed border border-black">
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
