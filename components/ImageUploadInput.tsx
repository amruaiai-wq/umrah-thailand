"use client";
import { useRef, useState } from "react";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-client";

interface Props {
  urls: string[];
  onChange: (urls: string[]) => void;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target?.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

export default function ImageUploadInput({ urls, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const cloud = isSupabaseConfigured();

  const ensureBucket = async (sb: ReturnType<typeof getSupabaseBrowser>) => {
    if (!sb) return;
    // Try to create bucket — ignore error if it already exists
    await sb.storage.createBucket("article-images", { public: true }).catch(() => {});
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (cloud) {
        const sb = getSupabaseBrowser();
        if (!sb) continue;
        await ensureBucket(sb);
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await sb.storage.from("article-images").upload(path, file, { upsert: false });
        if (!error) {
          const { data } = sb.storage.from("article-images").getPublicUrl(path);
          newUrls.push(data.publicUrl);
        } else {
          alert("อัพโหลดรูปไม่สำเร็จ: " + error.message);
        }
      } else {
        const b64 = await toBase64(file);
        newUrls.push(b64);
      }
    }

    onChange([...urls, ...newUrls]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const remove = (i: number) => onChange(urls.filter((_, idx) => idx !== i));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= urls.length) return;
    const next = [...urls];
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  };

  return (
    <div className="img-upload-wrap">
      {urls.length > 0 && (
        <div className="img-preview-grid">
          {urls.map((u, i) => (
            <div key={i} className="img-preview-item">
              <img src={u} alt="" />
              {i === 0 && <span className="img-cover-badge">ปก</span>}
              <div className="img-actions">
                <button type="button" title="เลื่อนซ้าย" onClick={() => move(i, i - 1)} disabled={i === 0}>‹</button>
                <button type="button" title="เลื่อนขวา" onClick={() => move(i, i + 1)} disabled={i === urls.length - 1}>›</button>
                <button type="button" title="ลบ" onClick={() => remove(i)} className="img-del">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />

      <button type="button" className="img-upload-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>
        {uploading ? (
          "กำลังอัพโหลด..."
        ) : (
          <>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            เลือกรูปจากคอม {urls.length > 0 ? `(มีแล้ว ${urls.length} รูป)` : ""}
          </>
        )}
      </button>

      {!cloud && urls.length > 0 && (
        <p className="img-demo-note">โหมดทดลอง: รูปเก็บในเบราว์เซอร์นี้เท่านั้น ตั้งค่า Supabase เพื่อเก็บถาวร</p>
      )}
    </div>
  );
}
