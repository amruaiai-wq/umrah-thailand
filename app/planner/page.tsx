import UmrahPlanner from "@/components/UmrahPlanner";

export const metadata = {
  title: "คำนวณค่าใช้จ่ายอุมเราะห์ | Umrah Thailand",
  description: "เครื่องมือประมาณค่าใช้จ่ายอุมเราะห์แบบ DIY เลือกตั๋ว โรงแรม รถ ไกด์ และกิจกรรม ดูราคาแบบเรียลไทม์",
};

export default function PlannerPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">หน้าหลัก</a> <span>/ คำนวณค่าใช้จ่าย</span>
          </div>
          <h1>คำนวณค่าใช้จ่ายอุมเราะห์</h1>
          <p>เลือกรายการที่ต้องการ แล้วดูราคาประมาณการทันที — ไม่มีค่าใช้จ่ายในการวางแผน</p>
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
