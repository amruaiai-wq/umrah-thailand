"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Article, Sponsor } from "@/lib/types";
import { GRADIENTS } from "@/data/seed";
import { isSupabaseConfigured, getSupabaseBrowser } from "@/lib/supabase-client";
import { useAdminData } from "@/components/useAdminData";
import { usePlannerPrices, type PlannerPrices } from "@/lib/usePlannerPrices";
import { useCategories } from "@/lib/useCategories";
import ImageUploadInput from "@/components/ImageUploadInput";

const DEMO_PASS = "admin1234";

export default function AdminPage() {
  const cloud = isSupabaseConfigured();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");

  const adminLogin = async () => {
    if (cloud) {
      const sb = getSupabaseBrowser();
      if (!sb) return;
      const { error } = await sb.auth.signInWithPassword({ email, password: pass });
      if (error) { setErr(true); return; }
      setAuthed(true);
    } else {
      if (pass === DEMO_PASS) setAuthed(true);
      else setErr(true);
    }
  };

  if (!authed) {
    return (
      <main>
        <section className="admin-login">
          <div className="login-card">
            <div className="logo" style={{ justifyContent: "center", marginBottom: 8 }}>
              <Image src="/logo-mark.svg" width={56} height={56} alt="Umrah Thailand logo" />
            </div>
            <h2 style={{ textAlign: "center", color: "#fff", fontSize: "1.4rem" }}>เข้าสู่ระบบหลังบ้าน</h2>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,.6)", fontSize: ".88rem", marginBottom: 22 }}>สำหรับผู้ดูแลระบบเท่านั้น</p>
            {cloud && (
              <div className="field"><label style={{ color: "rgba(255,255,255,.8)" }}>อีเมล</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@email.com" />
              </div>
            )}
            <div className="field"><label style={{ color: "rgba(255,255,255,.8)" }}>รหัสผ่าน</label>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && adminLogin()} placeholder="กรอกรหัสผ่าน" />
            </div>
            <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={adminLogin}>เข้าสู่ระบบ</button>
            {err && <p style={{ color: "#ff9b9b", fontSize: ".85rem", textAlign: "center", marginTop: 12 }}>ข้อมูลเข้าสู่ระบบไม่ถูกต้อง</p>}
            {!cloud && <p style={{ textAlign: "center", color: "rgba(255,255,255,.4)", fontSize: ".78rem", marginTop: 18 }}>โหมดทดลอง · รหัส: admin1234</p>}
          </div>
        </section>
      </main>
    );
  }

  return <Dashboard cloud={cloud} onLogout={() => setAuthed(false)} />;
}

function Dashboard({ cloud, onLogout }: { cloud: boolean; onLogout: () => void }) {
  const d = useAdminData();
  const { prices, save: savePrices, reset: resetPrices } = usePlannerPrices();
  const catMgr = useCategories();
  const [tab, setTab] = useState<"articles" | "ads" | "prices" | "cats">("articles");
  const [modal, setModal] = useState<null | { type: "article" | "ad"; item?: Article | Sponsor }>(null);

  const pubArticles = d.articles.filter((a) => a.published).length;
  const liveAds = d.sponsors.filter((s) => s.active).length;

  return (
    <main>
      {!cloud && (
        <div className="notice-bar" style={{ paddingTop: 80 }}>
          ⚙️ โหมดทดลอง — ข้อมูลเก็บในเบราว์เซอร์นี้เท่านั้น ตั้งค่า Supabase เพื่อใช้งานจริง (ดู README)
        </div>
      )}
      {cloud && <SupabaseMigrationNotice />}
      <section className="admin-dash" style={{ paddingTop: cloud ? 120 : 60 }}>
        <div className="wrap">
          <div className="dash-top">
            <div>
              <h1 style={{ fontSize: "1.7rem" }}>แผงควบคุมระบบ</h1>
              <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>จัดการบทความและโฆษณาของเว็บไซต์</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn btn-outline" href="/" style={{ fontSize: ".85rem" }}>↗ ดูเว็บไซต์</Link>
              <button className="btn btn-outline" onClick={onLogout} style={{ fontSize: ".85rem" }}>ออกจากระบบ</button>
            </div>
          </div>

          <div className="dash-stats">
            <div className="stat-card"><div className="sv">{d.articles.length}</div><small>บทความทั้งหมด</small></div>
            <div className="stat-card"><div className="sv">{pubArticles}</div><small>เผยแพร่อยู่</small></div>
            <div className="stat-card"><div className="sv">{d.sponsors.length}</div><small>โฆษณาทั้งหมด</small></div>
            <div className="stat-card"><div className="sv">{liveAds}</div><small>โฆษณาที่แสดง</small></div>
          </div>

          <div className="dash-tabs">
            <button className={`dtab ${tab === "articles" ? "active" : ""}`} onClick={() => setTab("articles")}>📝 บทความ</button>
            <button className={`dtab ${tab === "ads" ? "active" : ""}`} onClick={() => setTab("ads")}>📢 โฆษณา</button>
            <button className={`dtab ${tab === "cats" ? "active" : ""}`} onClick={() => setTab("cats")}>🏷️ หมวดหมู่</button>
            <button className={`dtab ${tab === "prices" ? "active" : ""}`} onClick={() => setTab("prices")}>💰 ราคาแพ็กเกจ</button>
          </div>

          {tab === "prices" ? (
            <PricesPanel prices={prices} onSave={savePrices} onReset={resetPrices} />
          ) : tab === "cats" ? (
            <CatsPanel cats={catMgr.cats} onAdd={catMgr.add} onRemove={catMgr.remove} onReset={catMgr.reset} />
          ) : tab === "articles" ? (
            <div>
              <div className="panel-head">
                <h3>จัดการบทความ</h3>
                <button className="btn btn-emerald" style={{ fontSize: ".88rem" }} onClick={() => setModal({ type: "article" })}>+ เพิ่มบทความ</button>
              </div>
              <div className="admin-table">
                {d.articles.map((a) => {
                  const isScheduled = a.published && a.publish_at && new Date(a.publish_at) > new Date();
                  return (
                    <div className="arow" key={a.id}>
                      <div className="thumb" style={{ background: a.img }} />
                      <div className="ainfo">
                        <b>{a.title}</b>
                        <small>
                          <span className="tagcat">{a.cat}</span> · {a.date}
                          {isScheduled && <span className="sched-badge">⏰ {new Date(a.publish_at!).toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" })}</span>}
                        </small>
                      </div>
                      <button
                        className={`status-pill ${isScheduled ? "st-sched" : a.published ? "st-on" : "st-off"}`}
                        onClick={() => d.toggleArticle(a.id)}
                      >
                        {isScheduled ? "ตั้งเวลา" : a.published ? "เผยแพร่" : "ซ่อน"}
                      </button>
                      <div className="arow-actions">
                        <button className="iconbtn" title="แก้ไข" onClick={() => setModal({ type: "article", item: a })}>✎</button>
                        <button className="iconbtn del" title="ลบ" onClick={() => confirm("ลบบทความนี้?") && d.deleteArticle(a.id)}>🗑</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className="panel-head">
                <h3>จัดการโฆษณา / ผู้สนับสนุน</h3>
                <button className="btn btn-emerald" style={{ fontSize: ".88rem" }} onClick={() => setModal({ type: "ad" })}>+ เพิ่มโฆษณา</button>
              </div>
              <div className="admin-table">
                {d.sponsors.map((s) => (
                  <div className="arow" key={s.id}>
                    <div className="alogo">{s.i}</div>
                    <div className="ainfo"><b>{s.n}</b><small>{s.r}</small></div>
                    <button className={`status-pill ${s.active ? "st-on" : "st-off"}`} onClick={() => d.toggleSponsor(s.id)}>{s.active ? "แสดง" : "ปิด"}</button>
                    <div className="arow-actions">
                      <button className="iconbtn" title="แก้ไข" onClick={() => setModal({ type: "ad", item: s })}>✎</button>
                      <button className="iconbtn del" title="ลบ" onClick={() => confirm("ลบโฆษณานี้?") && d.deleteSponsor(s.id)}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {modal?.type === "article" && (
        <ArticleModal item={modal.item as Article} onClose={() => setModal(null)}
          onSave={async (data, id) => {
            const err = await d.saveArticle(data, id);
            if (err) { alert("บันทึกไม่สำเร็จ: " + err); return; }
            setModal(null);
          }} />
      )}
      {modal?.type === "ad" && (
        <AdModal item={modal.item as Sponsor} onClose={() => setModal(null)}
          onSave={(data, id) => { d.saveSponsor(data, id); setModal(null); }} />
      )}
    </main>
  );
}

function PricesPanel({
  prices, onSave, onReset,
}: { prices: PlannerPrices; onSave: (p: PlannerPrices) => void; onReset: () => void }) {
  const [draft, setDraft] = useState<PlannerPrices>(JSON.parse(JSON.stringify(prices)));
  const [saved, setSaved] = useState(false);

  function setNum(section: keyof PlannerPrices, idx: number, field: string, val: string) {
    const n = parseInt(val, 10);
    if (isNaN(n) || n < 0) return;
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as PlannerPrices;
      if (section === "visaPrice") return { ...next, visaPrice: n };
      (next[section] as Record<string, number | string>[])[idx][field] = n;
      return next;
    });
    setSaved(false);
  }

  function doSave() {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function doReset() {
    if (!confirm("รีเซ็ตราคาทั้งหมดกลับค่าเริ่มต้น?")) return;
    onReset();
    setDraft(JSON.parse(JSON.stringify(prices)));
  }

  const sections: { label: string; key: keyof PlannerPrices; field: string; field2?: string }[] = [
    { label: "ตั๋วเครื่องบิน", key: "airlines", field: "price" },
    { label: "การเดินทางภายใน", key: "transports", field: "price" },
    { label: "ไกด์นำทาง", key: "guides", field: "price" },
    { label: "อาหาร", key: "foodOptions", field: "pricePerDay" },
    { label: "กิจกรรมเสริม", key: "extras", field: "price" },
  ];

  return (
    <div>
      <div className="panel-head">
        <h3>ราคาแพ็กเกจอุมเราะห์</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" style={{ fontSize: ".85rem" }} onClick={doReset}>รีเซ็ต</button>
          <button className="btn btn-emerald" style={{ fontSize: ".85rem" }} onClick={doSave}>
            {saved ? "✓ บันทึกแล้ว" : "บันทึก"}
          </button>
        </div>
      </div>
      <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 20 }}>
        ราคาจะแสดงในหน้าคำนวณค่าใช้จ่าย (/planner) ทันทีหลังบันทึก
      </p>

      {/* VISA */}
      <div className="price-section">
        <h4 className="price-section-title">วีซ่า</h4>
        <div className="price-row">
          <span className="price-row-name">ค่าวีซ่าต่อคน</span>
          <input
            type="number" className="price-input"
            value={draft.visaPrice}
            onChange={(e) => setDraft((prev) => ({ ...prev, visaPrice: parseInt(e.target.value, 10) || 0 }))}
          />
          <span className="price-unit">฿</span>
        </div>
      </div>

      {/* HOTEL STARS */}
      <div className="price-section">
        <h4 className="price-section-title">ระดับโรงแรม (ราคาต่อห้องต่อคืน)</h4>
        {draft.hotelStars.map((h, i) => (
          <div className="price-row" key={i}>
            <span className="price-row-name">{h.label}</span>
            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>มักกะฮ์</span>
            <input type="number" className="price-input" value={h.makkah}
              onChange={(e) => setNum("hotelStars", i, "makkah", e.target.value)} />
            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>มะดีนะฮ์</span>
            <input type="number" className="price-input" value={h.madinah}
              onChange={(e) => setNum("hotelStars", i, "madinah", e.target.value)} />
            <span className="price-unit">฿</span>
          </div>
        ))}
      </div>

      {sections.map(({ label, key, field }) => (
        <div className="price-section" key={key}>
          <h4 className="price-section-title">{label}</h4>
          {(draft[key] as Record<string, string | number>[]).map((item, i) => (
            <div className="price-row" key={i}>
              <span className="price-row-name">{item.name as string}</span>
              <input
                type="number" className="price-input"
                value={item[field] as number}
                onChange={(e) => setNum(key, i, field, e.target.value)}
              />
              <span className="price-unit">฿</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CatsPanel({ cats, onAdd, onRemove, onReset }: {
  cats: string[];
  onAdd: (name: string) => boolean;
  onRemove: (name: string) => void;
  onReset: () => void;
}) {
  const [newCat, setNewCat] = useState("");
  const handleAdd = () => {
    if (!newCat.trim()) return;
    const ok = onAdd(newCat);
    if (ok) setNewCat("");
    else alert("มีหมวดหมู่นี้แล้ว");
  };
  return (
    <div className="price-section" style={{ maxWidth: 520 }}>
      <div className="panel-head" style={{ marginBottom: 20 }}>
        <h3>จัดการหมวดหมู่บทความ</h3>
        <button className="btn btn-outline" style={{ fontSize: ".82rem" }} onClick={onReset}>รีเซ็ต</button>
      </div>
      <div className="cat-add-row">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="ชื่อหมวดหมู่ใหม่..."
          className="cat-add-input"
        />
        <button className="btn btn-emerald" onClick={handleAdd} style={{ fontSize: ".88rem" }}>+ เพิ่ม</button>
      </div>
      <div className="cat-list">
        {cats.map((c) => (
          <div key={c} className="cat-item">
            <span className="cat-item-name">{c}</span>
            <button className="iconbtn del" title="ลบ" onClick={() => confirm(`ลบหมวดหมู่ "${c}"?`) && onRemove(c)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s.trim().toLowerCase().replace(/[^\w฀-๿]+/g, "-").replace(/^-+|-+$/g, "") || "article-" + Date.now();
}

function ArticleModal({ item, onClose, onSave }: { item?: Article; onClose: () => void; onSave: (d: Partial<Article>, id?: number) => void }) {
  const { cats } = useCategories();
  const isEdit = !!item;

  const [title, setTitle] = useState(item?.title ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [cat, setCat] = useState(item?.cat ?? cats[0] ?? "");
  const [ex, setEx] = useState(item?.ex ?? "");
  const [img, setImg] = useState(item?.img ?? GRADIENTS[0]);
  const [images, setImages] = useState<string[]>(item?.images ?? []);
  const [schedMode, setSchedMode] = useState<"now" | "later">(item?.publish_at ? "later" : "now");
  const [publishAt, setPublishAt] = useState(item?.publish_at ?? "");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);

  const formatWithAI = async () => {
    if (!body.trim()) { alert("กรุณาใส่เนื้อหาก่อน"); return; }
    setAiLoading(true);
    setAiDone(false);
    try {
      const res = await fetch("/api/format-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: body, categories: cats }),
      });
      const data = await res.json();
      if (data.error) { alert("AI Error: " + data.error); return; }
      if (data.formatted) setBody(data.formatted);
      if (data.excerpt) setEx(data.excerpt);
      if (data.category && cats.includes(data.category)) setCat(data.category);
      setAiDone(true);
    } catch {
      alert("ไม่สามารถติดต่อ AI ได้");
    } finally {
      setAiLoading(false);
    }
  };

  const save = () => {
    if (!title.trim()) { alert("กรุณากรอกหัวข้อ"); return; }
    if (!body.trim()) { alert("กรุณาใส่เนื้อหา หรือกด AI จัดการก่อน"); return; }
    const now = new Date();
    const m = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const autoDate = `${now.getDate()} ${m[now.getMonth()]} ${now.getFullYear()}`;
    onSave({
      title,
      cat: cat || cats[0],
      date: item?.date || autoDate,
      ex: ex || title.slice(0, 120),
      body,
      img,
      images,
      published: true,
      publish_at: schedMode === "later" && publishAt ? publishAt : undefined,
      slug: item?.slug || slugify(title),
    }, item?.id);
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: 700 }}>
        <div className="modal-head">
          <h3>{isEdit ? "แก้ไขบทความ" : "เพิ่มบทความใหม่"}</h3>
          <button className="modal-x" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">

          {/* 1. Title */}
          <div className="field">
            <label>หัวข้อบทความ</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ชื่อบทความ" />
          </div>

          {/* 2. Image */}
          <div className="field">
            <label>
              รูปภาพ
              <small style={{ color: "var(--muted)", fontWeight: 400, marginLeft: 6 }}>รูปแรก = ปก · ที่เหลือแทรกที่ [img]</small>
            </label>
            <ImageUploadInput urls={images} onChange={setImages} />
          </div>

          {/* 3. Content + AI button */}
          <div className="field">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ marginBottom: 0 }}>
                เนื้อหา
                {!isEdit && <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: ".8rem", marginLeft: 8 }}>วางเนื้อหาดิบ แล้วกด AI จัดการ</span>}
              </label>
              <button
                type="button"
                className={`ai-format-btn${aiDone ? " ai-done" : ""}`}
                onClick={formatWithAI}
                disabled={aiLoading}
              >
                {aiLoading
                  ? <><span className="ai-spin">⏳</span> AI กำลังจัด...</>
                  : aiDone
                  ? <>✓ จัดหน้าแล้ว</>
                  : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg> AI จัดการ</>
                }
              </button>
            </div>
            <textarea
              value={body}
              onChange={(e) => { setBody(e.target.value); setAiDone(false); }}
              placeholder={"วางเนื้อหาดิบที่นี่ เช่น:\n\nอุมเราะห์คือการเดินทางไปยังนครมักกะฮ์...\nขั้นตอนแรกคือการสวมใส่ชุดอิหรอม...\n\nจากนั้นกด AI จัดการ — จะจัดหัวข้อ คำโปรย หมวดหมู่ให้อัตโนมัติ"}
              style={{ minHeight: 280, fontFamily: "monospace", fontSize: ".85rem" }}
            />
          </div>

          {/* 4. AI result review (shown after AI runs) */}
          {aiDone && (
            <div className="ai-result-card">
              <p className="ai-result-label">✓ AI จัดการแล้ว — ตรวจสอบหรือแก้ไขก่อนบันทึก</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div className="field" style={{ flex: "0 0 200px" }}>
                  <label>หมวดหมู่</label>
                  <select value={cat} onChange={(e) => setCat(e.target.value)}>
                    {cats.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field" style={{ flex: 1, minWidth: 200 }}>
                  <label>คำโปรย</label>
                  <input value={ex} onChange={(e) => setEx(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* 5. Publish mode */}
          <div className="field">
            <label>การเผยแพร่</label>
            <div className="pub-mode-row">
              <button
                type="button"
                className={`pub-mode-btn${schedMode === "now" ? " active" : ""}`}
                onClick={() => { setSchedMode("now"); setPublishAt(""); }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                เผยแพร่ทันที
              </button>
              <button
                type="button"
                className={`pub-mode-btn${schedMode === "later" ? " active" : ""}`}
                onClick={() => setSchedMode("later")}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                เลือกเวลา
              </button>
            </div>
            {schedMode === "later" && (
              <>
                <input
                  type="datetime-local"
                  style={{ marginTop: 10 }}
                  value={publishAt ? publishAt.slice(0, 16) : ""}
                  onChange={(e) => setPublishAt(e.target.value ? new Date(e.target.value).toISOString() : "")}
                />
                {publishAt && new Date(publishAt) > new Date() && (
                  <p className="sched-info">⏰ จะเผยแพร่ {new Date(publishAt).toLocaleString("th-TH", { dateStyle: "full", timeStyle: "short" })}</p>
                )}
              </>
            )}
          </div>

          {/* 6. Gradient color (collapsed) */}
          <details className="field">
            <summary className="color-pick-summary">สีพื้นหลัง (ใช้ถ้าไม่มีรูป)</summary>
            <div className="swatches" style={{ marginTop: 8 }}>
              {GRADIENTS.map((g, i) => (
                <div key={i} className={`swatch ${g === img ? "sel" : ""}`} style={{ background: g }} onClick={() => setImg(g)} />
              ))}
            </div>
          </details>

          <button className="btn btn-emerald" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={save}>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

function SupabaseMigrationNotice() {
  const [show, setShow] = useState(false);
  return (
    <div className="migration-bar" style={{ paddingTop: 80 }}>
      <span>🗄️ Supabase เชื่อมแล้ว</span>
      <button className="migration-toggle" onClick={() => setShow((v) => !v)}>
        {show ? "ซ่อน" : "ดู SQL Setup รูปภาพบทความ"}
      </button>
      {show && (
        <div className="migration-sql">
          <p style={{ marginBottom: 8, fontSize: ".82rem", color: "#ccc" }}>รันใน Supabase → SQL Editor:</p>
          <pre>{`-- 1. เพิ่มคอลัมน์รูปภาพ
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';

-- 2. เพิ่มคอลัมน์ตั้งเวลาเผยแพร่
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS publish_at timestamptz;

-- 3. อนุญาตให้คนทั่วไปอ่านบทความที่เผยแพร่แล้ว (สำคัญมาก!)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published" ON articles
  FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "admin_all" ON articles
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- 4. Storage policy (อนุญาต upload รูป)
CREATE POLICY "allow_upload" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "allow_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'article-images');`}</pre>
          <p style={{ marginTop: 10, fontSize: ".82rem", color: "#bbb", lineHeight: 1.7 }}>
            จากนั้นใน Dashboard → Storage:<br />
            สร้าง Bucket ชื่อ <b>article-images</b> → เปิด Public แล้วรัน SQL ด้านบน
          </p>
        </div>
      )}
    </div>
  );
}

function AdModal({ item, onClose, onSave }: { item?: Sponsor; onClose: () => void; onSave: (d: Partial<Sponsor>, id?: number) => void }) {
  const [f, setF] = useState<Partial<Sponsor>>(item || { n: "", r: "★ 5.0 · ", d: "", i: "A", url: "#", active: true });
  const upd = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const save = () => {
    if (!f.n?.trim()) { alert("กรุณากรอกชื่อบริษัท"); return; }
    onSave({ ...f, i: (f.i?.trim() || f.n![0] || "A").toUpperCase(), url: f.url?.trim() || "#" }, item?.id);
  };
  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-head"><h3>{item ? "แก้ไขโฆษณา" : "เพิ่มโฆษณา"}</h3><button className="modal-x" onClick={onClose}>×</button></div>
        <div className="modal-body">
          <div className="field"><label>ชื่อบริษัท</label><input value={f.n} onChange={(e) => upd("n", e.target.value)} placeholder="ชื่อผู้ให้บริการ" /></div>
          <div className="field"><label>เรตติ้ง / ใบอนุญาต</label><input value={f.r} onChange={(e) => upd("r", e.target.value)} placeholder="★ 4.9 · ใบอนุญาตเลขที่..." /></div>
          <div className="field"><label>คำอธิบาย</label><textarea value={f.d} onChange={(e) => upd("d", e.target.value)} placeholder="จุดเด่นของบริการ" /></div>
          <div style={{ display: "flex", gap: 14 }}>
            <div className="field" style={{ width: 90 }}><label>อักษรโลโก้</label><input value={f.i} maxLength={2} onChange={(e) => upd("i", e.target.value)} placeholder="A" /></div>
            <div className="field" style={{ flex: 1 }}><label>ลิงก์ปลายทาง</label><input value={f.url} onChange={(e) => upd("url", e.target.value)} placeholder="https://..." /></div>
          </div>
          <button className="btn btn-emerald" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={save}>บันทึก</button>
        </div>
      </div>
    </div>
  );
}
