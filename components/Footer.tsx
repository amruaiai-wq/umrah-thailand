import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <Image src="/logo-mark.svg" width={40} height={40} alt="Umrah Thailand" />
              <div>
                <b>Umrah Thailand</b>
                <span>UMRAH GUIDE THAILAND</span>
              </div>
            </Link>
            <p style={{ fontSize: ".9rem", maxWidth: 300 }}>
              ศูนย์รวมความรู้การทำอุมเราะห์สำหรับมุสลิมไทย อ้างอิงหลักฐานในทุกเนื้อหา
            </p>
          </div>
          <div>
            <h5>บริการ</h5>
            <ul>
              <li><Link href="/contact">รับทำวีซ่าอุมเราะห์</Link></li>
              <li><Link href="/contact">จองที่พัก</Link></li>
              <li><Link href="/contact">บริการรถบัส</Link></li>
              <li><Link href="/contact">ปรึกษาวางแผนฟรี</Link></li>
            </ul>
          </div>
          <div>
            <h5>ความรู้</h5>
            <ul>
              <li><Link href="/umrah">คู่มืออุมเราะห์</Link></li>
              <li><Link href="/articles">บทความ</Link></li>
            </ul>
            <h5 style={{ marginTop: 20 }}>เว็บไซต์</h5>
            <ul>
              <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li><Link href="/contact">ติดต่อ</Link></li>
              <li><Link href="/admin">🔑 ระบบหลังบ้าน</Link></li>
            </ul>
          </div>
          <div>
            <h5>ติดต่อเรา</h5>
            <ul>
              <li>hello@umrahthailand.com</li>
              <li>กรุงเทพมหานคร</li>
            </ul>
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <a href="https://line.me/R/ti/p/@umrahthailand" target="_blank" rel="noopener" className="foot-social foot-line">LINE</a>
              <a href="https://m.me/umrahthailand" target="_blank" rel="noopener" className="foot-social foot-msng">Messenger</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Umrah Thailand</span>
          <span>นโยบายความเป็นส่วนตัว · นโยบายโฆษณา</span>
        </div>
      </div>
    </footer>
  );
}
