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

export const seedArticles: Article[] = [];

export const seedSponsors: Sponsor[] = [
  { id: 1, n: "อัล-อามีน ทราเวล", r: "★ 4.9 · ใบอนุญาตเลขที่ 11/xxxxx", d: "แพ็กเกจอุมเราะห์ครบวงจร ที่พักใกล้ฮะรอม มุตเฏาวิฟดูแลตลอดทริป", i: "A", url: "#", active: true },
  { id: 2, n: "นูร ฮัจญ์ แอนด์ อุมเราะห์", r: "★ 4.8 · สมาชิก ATTA", d: "กรุ๊ปเล็ก ดูแลใกล้ชิด มีโปรแกรมสำหรับครอบครัวและผู้สูงอายุ", i: "N", url: "#", active: true },
  { id: 3, n: "บัยตุลลอฮ์ ทัวร์", r: "★ 4.9 · 15 ปีประสบการณ์", d: "เชี่ยวชาญแพ็กเกจรอมฎอน ที่พัก 5 ดาว เดินถึงมัสยิดฮะรอม", i: "B", url: "#", active: true },
];
