import type { Metadata } from "next";
import Link from "next/link";
import UmrahPlanner from "@/components/UmrahPlanner";

export const metadata: Metadata = {
  title: "คำนวณค่าใช้จ่ายอุมเราะห์ 2026 | Umrah Thailand",
  description: "เครื่องคำนวณค่าใช้จ่ายอุมเราะห์ฟรี เลือกตั๋วเครื่องบิน โรงแรม รถรับส่ง ไกด์ อาหาร และกิจกรรม ดูราคาประมาณการแบบเรียลไทม์",
  alternates: { canonical: "/planner" },
};

export default function PlannerPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> / <span>คำนวณค่าใช้จ่าย</span>
          </div>
          <h1>คำนวณค่าใช้จ่ายอุมเราะห์</h1>
          <p style={{ color: "rgba(255,255,255,.75)", maxWidth: 560, lineHeight: 1.75 }}>
            เลือกรายการที่ต้องการ แล้วดูราคาประมาณการทันที — ไม่มีค่าใช้จ่ายในการวางแผน
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 30, padding: "6px 16px", fontSize: ".82rem" }}>✈ ตั๋วเครื่องบิน</span>
            <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 30, padding: "6px 16px", fontSize: ".82rem" }}>🏨 โรงแรม 3–5 ดาว</span>
            <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 30, padding: "6px 16px", fontSize: ".82rem" }}>🪪 วีซ่า</span>
            <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 30, padding: "6px 16px", fontSize: ".82rem" }}>🚌 รถรับส่ง</span>
            <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 30, padding: "6px 16px", fontSize: ".82rem" }}>🧭 ไกด์</span>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <UmrahPlanner />
        </div>
      </section>
    </main>
  );
}
