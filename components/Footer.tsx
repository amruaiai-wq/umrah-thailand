import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <svg className="mark" viewBox="0 0 48 48">
                <rect x="6" y="20" width="36" height="22" rx="2" fill="#0a1a32" stroke="#C9A24B" strokeWidth="1.5" />
                <rect x="6" y="20" width="36" height="6" fill="#C9A24B" />
                <path d="M24 4 L40 18 H8 Z" fill="#12294C" stroke="#C9A24B" strokeWidth="1.5" />
              </svg>
              <div>
                <b>Umrah Thailand</b>
                <span>UMRAH &amp; HAJJ THAILAND</span>
              </div>
            </Link>
            <p style={{ fontSize: ".9rem", maxWidth: 300 }}>
              ศูนย์รวมความรู้การทำอุมเราะห์และฮัจญ์สำหรับมุสลิมไทย อ้างอิงหลักฐานในทุกเนื้อหา
            </p>
          </div>
          <div>
            <h5>คู่มือ</h5>
            <ul>
              <li><Link href="/umrah">วิธีทำอุมเราะห์</Link></li>
              <li><Link href="/hajj">วิธีทำฮัจญ์</Link></li>
              <li><Link href="/articles">บทความ</Link></li>
            </ul>
          </div>
          <div>
            <h5>เว็บไซต์</h5>
            <ul>
              <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li><Link href="/contact">ติดต่อ</Link></li>
              <li><Link href="/contact">ลงโฆษณา</Link></li>
              <li><Link href="/admin">🔑 ระบบหลังบ้าน</Link></li>
            </ul>
          </div>
          <div>
            <h5>ติดต่อ</h5>
            <ul>
              <li>hello@umrahthailand.com</li>
              <li>กรุงเทพมหานคร</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Umrah Thailand. เพื่อการศึกษา</span>
          <span>นโยบายความเป็นส่วนตัว · นโยบายโฆษณา</span>
        </div>
      </div>
    </footer>
  );
}
