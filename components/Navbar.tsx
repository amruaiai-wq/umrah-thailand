"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LangSwitch } from "@/components/journey/i18n";

const LINKS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/plan", label: "สถานที่ประวัติศาสตร์" },
  { href: "/articles", label: "บทความ" },
  { href: "/#ch-calc", label: "คำนวณค่าใช้จ่าย" },
  { href: "/about", label: "ติดต่อเรา" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="logo">
          <Image src="/logo-mark.svg" width={44} height={44} alt="Umrah Thailand logo" priority />
          <div>
            <b>Umrah Thailand</b>
            <span>UMRAH GUIDE THAILAND</span>
          </div>
        </Link>
        <ul className={`menu ${open ? "open" : ""}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          {/* only the homepage story is translated */}
          {pathname === "/" && <div className="nav-lang"><LangSwitch /></div>}
          <Link className="btn btn-orange" href="/contact">
            ปรึกษาฟรี →
          </Link>
          <button className="burger" aria-label="menu" onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
