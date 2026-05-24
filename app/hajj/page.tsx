import type { Metadata } from "next";
import Link from "next/link";
import JourneyAnimation from "@/components/JourneyAnimation";
import GuideSteps from "@/components/GuideSteps";
import SchemaHowTo from "@/components/SchemaHowTo";
import { hajjSteps, hajjStops } from "@/data/guides";

export const metadata: Metadata = {
  title: "วิธีทำฮัจญ์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน",
  description:
    "คู่มือการประกอบพิธีฮัจญ์ในวันที่ 8–13 ซุลฮิจญะฮ์ พร้อมดุอาอ์ภาษาอาหรับ คำอ่าน ความหมาย และหลักฐาน",
  alternates: { canonical: "/hajj" },
};

const milestoneKeys = ["mina", "arafat", "muzdalifah", "jamarat", "kaaba"];

export default function HajjPage() {
  return (
    <main>
      <SchemaHowTo
        name="วิธีทำฮัจญ์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน"
        description="คู่มือการประกอบพิธีฮัจญ์ในวันที่ 8–13 ซุลฮิจญะฮ์ พร้อมดุอาอ์และหลักฐาน"
        url="https://umrahthailand.com/hajj"
        steps={hajjSteps}
      />

      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>คู่มือฮัจญ์</span></div>
          <h1>วิธีทำฮัจญ์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน</h1>
          <p>ฮัจญ์เป็นรุก่นที่ 5 ของอิสลาม ประกอบในวันที่ 8–13 เดือนซุลฮิจญะฮ์เท่านั้น มีขั้นตอนต่อเนื่องหลายวัน — แตกต่างจากอุมเราะห์ที่ทำได้ตลอดปี</p>
          <div className="meta"><span>🕋 อัปเดต พ.ค. 2026</span><span>📖 อ้างอิงหะดีษญาบิร (มุสลิม)</span><span>⏱ อ่าน 15 นาที</span></div>
        </div>
      </section>

      <JourneyAnimation
        sectionId="journey-hajj"
        title="ภาพรวมเส้นทางฮัจญ์ (วันที่ 8–13 ซุลฮิจญะฮ์)"
        subtitle="เลื่อนหน้าจอลง หรือกดปุ่ม ‹ › เพื่อติดตามผู้แสวงบุญผ่านสถานที่สำคัญของฮัจญ์"
        stops={hajjStops}
        milestoneKeys={milestoneKeys}
      />

      <section className="steps-wrap">
        <div className="wrap narrow">
          <div className="note" style={{ marginBottom: 30 }}>
            ℹ️ <div>หน้านี้แสดงเฉพาะ <b>ขั้นตอนเฉพาะของฮัจญ์</b> ส่วนการอิหรอม ตะวาฟ และสะแอ ใช้หลักการเดียวกับ <Link className="accent" href="/umrah">คู่มืออุมเราะห์</Link></div>
          </div>
          <GuideSteps steps={hajjSteps} />
        </div>
      </section>
    </main>
  );
}
