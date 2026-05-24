"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/umrah", label: "คู่มืออุมเราะห์" },
  { href: "/hajj", label: "คู่มือฮัจญ์" },
  { href: "/articles", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
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
          <svg className="mark" viewBox="0 0 48 48">
            <rect x="6" y="20" width="36" height="22" rx="2" fill="#0a1a32" stroke="#C9A24B" strokeWidth="1.5" />
            <rect x="6" y="20" width="36" height="6" fill="#C9A24B" />
            <path d="M24 4 L40 18 H8 Z" fill="#12294C" stroke="#C9A24B" strokeWidth="1.5" />
            <circle cx="24" cy="32" r="4" fill="#C9A24B" />
          </svg>
          <div>
            <b>Umrah Thailand</b>
            <span>UMRAH &amp; HAJJ THAILAND</span>
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
          <Link className="btn btn-gold" href="/umrah">
            เริ่มเรียนรู้ →
          </Link>
          <button className="burger" aria-label="menu" onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
