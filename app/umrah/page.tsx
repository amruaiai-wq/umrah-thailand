import type { Metadata } from "next";
import Link from "next/link";
import JourneyAnimation from "@/components/JourneyAnimation";
import GuideSteps from "@/components/GuideSteps";
import SchemaHowTo from "@/components/SchemaHowTo";
import { umrahSteps, umrahStops } from "@/data/guides";

export const metadata: Metadata = {
  title: "วิธีทำอุมเราะห์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน",
  description:
    "คู่มือการประกอบพิธีอุมเราะห์ 5 ขั้นตอน พร้อมดุอาอ์ภาษาอาหรับ คำอ่าน ความหมาย และหลักฐานจากอัลกุรอานและสุนนะฮ์",
  alternates: { canonical: "/umrah" },
};

const milestoneKeys = ["miqat", "kaaba", "saiy", "halq"];

export default function UmrahPage() {
  return (
    <main>
      <SchemaHowTo
        name="วิธีทำอุมเราะห์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน"
        description="คู่มือการประกอบพิธีอุมเราะห์ 5 ขั้นตอน พร้อมดุอาอ์และหลักฐาน"
        url="https://umrahthailand.com/umrah"
        steps={umrahSteps}
      />

      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>คู่มืออุมเราะห์</span></div>
          <h1>วิธีทำอุมเราะห์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน</h1>
          <p>คู่มือฉบับสมบูรณ์สำหรับผู้ที่จะเดินทางไปทำอุมเราะห์ — อุมเราะห์มี 5 ขั้นตอนหลัก ทำได้ตลอดทั้งปี ไม่จำกัดช่วงเวลาเหมือนฮัจญ์</p>
          <div className="meta"><span>🕋 อัปเดต พ.ค. 2026</span><span>📖 อ้างอิงอัลกุรอาน + ศอเฮียะห์บุคอรี/มุสลิม</span><span>⏱ อ่าน 12 นาที</span></div>
        </div>
      </section>

      <JourneyAnimation
        sectionId="journey-umrah"
        title="ภาพรวมเส้นทางอุมเราะห์"
        subtitle="เลื่อนหน้าจอลง หรือกดปุ่ม ‹ › เพื่อเดินทางไปกับผู้แสวงบุญในชุดอิหรอม"
        stops={umrahStops}
        milestoneKeys={milestoneKeys}
      />

      <section className="steps-wrap">
        <div className="wrap guide-layout">
          <div>
            <GuideSteps steps={umrahSteps} />
            <div className="note" style={{ marginTop: 20 }}>
              ⚠️ <div><b>หมายเหตุ:</b> เนื้อหานี้เรียบเรียงเพื่อการศึกษาตามแนวทางที่นักวิชาการส่วนใหญ่ยอมรับ รายละเอียดบางข้อ (เช่น รุก่น/วาญิบ) อาจต่างกันตามมัซฮับ ควรปรึกษาผู้รู้หรือมุตเฏาวิฟก่อนปฏิบัติจริง</div>
            </div>
          </div>
          <aside>
            <div className="toc">
              <h4>สารบัญขั้นตอน</h4>
              {umrahSteps.map((s) => (
                <a href={`#${s.id}`} key={s.id}>{s.no}. {s.t}</a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
