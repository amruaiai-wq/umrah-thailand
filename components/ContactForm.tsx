"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "สอบถามข้อมูลความรู้", msg: "" });

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert("กรุณากรอกชื่อและอีเมล");
      return;
    }
    // TODO: wire to API route / email / LINE Notify
    setSent(true);
    setForm({ name: "", email: "", phone: "", topic: "สอบถามข้อมูลความรู้", msg: "" });
  };

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="contact-form">
      <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>ส่งข้อความถึงเรา</h3>
      <p style={{ color: "var(--muted)", marginBottom: 22, fontSize: ".92rem" }}>เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
      <div className="field"><label>ชื่อ-นามสกุล</label><input value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="กรอกชื่อของคุณ" /></div>
      <div className="field"><label>อีเมล</label><input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="you@email.com" /></div>
      <div className="field"><label>เบอร์โทรศัพท์</label><input type="tel" value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="08X-XXX-XXXX" /></div>
      <div className="field"><label>เรื่องที่ติดต่อ</label>
        <select value={form.topic} onChange={(e) => upd("topic", e.target.value)}>
          <option>สอบถามข้อมูลความรู้</option>
          <option>สนใจลงโฆษณา / เป็นพันธมิตร</option>
          <option>แนะนำ / แจ้งแก้ไขเนื้อหา</option>
          <option>อื่น ๆ</option>
        </select>
      </div>
      <div className="field"><label>ข้อความ</label><textarea value={form.msg} onChange={(e) => upd("msg", e.target.value)} placeholder="พิมพ์ข้อความของคุณ..." /></div>
      <button className="btn btn-emerald" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>ส่งข้อความ</button>
      {sent && <div className="form-success">✓ ส่งข้อความเรียบร้อยแล้ว ขอบคุณค่ะ</div>}
    </div>
  );
}
