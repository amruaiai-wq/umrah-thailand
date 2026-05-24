import { Article, Sponsor } from "@/lib/types";
import { ARTICLE_BODIES } from "@/data/articles-content";

export const GRADIENTS = [
  "linear-gradient(135deg,#12294C,#1B335A)",
  "linear-gradient(135deg,#0E7C5A,#12294C)",
  "linear-gradient(135deg,#1B335A,#0a1426)",
  "linear-gradient(135deg,#12294C,#0E7C5A)",
  "linear-gradient(135deg,#0a1426,#1B335A)",
  "linear-gradient(135deg,#1B335A,#12294C)",
];

export const CATEGORIES = ["คู่มืออุมเราะห์", "เตรียมตัวฮัจญ์", "เคล็ดลับการเดินทาง"];

const rawArticles: Article[] = [
  { id: 1, slug: "dua-during-tawaf", cat: "คู่มืออุมเราะห์", date: "15 พ.ค. 2026", title: "ดุอาอ์สำคัญที่ควรท่องระหว่างการตะวาฟ", ex: "รวมบทดุอาอ์และซิกรุลลอฮ์ที่แนะนำให้อ่านในแต่ละช่วงของการเวียนรอบกะอ์บะฮ์", body: "ระหว่างการตะวาฟ ไม่มีดุอาอ์เฉพาะที่บังคับสำหรับแต่ละรอบ ผู้แสวงบุญสามารถขอดุอาอ์และกล่าวซิกรุลลอฮ์ตามที่ปรารถนา อย่างไรก็ตามมีบางช่วงที่ท่านนบี ﷺ ได้กล่าวไว้...", img: GRADIENTS[0], published: true },
  { id: 2, slug: "prepare-body-mind-hajj", cat: "เตรียมตัวฮัจญ์", date: "10 พ.ค. 2026", title: "เตรียมร่างกายและจิตใจก่อนเดินทางไปฮัจญ์", ex: "การเตรียมสุขภาพ การออกกำลังกาย และการเตรียมจิตใจให้พร้อม", body: "ฮัจญ์เป็นการเดินทางที่ต้องใช้ทั้งกำลังกายและกำลังใจ การเตรียมตัวล่วงหน้าจึงสำคัญมาก...", img: GRADIENTS[1], published: true },
  { id: 3, slug: "umrah-packing-checklist", cat: "เคล็ดลับการเดินทาง", date: "5 พ.ค. 2026", title: "10 สิ่งที่ต้องเตรียมในกระเป๋าเดินทางอุมเราะห์", ex: "เช็กลิสต์ของใช้จำเป็น ตั้งแต่ผ้าอิหรอมจนถึงยาประจำตัว", body: "", img: GRADIENTS[2], published: true },
  { id: 4, slug: "umrah-vs-hajj", cat: "คู่มืออุมเราะห์", date: "28 เม.ย. 2026", title: "ความแตกต่างระหว่างอุมเราะห์และฮัจญ์", ex: "อธิบายความหมาย ช่วงเวลา และขั้นตอนที่แตกต่างกันของทั้งสองพิธี", body: "", img: GRADIENTS[3], published: true },
  { id: 5, slug: "health-in-makkah-heat", cat: "เคล็ดลับการเดินทาง", date: "20 เม.ย. 2026", title: "วิธีดูแลสุขภาพในอากาศร้อนที่นครมักกะฮ์", ex: "คำแนะนำการดื่มน้ำ ป้องกันแดด และพักผ่อนให้พร้อมประกอบพิธี", body: "อากาศที่มักกะฮ์ร้อนจัด การดูแลสุขภาพจึงเป็นเรื่องสำคัญ...", img: GRADIENTS[4], published: true },
  { id: 6, slug: "types-of-hajj", cat: "เตรียมตัวฮัจญ์", date: "12 เม.ย. 2026", title: "ทำความเข้าใจประเภทของฮัจญ์: ตะมัตตุอ์ กิรอน อิฟรอด", ex: "อธิบายความแตกต่างของฮัจญ์ทั้ง 3 ประเภท และข้อควรรู้ของแต่ละแบบ", body: "", img: GRADIENTS[5], published: true },
];

// ใส่เนื้อหาฉบับเต็ม (HTML) ให้บทความที่มีใน ARTICLE_BODIES
export const seedArticles: Article[] = rawArticles.map((a) =>
  ARTICLE_BODIES[a.slug] ? { ...a, body: ARTICLE_BODIES[a.slug].trim() } : a
);

export const seedSponsors: Sponsor[] = [
  { id: 1, n: "อัล-อามีน ทราเวล", r: "★ 4.9 · ใบอนุญาตเลขที่ 11/xxxxx", d: "แพ็กเกจอุมเราะห์ครบวงจร ที่พักใกล้ฮะรอม มุตเฏาวิฟดูแลตลอดทริป", i: "A", url: "#", active: true },
  { id: 2, n: "นูร ฮัจญ์ แอนด์ อุมเราะห์", r: "★ 4.8 · สมาชิก ATTA", d: "กรุ๊ปเล็ก ดูแลใกล้ชิด มีโปรแกรมสำหรับครอบครัวและผู้สูงอายุ", i: "N", url: "#", active: true },
  { id: 3, n: "บัยตุลลอฮ์ ทัวร์", r: "★ 4.9 · 15 ปีประสบการณ์", d: "เชี่ยวชาญแพ็กเกจรอมฎอน ที่พัก 5 ดาว เดินถึงมัสยิดฮะรอม", i: "B", url: "#", active: true },
];
