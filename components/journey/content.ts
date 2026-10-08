import type { L } from "./i18n";

export type SceneId =
  | "home" | "airport" | "miqat" | "road" | "haram"
  | "tawaf" | "maqam" | "sai" | "halq" | "ziyarah";

export interface StoryDua {
  label: L;
  ar: string;
  tr: { th: string; en: string };
  mn: { th: string; en: string };
}

export interface Site {
  city: "makkah" | "madinah";
  name: L;
  d: L;
}

export interface StoryScene {
  id: SceneId;
  rail: L;
  kicker: L;
  title: L;
  rule?: L;
  lead: L;
  points: L[];
  facts?: { k: L; v: L }[];
  duas?: StoryDua[];
  sites?: Site[];
}

/**
 * Background photos/illustrations for each scene. Drop a file into
 * /public/journey/ and add its path here — the scene then shows the image
 * behind its animated layer instead of the built-in line-art backdrop.
 */
export const SCENE_IMAGES: Partial<Record<SceneId, string>> = {
  // home: "/journey/01-home.webp",
  // airport: "/journey/02-airport.webp",
  // miqat: "/journey/03-plane.webp",
  // road: "/journey/04-road.webp",
  // haram: "/journey/05-haram.webp",
  // tawaf: "/journey/06-mataf.webp",
  // maqam: "/journey/08-maqam.webp",
  // sai: "/journey/07-masa.webp",
  // halq: "/journey/09-final.webp",
};

export const RULES = {
  rukn: { th: "รุก่น", en: "Pillar", ar: "ركن" },
  wajib: { th: "วาญิบ", en: "Obligatory", ar: "واجب" },
  sunnah: { th: "สุนนะฮ์", en: "Sunnah", ar: "سنة" },
} satisfies Record<string, L>;

export const UI = {
  heroSub: {
    th: "ออกเดินทางไปด้วยกัน ตั้งแต่สนามบินจนถึงการทำอุมเราะห์ครบทุกขั้นตอน",
    en: "Travel with us — from the airport to the final rite of Umrah, step by step.",
    ar: "رحلة معًا من المطار حتى إتمام العمرة خطوةً بخطوة",
  },
  scroll: { th: "เลื่อนลงเพื่อเริ่มการเดินทาง", en: "Scroll to begin the journey", ar: "مرّر للأسفل لتبدأ الرحلة" },
  translit: { th: "คำอ่าน", en: "Transliteration", ar: "" },
  meaning: { th: "ความหมาย", en: "Meaning", ar: "" },
  round: { th: "รอบที่", en: "Round", ar: "الشوط" },
  lap: { th: "เที่ยวที่", en: "Lap", ar: "الشوط" },
  toMakkah: { th: "มักกะฮ์", en: "Makkah", ar: "مكة" },
  km: { th: "กม.", en: "km", ar: "كم" },
  safa: { th: "เศาะฟา", en: "Safa", ar: "الصفا" },
  marwah: { th: "มัรวะฮ์", en: "Marwah", ar: "المروة" },
  greenZone: { th: "ช่วงไฟเขียว", en: "Green lights", ar: "العلمان الأخضران" },
  blackStone: { th: "หินดำ", en: "Black Stone", ar: "الحجر الأسود" },
  miqatLine: { th: "เขตมีกอต", en: "Miqat boundary", ar: "حدّ الميقات" },
  accepted: { th: "ตะก็อบบะลัลลอฮุ มินนา วะมินกุม", en: "May Allah accept it from us and from you", ar: "تقبّل الله منا ومنكم" },
  complete: { th: "อุมเราะห์ของคุณสมบูรณ์แล้ว", en: "Your Umrah is complete", ar: "تمّت عمرتك" },
  makkah: { th: "มักกะฮ์", en: "Makkah", ar: "مكة المكرمة" },
  madinah: { th: "มะดีนะฮ์", en: "Madinah", ar: "المدينة المنورة" },
  train: { th: "รถไฟฮะเราะมัยน์ ~2.5 ชม.", en: "Haramain train ~2.5 h", ar: "قطار الحرمين ~٢٫٥ ساعة" },
  railCalc: { th: "ค่าใช้จ่าย", en: "Cost", ar: "التكلفة" },
  railWhy: { th: "ทำไมต้องเรา", en: "Why us", ar: "لماذا نحن" },
} satisfies Record<string, L>;

export const SCENES: StoryScene[] = [
  {
    id: "home",
    rail: { th: "เตรียมตัว", en: "Prepare", ar: "الاستعداد" },
    kicker: { th: "บทที่ 1 · ก่อนออกเดินทาง", en: "Chapter 1 · Before you go", ar: "الفصل الأول · قبل السفر" },
    title: { th: "เตรียมตัวที่บ้าน", en: "Preparing at Home", ar: "الاستعداد في المنزل" },
    lead: {
      th: "อุมเราะห์เริ่มต้นที่หัวใจ ตั้งเจตนาให้บริสุทธิ์เพื่ออัลลอฮ์ ชำระหนี้สิน ขออภัยคนรอบข้าง แล้วจึงเตรียมสัมภาระ",
      en: "Umrah begins in the heart. Purify your intention for Allah, settle your debts and seek forgiveness from those around you — then pack.",
      ar: "تبدأ العمرة من القلب: أخلص النية لله، واقضِ ديونك، واطلب المسامحة ممن حولك، ثم جهّز أمتعتك.",
    },
    points: [
      { th: "พาสปอร์ตอายุเหลือไม่น้อยกว่า 6 เดือน และวีซ่าอุมเราะห์", en: "A passport valid for 6+ months and an Umrah visa", ar: "جواز سفر صالح لستة أشهر على الأقل وتأشيرة العمرة" },
      { th: "แนะนำให้ฉีดวัคซีนไข้หวัดใหญ่ก่อนเดินทาง", en: "A flu vaccination before you travel is recommended", ar: "يُنصح بأخذ لقاح الإنفلونزا قبل السفر" },
      { th: "ผู้ชาย: ชุดอิห์รอม 2 ชุด รองเท้าแตะแบบเปิดข้อเท้า และเข็มขัดใส่เงิน", en: "Men: two sets of ihram, open sandals and a money belt", ar: "للرجال: إحرامان، ونعال مكشوفة الكعبين، وحزام للنقود" },
      { th: "ผู้หญิง: เตรียมชุดสีดำที่หลวมและปกปิดเอาเราะฮ์ครบ", en: "Women: loose black clothing that fully covers the awrah", ar: "للنساء: لباس أسود فضفاض ساتر للعورة" },
      { th: "กระเป๋าใบเล็กส่วนตัวสำหรับเก็บของมีค่า เช่น พาสปอร์ต เงิน และโทรศัพท์", en: "A small personal bag for valuables — passport, money and phone", ar: "حقيبة صغيرة خاصة للأغراض الثمينة كالجواز والنقود والهاتف" },
      { th: "ติดตั้งแอป Nusuk ไว้จองเข้าเราะเฎาะฮ์ที่มะดีนะฮ์", en: "Install the Nusuk app — needed to book the Rawdah in Madinah", ar: "ثبّت تطبيق «نسك» لحجز زيارة الروضة الشريفة" },
      { th: "ยาประจำตัว ครีมกันผิวเสียดสีแบบไม่มีน้ำหอม และขวดน้ำพกพา", en: "Personal medication, unscented anti-chafing cream and a water bottle", ar: "أدويتك الخاصة، وكريم غير معطّر ضد الاحتكاك، وقارورة ماء" },
    ],
  },
  {
    id: "airport",
    rail: { th: "สนามบิน", en: "Airport", ar: "المطار" },
    kicker: { th: "บทที่ 2 · สนามบิน", en: "Chapter 2 · The airport", ar: "الفصل الثاني · المطار" },
    title: { th: "สนามบินสุวรรณภูมิ", en: "Suvarnabhumi Airport, Bangkok", ar: "مطار سوفارنابومي، بانكوك" },
    lead: {
      th: "มาถึงสนามบินก่อนเวลาอย่างน้อย 3 ชั่วโมง เตรียมชุดอิห์รอมไว้ในกระเป๋าถือขึ้นเครื่อง เพื่อเปลี่ยนชุดบนเครื่องก่อนถึงเขตมีกอต แต่ยังไม่ต้องตั้งเนียต",
      en: "Arrive at least 3 hours early. Pack your ihram garments in your carry-on so you can change on the plane before the miqat — but don't make the intention yet.",
      ar: "احضر إلى المطار قبل ثلاث ساعات على الأقل، وضع ملابس الإحرام في حقيبة اليد لتلبسها في الطائرة قبل الميقات، دون أن تنوي بعد.",
    },
    points: [
      { th: "เช็กอินและโหลดกระเป๋า แยกชุดอิห์รอมไว้ในกระเป๋าถือขึ้นเครื่อง", en: "Check in and drop your bags — keep the ihram in your carry-on", ar: "أنهِ إجراءات السفر واحتفظ بملابس الإحرام في حقيبة اليد" },
      { th: "ละหมาดที่ห้องละหมาดในสนามบินก่อนขึ้นเครื่อง", en: "Pray in the airport prayer room before boarding", ar: "صلِّ في مصلى المطار قبل الصعود إلى الطائرة" },
      { th: "บินตรงไปเจดดาห์ประมาณ 9 ชั่วโมง หรือเลือกเที่ยวบินที่ต่อเครื่องที่ตะวันออกกลาง", en: "Around 9 hours direct to Jeddah, or connect through a Gulf hub", ar: "نحو تسع ساعات مباشرة إلى جدة، أو عبر الترانزيت في الخليج" },
    ],
    facts: [
      { k: { th: "ถึงสนามบิน", en: "Arrive", ar: "الحضور" }, v: { th: "ก่อน 3 ชม.", en: "3 h early", ar: "قبل ٣ ساعات" } },
      { k: { th: "บินตรง", en: "Direct", ar: "مباشر" }, v: { th: "~9 ชม.", en: "~9 h", ar: "~٩ ساعات" } },
    ],
  },
  {
    id: "miqat",
    rail: { th: "มีกอต", en: "Miqat", ar: "الميقات" },
    kicker: { th: "บทที่ 3 · มีกอต", en: "Chapter 3 · The Miqat", ar: "الفصل الثالث · الميقات" },
    title: { th: "ครองอิห์รอมบนเครื่องบิน", en: "Entering Ihram in the Air", ar: "الإحرام في الطائرة" },
    rule: RULES.rukn,
    lead: {
      th: "ก่อนเครื่องบินผ่านเขตมีกอต ลูกเรือจะประกาศให้ทราบ ให้ตั้งเจตนา (เนียต) เข้าอุมเราะห์ แล้วเริ่มกล่าวตัลบียะฮ์ นับจากนาทีนี้คุณอยู่ในสภาวะอิห์รอมแล้ว",
      en: "Before the plane crosses the miqat, the crew will announce it. Make your intention for Umrah and begin the Talbiyah — from this moment you are in the state of ihram.",
      ar: "قبل أن تعبر الطائرة الميقات يُعلن الطاقم ذلك، فانوِ العمرة وابدأ التلبية، ومن هذه اللحظة أنت مُحرِم.",
    },
    points: [
      { th: "ห้ามใช้น้ำหอม ตัดผม ตัดเล็บ", en: "No perfume, no cutting hair, no clipping nails", ar: "يُمنع التطيّب وقصّ الشعر وتقليم الأظافر" },
      { th: "ผู้ชาย: ห้ามสวมเสื้อผ้าที่ตัดเย็บ รวมถึงกางเกงใน และห้ามคลุมศีรษะ", en: "Men: no stitched clothing — underwear included — and no head covering", ar: "الرجال: لا مخيط ولو كان لباسًا داخليًا، ولا تغطية للرأس" },
      { th: "ผู้หญิง: ห้ามสวมนิกอบและถุงมือ", en: "Women: no niqab and no gloves", ar: "النساء: لا نقاب ولا قفازين" },
      { th: "ห้ามมีเพศสัมพันธ์ และห้ามสัมผัสคู่ครองด้วยอารมณ์ใคร่", en: "No sexual relations and no intimate touching between spouses", ar: "لا جماع ولا مباشرة بشهوة" },
      { th: "ห้ามทะเลาะวิวาท ห้ามล่าสัตว์ และห้ามประกอบพิธีนิกาห์", en: "No quarrelling, no hunting and no marriage contracts", ar: "لا جدال ولا صيد ولا عقد نكاح" },
    ],
    duas: [
      {
        label: { th: "เนียตเข้าอุมเราะห์", en: "Intention for Umrah", ar: "نية العمرة" },
        ar: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
        tr: { th: "ลับบัยกัลลอฮุมมะ อุมเราะตัน", en: "Labbayka Allāhumma ʿumratan" },
        mn: { th: "ข้าพเจ้าตอบรับการเรียกของพระองค์ โอ้อัลลอฮ์ เพื่อทำอุมเราะห์", en: "Here I am, O Allah, for Umrah." },
      },
      {
        label: { th: "ตัลบียะฮ์ (กล่าวซ้ำบ่อย ๆ ตลอดทาง)", en: "Talbiyah (repeat often along the way)", ar: "التلبية (تُردَّد كثيرًا طوال الطريق)" },
        ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
        tr: {
          th: "ลับบัยกัลลอฮุมมะ ลับบัยก์ ลับบัยกะ ลาชะรีกะ ละกะ ลับบัยก์ อินนัลฮัมดะ วันนิอ์มะตะ ละกะ วัลมุลก์ ลาชะรีกะ ละก์",
          en: "Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, innal-ḥamda wan-niʿmata laka wal-mulk, lā sharīka lak",
        },
        mn: {
          th: "ข้าพเจ้าพร้อมตอบรับพระองค์ โอ้อัลลอฮ์ พระองค์ไม่มีภาคี แท้จริงการสรรเสริญ ความโปรดปราน และอำนาจเป็นของพระองค์ พระองค์ไม่มีภาคีใด ๆ",
          en: "Here I am, O Allah, here I am. You have no partner, here I am. All praise, grace and dominion are Yours. You have no partner.",
        },
      },
    ],
  },
  {
    id: "road",
    rail: { th: "สู่มักกะฮ์", en: "To Makkah", ar: "إلى مكة" },
    kicker: { th: "บทที่ 4 · สู่มักกะฮ์", en: "Chapter 4 · To Makkah", ar: "الفصل الرابع · إلى مكة" },
    title: { th: "จากเจดดาห์สู่นครมักกะฮ์", en: "From Jeddah to Makkah", ar: "من جدة إلى مكة المكرمة" },
    lead: {
      th: "ลงเครื่องที่ท่าอากาศยานนานาชาติคิงอับดุลอะซีซ ผ่าน ตม. แล้วขึ้นรถสู่มักกะฮ์ ระยะทางราว 80 กม. ใช้เวลาประมาณ 1–1.5 ชั่วโมง กล่าวตัลบียะฮ์ไปตลอดทาง",
      en: "Land at King Abdulaziz International Airport, clear immigration and board the coach to Makkah — about 80 km, roughly 1–1.5 hours. Keep reciting the Talbiyah all the way.",
      ar: "تهبط في مطار الملك عبدالعزيز الدولي، وتنهي الجوازات، ثم تركب الحافلة إلى مكة؛ نحو ٨٠ كم في ساعة إلى ساعة ونصف، مع ترديد التلبية طوال الطريق.",
    },
    points: [
      { th: "ทีมงานของเรารอรับที่สนามบิน ดูแลเรื่องกระเป๋าและรถให้", en: "Our team meets you at arrivals and takes care of luggage and transport", ar: "يستقبلك فريقنا في صالة الوصول ويتولّى الأمتعة والنقل" },
      { th: "เช็กอินโรงแรม พักผ่อนให้เพียงพอก่อนเริ่มประกอบพิธีอุมเราะห์", en: "Check in to the hotel and rest well before performing Umrah", ar: "سجّل في الفندق وخذ قسطًا من الراحة قبل أداء العمرة" },
      { th: "อาบน้ำละหมาด (วุฎูอ์) ก่อนไปมัสยิด เพื่อละหมาดและเริ่มประกอบพิธีอุมเราะห์", en: "Make wudu before heading to the mosque, to pray and begin the rites of Umrah", ar: "توضّأ قبل الذهاب إلى المسجد لتصلّي وتبدأ مناسك العمرة" },
    ],
    facts: [
      { k: { th: "ระยะทาง", en: "Distance", ar: "المسافة" }, v: { th: "~80 กม.", en: "~80 km", ar: "~٨٠ كم" } },
      { k: { th: "เวลา", en: "Time", ar: "المدة" }, v: { th: "1–1.5 ชม.", en: "1–1.5 h", ar: "١–١٫٥ ساعة" } },
    ],
  },
  {
    id: "haram",
    rail: { th: "อัลฮะรอม", en: "Al-Haram", ar: "الحرم" },
    kicker: { th: "บทที่ 5 · มัสยิดอัลฮะรอม", en: "Chapter 5 · Al-Masjid al-Haram", ar: "الفصل الخامس · المسجد الحرام" },
    title: { th: "มองเห็นกะอ์บะฮ์ครั้งแรก", en: "Your First Sight of the Kaaba", ar: "النظرة الأولى إلى الكعبة" },
    rule: RULES.sunnah,
    lead: {
      th: "ก้าวเท้าขวาเข้ามัสยิดพร้อมกล่าวดุอาอ์ เมื่อมองเห็นกะอ์บะฮ์ ให้ยกมือขอดุอาอ์ตามที่ปรารถนา",
      en: "Step in with your right foot while reciting the supplication. When you see the Kaaba, raise your hands and ask Allah for whatever you wish.",
      ar: "ادخل بقدمك اليمنى مع دعاء دخول المسجد، وإذا رأيت الكعبة فارفع يديك وادعُ بما شئت.",
    },
    points: [
      { th: "หยุดกล่าวตัลบียะฮ์เมื่อเริ่มตอวาฟ", en: "Stop reciting the Talbiyah once tawaf begins", ar: "تُقطع التلبية عند بدء الطواف" },
      { th: "ผู้ชายเปิดไหล่ขวา (อิฎฏิบาอ์) ก่อนเริ่มตอวาฟ", en: "Men uncover the right shoulder (idtiba') before tawaf", ar: "يضطبع الرجل بكشف كتفه الأيمن قبل الطواف" },
      { th: "จำหมายเลขประตูที่เข้ามา เช่น ประตูคิงอับดุลอะซีซ ไว้นัดพบกับครอบครัว", en: "Remember the gate you came in by (e.g. King Abdulaziz Gate) to regroup with family", ar: "احفظ رقم الباب الذي دخلت منه، كباب الملك عبدالعزيز، للالتقاء بأهلك" },
    ],
    duas: [
      {
        label: { th: "ดุอาอ์เข้ามัสยิด", en: "Entering the mosque", ar: "دعاء دخول المسجد" },
        ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        tr: { th: "อัลลอฮุมมัฟตะห์ ลี อับวาบะ เราะห์มะติก", en: "Allāhumma-ftaḥ lī abwāba raḥmatik" },
        mn: { th: "โอ้อัลลอฮ์ ขอพระองค์ทรงเปิดประตูแห่งความเมตตาของพระองค์แก่ข้าพเจ้า", en: "O Allah, open for me the gates of Your mercy." },
      },
      {
        label: { th: "เมื่อมองเห็นกะอ์บะฮ์ครั้งแรก", en: "On first seeing the Kaaba", ar: "عند رؤية الكعبة" },
        ar: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفاً وَتَعْظِيماً وَتَكْرِيماً وَمَهَابَةً",
        tr: { th: "อัลลอฮุมมะ ซิด ฮาซัลบัยตะ ตัชรีฟัน วะตะอ์ซีมัน วะตักรีมัน วะมะฮาบะฮ์", en: "Allāhumma zid hādhal-bayta tashrīfan wa taʿẓīman wa takrīman wa mahābah" },
        mn: { th: "โอ้อัลลอฮ์ ขอทรงเพิ่มพูนเกียรติ ความยิ่งใหญ่ ความสูงส่ง และความเกรงขามให้แก่บ้านหลังนี้", en: "O Allah, increase this House in honour, greatness, reverence and awe." },
      },
    ],
  },
  {
    id: "tawaf",
    rail: { th: "ตอวาฟ", en: "Tawaf", ar: "الطواف" },
    kicker: { th: "บทที่ 6 · ตอวาฟ", en: "Chapter 6 · Tawaf", ar: "الفصل السادس · الطواف" },
    title: { th: "เวียนรอบกะอ์บะฮ์ 7 รอบ", en: "Seven Circuits Around the Kaaba", ar: "سبعة أشواط حول الكعبة" },
    rule: RULES.rukn,
    lead: {
      th: "เริ่มที่แนวหินดำ (ฮะญะรุลอัสวัด) ให้กะอ์บะฮ์อยู่ทางซ้าย เดินทวนเข็มนาฬิกาจนครบ 7 รอบ ทุกครั้งที่ผ่านหินดำ ให้ยกมือขวาไปทางหินดำแล้วกล่าวตักบีร",
      en: "Start in line with the Black Stone (al-Hajar al-Aswad), keep the Kaaba on your left and walk anti-clockwise for seven rounds. Each time you pass the Black Stone, gesture towards it with your right hand and say the takbir.",
      ar: "ابدأ من محاذاة الحجر الأسود، واجعل الكعبة عن يسارك، وطُف سبعة أشواط، وكلما حاذيت الحجر أشرت إليه بيمينك وكبّرت.",
    },
    points: [
      { th: "ผู้ชายเดินเร็วด้วยก้าวสั้น ๆ (ร็อมล์) ใน 3 รอบแรก", en: "Men walk briskly with short steps (raml) in the first three rounds", ar: "يرمل الرجل في الأشواط الثلاثة الأولى" },
      { th: "ไม่มีดุอาอ์เฉพาะของแต่ละรอบ ขอดุอาอ์ด้วยภาษาของตัวเองได้", en: "There is no set du'a for each round — supplicate in your own words and language", ar: "لا يوجد دعاء مخصّص لكل شوط، فادعُ بما شئت وبأي لغة" },
      { th: "ถ้าไม่แน่ใจว่าเดินไปกี่รอบแล้ว ให้นับตามจำนวนที่น้อยกว่า", en: "If unsure of the count, go with the lower number", ar: "إذا شككت في العدد فابنِ على الأقل" },
    ],
    duas: [
      {
        label: { th: "เมื่อผ่านแนวหินดำ (ทุกรอบ)", en: "At the Black Stone (every round)", ar: "عند الحجر الأسود (كل شوط)" },
        ar: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
        tr: { th: "บิสมิลลาฮิ วัลลอฮุ อักบัร", en: "Bismillāhi wallāhu akbar" },
        mn: { th: "ด้วยพระนามของอัลลอฮ์ และอัลลอฮ์ทรงยิ่งใหญ่ที่สุด", en: "In the name of Allah, and Allah is the Greatest." },
      },
      {
        label: { th: "ระหว่างรุก่นยะมานีถึงหินดำ", en: "Between the Yemeni Corner and the Black Stone", ar: "بين الركن اليماني والحجر الأسود" },
        ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        tr: { th: "ร็อบบะนา อาตินา ฟิดดุนยา ฮะสะนะตัน วะฟิลอาคิเราะติ ฮะสะนะตัน วะกินา อะซาบันนาร", en: "Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā ʿadhāban-nār" },
        mn: { th: "โอ้พระเจ้าของเรา ขอทรงประทานความดีงามแก่เราทั้งในโลกนี้และโลกหน้า และทรงปกป้องเราจากการลงโทษแห่งไฟนรก", en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire." },
      },
    ],
  },
  {
    id: "maqam",
    rail: { th: "มะกอม", en: "Maqam", ar: "المقام" },
    kicker: { th: "บทที่ 7 · มะกอมอิบรอฮีม", en: "Chapter 7 · Maqam Ibrahim", ar: "الفصل السابع · مقام إبراهيم" },
    title: { th: "ละหมาด 2 ร็อกอะฮ์ และดื่มน้ำซัมซัม", en: "Two Rak'ahs and Zamzam", ar: "ركعتا الطواف وماء زمزم" },
    rule: RULES.sunnah,
    lead: {
      th: "หลังตอวาฟ ผู้ชายคลุมไหล่กลับเหมือนเดิม แล้วละหมาดสุนนะฮ์ 2 ร็อกอะฮ์ด้านหลังมะกอมอิบรอฮีม ถ้าคนแน่นจะละหมาดตรงไหนในมัสยิดก็ได้ จากนั้นดื่มน้ำซัมซัมให้อิ่มและขอดุอาอ์",
      en: "After tawaf, men cover the shoulder again and pray two sunnah rak'ahs behind Maqam Ibrahim — anywhere in the mosque if it is crowded. Then drink Zamzam to your fill with a du'a.",
      ar: "بعد الطواف يغطّي الرجل كتفه ويصلّي ركعتين خلف مقام إبراهيم، أو في أي مكان من المسجد عند الزحام، ثم يشرب من زمزم ويتضلّع ويدعو.",
    },
    points: [
      { th: "ร็อกอะฮ์แรกอ่านซูเราะฮ์อัลกาฟิรูน ร็อกอะฮ์ที่สองอ่านอัลอิคลาศ", en: "Recite al-Kafirun in the first rak'ah and al-Ikhlas in the second", ar: "يقرأ في الأولى «الكافرون» وفي الثانية «الإخلاص»" },
      { th: "ท่านนบี ﷺ กล่าวว่า «น้ำซัมซัมนั้นเป็นไปตามเจตนาของผู้ดื่ม»", en: "The Prophet ﷺ said: “Zamzam is for whatever it is drunk for.”", ar: "قال النبي ﷺ: «ماءُ زمزمَ لِما شُرِبَ له»" },
      { th: "นอกจากดื่มแล้ว ให้ใช้น้ำซัมซัมล้างหน้าและรดศีรษะด้วย", en: "Besides drinking it, wash your face and pour some Zamzam over your head", ar: "واغسل وجهك بماء زمزم وصبّ منه على رأسك" },
    ],
    duas: [
      {
        label: { th: "ดุอาอ์ดื่มน้ำซัมซัม", en: "When drinking Zamzam", ar: "دعاء شرب ماء زمزم" },
        ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً وَرِزْقاً وَاسِعاً وَشِفَاءً مِنْ كُلِّ دَاءٍ",
        tr: { th: "อัลลอฮุมมะ อินนี อัสอะลุกะ อิลมัน นาฟิอัน วะริซกอน วาซิอัน วะชิฟาอัน มิน กุลลิ ดาอ์", en: "Allāhumma innī asʾaluka ʿilman nāfiʿan, wa rizqan wāsiʿan, wa shifāʾan min kulli dāʾ" },
        mn: { th: "โอ้อัลลอฮ์ ข้าพเจ้าขอต่อพระองค์ซึ่งความรู้ที่เป็นประโยชน์ ปัจจัยยังชีพที่กว้างขวาง และการหายจากทุกโรค", en: "O Allah, I ask You for beneficial knowledge, abundant provision and healing from every illness." },
      },
    ],
  },
  {
    id: "sai",
    rail: { th: "สะอี", en: "Sa'i", ar: "السعي" },
    kicker: { th: "บทที่ 8 · สะอี", en: "Chapter 8 · Sa'i", ar: "الفصل الثامن · السعي" },
    title: { th: "เดินระหว่างเศาะฟาและมัรวะฮ์ 7 เที่ยว", en: "Seven Laps Between Safa and Marwah", ar: "سبعة أشواط بين الصفا والمروة" },
    rule: RULES.rukn,
    lead: {
      th: "เป็นการรำลึกถึงท่านหญิงฮาญัรที่วิ่งหาน้ำให้บุตร เริ่มที่เศาะฟาและจบที่มัรวะฮ์ ขาไปนับหนึ่งเที่ยว ขากลับนับอีกหนึ่งเที่ยว รวม 7 เที่ยว ระยะทางรวมประมาณ 3 กม.",
      en: "Retrace Hajar's search for water for her son. Begin at Safa and end at Marwah — each one-way trip is one lap, seven in all, roughly 3 km.",
      ar: "استحضر سعي هاجر بحثًا عن الماء لابنها؛ ابدأ بالصفا واختم بالمروة، فالذهاب شوط والعودة شوط، سبعة أشواط بنحو ٣ كم.",
    },
    points: [
      { th: "ช่วงไฟเขียว ผู้ชายวิ่งเหยาะ ๆ ส่วนผู้หญิงเดินตามปกติ", en: "Between the green lights men jog lightly; women walk normally", ar: "بين العلمين الأخضرين يُسرع الرجل، وتمشي المرأة مشيًا عاديًا" },
      { th: "บนเนินเขา หันหน้าไปทางกะอ์บะฮ์ ยกมือ กล่าวซิกิร 3 ครั้งสลับกับดุอาอ์", en: "On each hill face the Kaaba, raise your hands and repeat the dhikr three times between your own du'as", ar: "على كل جبل استقبل الكعبة وارفع يديك وردّد الذكر ثلاثًا مع الدعاء" },
      { th: "สะอีไม่บังคับต้องมีน้ำละหมาด แต่ถ้ามีจะดีกว่า", en: "Wudu isn't required for sa'i, but it is better to have it", ar: "لا تُشترط الطهارة للسعي لكنها أفضل" },
    ],
    duas: [
      {
        label: { th: "เมื่อใกล้ถึงเนินเศาะฟา (ครั้งแรกเท่านั้น) อ่านอายะฮ์อัลกุรอาน", en: "Approaching Safa (first time only) — recite the Qur'anic verse", ar: "عند الدنوّ من الصفا (أول مرة) — تلاوة الآية" },
        ar: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
        tr: { th: "อินนัศเศาะฟา วัลมัรวะตะ มิน ชะอาอิริลลาฮ์", en: "Innaṣ-ṣafā wal-marwata min shaʿāʾirillāh" },
        mn: { th: "แท้จริงเศาะฟาและมัรวะฮ์เป็นส่วนหนึ่งจากเครื่องหมายแห่งอัลลอฮ์ (อัลบะเกาะเราะฮ์ 2:158)", en: "Indeed, Safa and Marwah are among the symbols of Allah. (al-Baqarah 2:158)" },
      },
      {
        label: { th: "กล่าวต่อหลังจากอ่านอายะฮ์อัลกุรอานข้างต้น", en: "Then say, after reciting the verse", ar: "ثم يقول بعد تلاوة الآية" },
        ar: "أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
        tr: { th: "อับดะอุ บิมา บะดะอัลลอฮุ บิฮ์", en: "Abdaʾu bimā badaʾallāhu bih" },
        mn: { th: "ข้าพเจ้าขอเริ่มจากที่อัลลอฮ์ทรงเริ่มไว้", en: "I begin with what Allah began with." },
      },
      {
        label: { th: "บนเนินเศาะฟาและมัรวะฮ์ หันหน้าไปทางกะอ์บะฮ์ (กล่าว 3 ครั้ง สลับกับขอดุอาอ์)", en: "On Safa and Marwah, facing the Kaaba (three times, with your own du'as in between)", ar: "على الصفا والمروة مستقبلًا الكعبة (ثلاثًا يتخلّلها الدعاء)" },
        ar: "اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
        tr: { th: "อัลลอฮุอักบัร ลาอิลาฮะอิลลัลลอฮุ วะห์ดะฮู ลาชะรีกะละฮ์ ละฮุลมุลกุ วะละฮุลฮัมด์ วะฮุวะ อะลา กุลลิ ชัยอิน เกาะดีร ลาอิลาฮะอิลลัลลอฮุ วะห์ดะฮ์ อันญะซะ วะอ์ดะฮ์ วะนะศ็อร็อ อับดะฮ์ วะฮะซะมัลอะห์ซาบะ วะห์ดะฮ์", en: "Allāhu akbar, lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa ʿalā kulli shayʾin qadīr. Lā ilāha illallāhu waḥdah, anjaza waʿdah, wa naṣara ʿabdah, wa hazamal-aḥzāba waḥdah" },
        mn: { th: "อัลลอฮ์ทรงยิ่งใหญ่ ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์เพียงองค์เดียว ไม่มีภาคี อำนาจและการสรรเสริญเป็นของพระองค์ และพระองค์ทรงเดชานุภาพเหนือทุกสิ่ง ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์เพียงองค์เดียว พระองค์ทรงทำให้สัญญาของพระองค์เป็นจริง ทรงช่วยเหลือบ่าวของพระองค์ และทรงทำให้กองทัพพันธมิตรพ่ายแพ้โดยลำพังพระองค์", en: "Allah is the Greatest. There is no god but Allah alone, without partner. His is the dominion and His is the praise, and He has power over all things. There is no god but Allah alone; He fulfilled His promise, gave victory to His servant and defeated the confederates alone." },
      },
    ],
  },
  {
    id: "halq",
    rail: { th: "ตะหัลลุล", en: "Tahallul", ar: "التحلل" },
    kicker: { th: "บทที่ 9 · ตะหัลลุล", en: "Chapter 9 · Tahallul", ar: "الفصل التاسع · التحلل" },
    title: { th: "โกนหรือตัดผม แล้วอุมเราะห์ก็สมบูรณ์", en: "Shave or Trim — Umrah Complete", ar: "الحلق أو التقصير — تمّت العمرة" },
    rule: RULES.wajib,
    lead: {
      th: "ผู้ชายโกนศีรษะ (ซึ่งประเสริฐกว่า) หรือตัดให้สั้นทั่วศีรษะ ผู้หญิงรวบผมแล้วตัดปลายยาวประมาณหนึ่งข้อนิ้ว เมื่อเสร็จแล้ว ข้อห้ามของอิห์รอมทั้งหมดก็สิ้นสุดลง",
      en: "Men shave the head (more virtuous) or trim evenly all over; women gather their hair and cut about a fingertip's length. With this, every ihram restriction is lifted.",
      ar: "يحلق الرجل رأسه وهو الأفضل، أو يقصّر من جميعه، وتجمع المرأة شعرها وتقصّ قدر أنملة، وبذلك يحلّ كل ما حرُم بالإحرام.",
    },
    points: [
      { th: "ผู้หญิงควรตัดผมในที่พักหรือในที่ส่วนตัว", en: "Women should trim their hair in private", ar: "يُستحب أن تقصّر المرأة في مكان مستور" },
      { th: "มีร้านตัดผมอยู่ใกล้มัรวะฮ์และรอบมัสยิด", en: "Barbers are located near Marwah and around the mosque", ar: "تتوفر محلات الحلاقة قرب المروة وحول المسجد" },
    ],
    duas: [
      {
        label: { th: "ดุอาอ์ที่ท่านนบี ﷺ ขอให้ผู้โกนศีรษะ", en: "The Prophet's ﷺ du'a for those who shave", ar: "دعاء النبي ﷺ للمحلّقين" },
        ar: "اللَّهُمَّ ارْحَمِ الْمُحَلِّقِينَ",
        tr: { th: "อัลลอฮุมมัรฮะมิล มุฮัลลิกีน", en: "Allāhummar-ḥamil-muḥalliqīn" },
        mn: { th: "โอ้อัลลอฮ์ ขอทรงเมตตาแก่บรรดาผู้ที่โกนศีรษะ", en: "O Allah, have mercy on those who shave their heads." },
      },
    ],
  },
  {
    id: "ziyarah",
    rail: { th: "ซิยาเราะฮ์", en: "Ziyarah", ar: "الزيارة" },
    kicker: { th: "บทที่ 10 · ซิยาเราะฮ์", en: "Chapter 10 · Ziyarah", ar: "الفصل العاشر · الزيارة" },
    title: { th: "เยือนสถานที่ประวัติศาสตร์ มักกะฮ์–มะดีนะฮ์", en: "The Sacred Sites of Makkah & Madinah", ar: "زيارة المعالم في مكة والمدينة" },
    lead: {
      th: "หลังทำอุมเราะห์เสร็จ ใช้เวลาที่เหลือเยือนสถานที่สำคัญในประวัติศาสตร์อิสลาม แล้วเดินทางต่อไปมะดีนะฮ์ด้วยรถไฟความเร็วสูงฮะเราะมัยน์ ใช้เวลาประมาณ 2–2.5 ชั่วโมง",
      en: "With your Umrah complete, spend the remaining days at the landmarks of Islamic history, then travel on to Madinah by the Haramain high-speed train in about 2–2.5 hours.",
      ar: "بعد إتمام العمرة اغتنم بقية أيامك في زيارة معالم التاريخ الإسلامي، ثم انتقل إلى المدينة المنورة بقطار الحرمين السريع في نحو ساعتين إلى ساعتين ونصف.",
    },
    points: [],
    sites: [
      { city: "makkah", name: { th: "ญะบัลนูร · ถ้ำฮิรออ์", en: "Jabal al-Nour · Cave of Hira", ar: "جبل النور · غار حراء" }, d: { th: "สถานที่ที่วะห์ยูแรกถูกประทานลงมา", en: "Where the first revelation descended", ar: "موضع نزول أول الوحي" } },
      { city: "makkah", name: { th: "ญะบัลษูร", en: "Jabal Thawr", ar: "جبل ثور" }, d: { th: "ถ้ำที่ท่านนบี ﷺ และอบูบักรหลบซ่อนระหว่างฮิจญ์เราะฮ์", en: "The cave where the Prophet ﷺ and Abu Bakr sheltered during the Hijrah", ar: "الغار الذي اختبأ فيه النبي ﷺ وأبو بكر في الهجرة" } },
      { city: "makkah", name: { th: "อะเราะฟะฮ์ · มุซดะลิฟะฮ์ · มินา", en: "Arafat · Muzdalifah · Mina", ar: "عرفات · مزدلفة · منى" }, d: { th: "สถานที่ประกอบพิธีฮัจญ์", en: "The sites of the Hajj rites", ar: "مشاعر الحج" } },
      { city: "madinah", name: { th: "มัสยิดนะบะวีย์ · เราะเฎาะฮ์", en: "Masjid an-Nabawi · Rawdah", ar: "المسجد النبوي · الروضة" }, d: { th: "ละหมาดในมัสยิดท่านนบี ﷺ และกล่าวสลาม (จองเราะเฎาะฮ์ผ่านแอป Nusuk)", en: "Pray in the Prophet's ﷺ mosque and send salam (book the Rawdah via Nusuk)", ar: "الصلاة في مسجد النبي ﷺ والسلام عليه (احجز الروضة عبر «نسك»)" } },
      { city: "madinah", name: { th: "มัสยิดกุบาอ์", en: "Masjid Quba", ar: "مسجد قباء" }, d: { th: "ละหมาดที่นี่ได้ผลบุญเทียบเท่าอุมเราะห์ (อิบนุมาญะฮ์)", en: "Praying here carries the reward of an Umrah (Ibn Majah)", ar: "الصلاة فيه كأجر عمرة (ابن ماجه)" } },
      { city: "madinah", name: { th: "ภูเขาอุฮุด", en: "Mount Uhud", ar: "جبل أحد" }, d: { th: "สมรภูมิอุฮุด และสุสานท่านฮัมซะฮ์", en: "The battlefield of Uhud and the graves of Hamzah and the martyrs", ar: "موقع غزوة أحد ومقبرة الشهداء وحمزة رضي الله عنه" } },
      { city: "madinah", name: { th: "มัสยิดกิบลาตัยน์", en: "Masjid al-Qiblatayn", ar: "مسجد القبلتين" }, d: { th: "มัสยิดที่มีการเปลี่ยนทิศกิบลัตสู่กะอ์บะฮ์", en: "Where the qiblah was turned towards the Kaaba", ar: "حيث تحوّلت القبلة إلى الكعبة" } },
    ],
  },
];

export const WHY = {
  eyebrow: { th: "ทำไมต้อง Umrah Thailand", en: "Why Umrah Thailand", ar: "لماذا عمرة تايلاند" },
  title: { th: "เดินทางไปกับคนที่อยู่กับคุณจริง ทุกขั้นตอน", en: "Travel with people who are truly with you, every step", ar: "سافر مع من يرافقك فعلًا في كل خطوة" },
  items: [
    {
      t: { th: "ทีมงานประจำในซาอุดีอาระเบีย", en: "Our own team in Saudi Arabia", ar: "فريقنا الخاص في السعودية" },
      d: { th: "ถ้ามีปัญหาระหว่างเดินทาง ทีมงานในพื้นที่ช่วยได้ทันที ไม่ต้องรอติดต่อกลับมาที่ไทย", en: "If anything happens on the road, our local team is there right away — no waiting on calls to Thailand.", ar: "إن واجهتك مشكلة في الطريق فإن فريقنا المحلي حاضر فورًا، دون انتظار التواصل مع تايلاند." },
    },
    {
      t: { th: "ประสบการณ์มากกว่า 10 ปี", en: "10+ years of experience", ar: "خبرة تتجاوز ١٠ سنوات" },
      d: { th: "ดูแลผู้แสวงบุญชาวไทยมานานกว่าสิบปี มีผลงานที่จับต้องได้ ไม่ใช่แค่คำสัญญา", en: "More than a decade serving Thai pilgrims — a real track record, not just promises.", ar: "أكثر من عقد في خدمة المعتمرين التايلانديين؛ إنجازات ملموسة لا مجرد وعود." },
    },
    {
      t: { th: "มีตัวตนจริง ออกใบเสร็จทุกครั้ง", en: "A real, accountable company", ar: "شركة حقيقية موثوقة" },
      d: { th: "มีสำนักงานที่อยู่จริง ออกใบเสร็จให้ทุกธุรกรรม โปร่งใส ตรวจสอบได้", en: "A real office address and a receipt for every transaction — transparent and verifiable.", ar: "عنوان حقيقي وإيصال لكل معاملة، بشفافية تامة." },
    },
    {
      t: { th: "ครบจบในที่เดียว", en: "Everything in one place", ar: "كل شيء في مكان واحد" },
      d: { th: "วีซ่า ตั๋วเครื่องบิน โรงแรมใกล้ฮะรอม รถรับส่ง และไกด์ เราจัดการให้ครบ", en: "Visa, flights, hotels near the Haram, transfers and guides — all arranged for you.", ar: "التأشيرة والطيران والفنادق القريبة من الحرم والنقل والمرشدون، نرتّبها لك كاملة." },
    },
  ],
  ctaTitle: { th: "ปรึกษาฟรี ไม่มีข้อผูกมัด", en: "Free consultation, no obligation", ar: "استشارة مجانية دون أي التزام" },
  ctaSub: { th: "คุยกับทีมงานเพื่อวางแผนอุมเราะห์ที่เหมาะกับคุณและครอบครัว", en: "Talk to our team and plan the Umrah that fits you and your family.", ar: "تحدّث مع فريقنا لتخطيط عمرة تناسبك وتناسب عائلتك." },
  contact: { th: "ส่งข้อความหาเรา", en: "Send us a message", ar: "راسلنا" },
  online: { th: "ปรึกษาฟรี", en: "Free of charge", ar: "مجانًا" },
};
