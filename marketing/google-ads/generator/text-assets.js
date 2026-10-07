#!/usr/bin/env node
// Google Ads App campaign text assets: up to 5 headlines (<= 30 chars) and
// 5 descriptions (<= 90 chars) per language. Every claim maps to a documented
// app feature (lib/site.ts): Daily Challenge, 4 difficulty levels, notes /
// hints / undo, offline play, themes, statistics, unique-solution puzzles.
// No ratings, download counts, prices or rankings.
//
//   node text-assets.js   -> validates lengths, writes ../output/text_assets.csv

const fs = require("fs");
const path = require("path");

const T = {
  en: {
    h: ["Challenge Your Mind", "New Challenge Every Day", "Easy to Start, Hard to Master", "Sudoku from Easy to Expert", "How Fast Can You Solve It?"],
    d: [
      "A clean, modern Sudoku with a new Daily Challenge. Can you solve today’s puzzle?",
      "Four levels from Easy to Expert. Notes, hints and undo help you crack every grid.",
      "Play anytime, even offline. Beautiful themes and smooth, focused controls.",
      "Think. Solve. Master Sudoku. Every puzzle has exactly one solution.",
      "Easy to start, challenging to master. Track your progress and best times.",
    ],
  },
  hi: {
    h: ["दिमाग को दें चुनौती", "हर दिन एक नई चुनौती", "शुरू करना आसान, जीतना मुश्किल", "आसान से एक्सपर्ट तक सुडोकू", "कितनी जल्दी हल करेंगे?"],
    d: [
      "हर दिन एक नई दैनिक चुनौती। क्या आप आज की सुडोकू पहेली हल कर सकते हैं?",
      "आसान, मध्यम, कठिन और एक्सपर्ट – चार लेवल। नोट्स, हिंट और अनडू के साथ।",
      "कभी भी खेलें, ऑफ़लाइन भी। खूबसूरत थीम और आसान कंट्रोल।",
      "सोचें। हल करें। सुडोकू में माहिर बनें। हर पहेली का सिर्फ़ एक सही हल।",
      "शुरू करना आसान, महारत पाना चुनौती। अपनी प्रगति और बेस्ट टाइम देखें।",
    ],
  },
  gu: {
    h: ["મગજને આપો પડકાર", "દરરોજ એક નવો પડકાર", "શરૂ કરવું સરળ, જીતવું અઘરું", "સરળથી એક્સપર્ટ સુધી સુડોકુ", "તમે કેટલી ઝડપથી ઉકેલશો?"],
    d: [
      "દરરોજ નવો દૈનિક પડકાર. શું તમે આજની સુડોકુ પઝલ ઉકેલી શકશો?",
      "સરળ, મધ્યમ, મુશ્કેલ અને એક્સપર્ટ – ચાર લેવલ. નોટ્સ, હિન્ટ અને અનડૂ સાથે.",
      "ગમે ત્યારે રમો, ઑફલાઇન પણ. સુંદર થીમ્સ અને સરળ કંટ્રોલ્સ.",
      "વિચારો. ઉકેલો. સુડોકુમાં માસ્ટર બનો. દરેક પઝલનો એક જ સાચો ઉકેલ.",
      "શરૂ કરવું સરળ, માસ્ટર બનવું પડકારજનક. તમારી પ્રગતિ અને બેસ્ટ ટાઇમ જુઓ.",
    ],
  },
  mr: {
    h: ["बुद्धीला द्या आव्हान", "दररोज एक नवीन आव्हान", "सुरुवात सोपी, जिंकणं कठीण", "सोप्यापासून तज्ज्ञापर्यंत", "किती पटकन सोडवाल?"],
    d: [
      "दररोज एक नवीन दैनिक आव्हान. आजचं सुडोकू कोडं तुम्ही सोडवू शकता का?",
      "सोपे, मध्यम, कठीण आणि तज्ज्ञ – चार स्तर. नोट्स, हिंट आणि अनडूसह.",
      "कधीही खेळा, ऑफलाइनसुद्धा. सुंदर थीम्स आणि सोपे कंट्रोल्स.",
      "विचार करा. सोडवा. सुडोकूमध्ये पारंगत व्हा. प्रत्येक कोड्याचं एकच उत्तर.",
      "सुरुवात सोपी, प्रावीण्य मिळवणं आव्हानात्मक. तुमची प्रगती आणि बेस्ट टाइम पाहा.",
    ],
  },
  ta: {
    h: ["மூளைக்கு ஒரு சவால்", "தினமும் ஒரு புதிய சவால்", "தொடங்க எளிது, வெல்வது கடினம்", "எளிது முதல் நிபுணர் வரை", "எவ்வளவு வேகமாக தீர்ப்பீர்கள்?"],
    d: [
      "தினமும் ஒரு புதிய தினசரி சவால். இன்றைய சுடோகு புதிரைத் தீர்க்க முடியுமா?",
      "எளிது முதல் நிபுணர் வரை நான்கு நிலைகள். குறிப்புகள் மற்றும் ஹின்ட் வசதியுடன்.",
      "எப்போது வேண்டுமானாலும் விளையாடுங்கள், ஆஃப்லைனிலும். அழகான தீம்கள்.",
      "யோசியுங்கள். தீர்வு காணுங்கள். ஒவ்வொரு புதிருக்கும் ஒரே ஒரு சரியான தீர்வு.",
      "தொடங்க எளிது, தேர்ச்சி பெறுவது சவால். உங்கள் முன்னேற்றத்தைப் பாருங்கள்.",
    ],
  },
  te: {
    h: ["మీ మెదడుకు ఒక సవాల్", "ప్రతిరోజూ ఒక కొత్త సవాల్", "ఆడటం సులభం, గెలవడం కష్టం", "సులభం నుండి నిపుణుడి వరకు", "ఎంత వేగంగా పరిష్కరిస్తారు?"],
    d: [
      "ప్రతిరోజూ కొత్త రోజువారీ సవాల్. ఈరోజు సుడోకు పజిల్‌ను పరిష్కరించగలరా?",
      "సులభం, మధ్యస్థం, కష్టం, నిపుణుడు – నాలుగు స్థాయిలు. నోట్స్, హింట్స్‌తో.",
      "ఎప్పుడైనా ఆడండి, ఆఫ్‌లైన్‌లో కూడా. అందమైన థీమ్‌లు, సులభమైన కంట్రోల్స్.",
      "ఆలోచించండి. పరిష్కరించండి. ప్రతి పజిల్‌కు ఒకే ఒక సరైన సమాధానం.",
      "ఆడటం సులభం, నైపుణ్యం సాధించడం సవాల్. మీ పురోగతి, బెస్ట్ టైమ్ చూడండి.",
    ],
  },
  es: {
    h: ["Desafía tu mente", "Un nuevo reto cada día", "Entrena tu mente a diario", "Sudoku de Fácil a Experto", "¿Qué tan rápido lo resuelves?"],
    d: [
      "Un sudoku moderno con un nuevo Reto diario. ¿Puedes resolver el de hoy?",
      "Cuatro niveles, de Fácil a Experto. Notas, pistas y deshacer en cada partida.",
      "Juega cuando quieras, incluso sin conexión. Temas elegantes y controles fluidos.",
      "Piensa. Resuelve. Domina el sudoku. Cada tablero tiene una única solución.",
      "Fácil de empezar, difícil de dominar. Sigue tu progreso y tus mejores tiempos.",
    ],
  },
  pt: {
    h: ["Desafie sua mente", "Um novo desafio todo dia", "Treine seu cérebro todo dia", "Do Fácil ao Especialista", "Em quanto tempo você resolve?"],
    d: [
      "Um Sudoku moderno com um novo Desafio diário. Consegue resolver o de hoje?",
      "Quatro níveis, do Fácil ao Especialista. Notas, dicas e desfazer em cada jogo.",
      "Jogue quando quiser, até offline. Temas bonitos e controles suaves.",
      "Pense. Resolva. Domine o Sudoku. Cada tabuleiro tem uma única solução.",
      "Fácil de começar, difícil de dominar. Acompanhe seu progresso e melhores tempos.",
    ],
  },
  fr: {
    h: ["Mettez votre esprit au défi", "Un nouveau défi chaque jour", "Facile à prendre en main", "Du niveau Facile à Expert", "Relevez le défi du jour"],
    d: [
      "Un Sudoku moderne avec un nouveau Défi du jour. Saurez-vous résoudre la grille ?",
      "Quatre niveaux, de Facile à Expert. Notes, indices et annulation à chaque grille.",
      "Jouez quand vous voulez, même hors ligne. Thèmes élégants et commandes fluides.",
      "Réfléchissez. Résolvez. Maîtrisez le Sudoku. Chaque grille a une solution unique.",
      "Facile à prendre en main, difficile à maîtriser. Suivez vos progrès et records.",
    ],
  },
  de: {
    h: ["Fordere deinen Verstand heraus", "Jeden Tag ein neues Rätsel", "Einfach starten, Profi werden", "Von Leicht bis Experte", "Wie schnell löst du es?"],
    d: [
      "Modernes Sudoku mit täglich neuem Tagesrätsel. Schaffst du das Rätsel von heute?",
      "Vier Stufen von Leicht bis Experte. Mit Notizen, Tipps und Rückgängig-Funktion.",
      "Spiele jederzeit, auch offline. Schöne Designs und flüssige Steuerung.",
      "Denken. Lösen. Sudoku meistern. Jedes Rätsel hat genau eine Lösung.",
      "Leicht zu lernen, schwer zu meistern. Verfolge Fortschritt und Bestzeiten.",
    ],
  },
  id: {
    h: ["Tantang Otakmu", "Tantangan Baru Setiap Hari", "Mudah Dimulai, Sulit Dikuasai", "Dari Mudah hingga Ahli", "Seberapa Cepat Kamu?"],
    d: [
      "Sudoku modern dengan Tantangan Harian baru. Bisakah kamu memecahkan teka-teki hari ini?",
      "Empat level, dari Mudah hingga Ahli. Dilengkapi catatan, petunjuk, dan urungkan.",
      "Main kapan saja, bahkan offline. Tema cantik dan kontrol yang mulus.",
      "Berpikir. Pecahkan. Kuasai Sudoku. Setiap teka-teki punya satu solusi unik.",
      "Mudah dimulai, sulit dikuasai. Pantau progres dan waktu terbaikmu.",
    ],
  },
  ar: {
    h: ["تحدَّ عقلك", "تحدٍّ جديد كل يوم", "سهلة البداية، صعبة الإتقان", "من السهل إلى الخبير", "ما مدى سرعتك في الحل؟"],
    d: [
      "سودوكو عصرية مع تحدٍّ يومي جديد. هل يمكنك حل لغز اليوم؟",
      "أربعة مستويات من السهل إلى الخبير، مع الملاحظات والتلميحات والتراجع.",
      "العب في أي وقت، حتى دون اتصال بالإنترنت. سمات أنيقة وتحكم سلس.",
      "فكّر. حُلّ. أتقِن سودوكو. لكل لغز حل واحد صحيح فقط.",
      "سهلة البداية وصعبة الإتقان. تابع تقدمك وأفضل أوقاتك.",
    ],
  },
};

module.exports = { T };

if (require.main === module) {
  // Google Ads counts characters (code points); combining marks count too.
  const len = (s) => [...s].length;
  const rows = [["language", "type", "index", "text", "length", "limit"]];
  const errors = [];
  for (const [lang, { h, d }] of Object.entries(T)) {
    h.forEach((s, i) => { rows.push([lang, "headline", i + 1, s, len(s), 30]); if (len(s) > 30) errors.push(`${lang} headline ${i + 1}: ${len(s)} > 30  "${s}"`); });
    d.forEach((s, i) => { rows.push([lang, "description", i + 1, s, len(s), 90]); if (len(s) > 90) errors.push(`${lang} description ${i + 1}: ${len(s)} > 90  "${s}"`); });
  }
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const out = path.resolve(__dirname, "..", "output", "text_assets.csv");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, "﻿" + csv + "\n"); // BOM so Excel opens UTF-8 correctly
  console.log(errors.length ? errors.join("\n") : `OK: ${rows.length - 1} text assets within limits -> ${out}`);
  process.exitCode = errors.length ? 1 : 0;
}
