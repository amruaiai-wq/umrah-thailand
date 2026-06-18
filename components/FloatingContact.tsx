"use client";

export default function FloatingContact() {
  return (
    <div className="float-btns">
      {/* ปุ่มคำนวณค่าใช้จ่าย */}
      <a
        href="/planner"
        className="float-btn float-planner"
        aria-label="คำนวณค่าอุมเราะห์"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="8" y1="6" x2="16" y2="6"/>
          <line x1="8" y1="10" x2="12" y2="10"/>
          <line x1="8" y1="14" x2="16" y2="14"/>
          <line x1="8" y1="18" x2="12" y2="18"/>
        </svg>
        <span>คำนวณค่าใช้จ่าย</span>
      </a>
      {/* แก้ลิงก์ LINE OA ตรงนี้ */}
      <a
        href="https://line.me/R/ti/p/@umrahthailand"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-line"
        aria-label="ติดต่อทาง LINE"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
        <span>LINE</span>
      </a>
      {/* แก้ลิงก์ Facebook Page ตรงนี้ */}
      <a
        href="https://www.facebook.com/umrahthailand/"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-msng"
        aria-label="ติดต่อทาง Messenger"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
        </svg>
        <span>Messenger</span>
      </a>
    </div>
  );
}
