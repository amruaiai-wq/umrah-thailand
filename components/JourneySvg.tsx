import React from "react";

export function Pilgrim() {
  return (
    <div className="pilgrim">
      <svg width="60" height="116" viewBox="0 0 60 116">
        <ellipse cx="30" cy="112" rx="18" ry="4" fill="#000" opacity=".25" />
        <g className="leg-back"><rect x="27" y="72" width="9" height="36" rx="4" fill="#e6e3da" /></g>
        <g className="leg-front"><rect x="24" y="72" width="9" height="38" rx="4" fill="#f5f3ec" /></g>
        <path d="M18 54 L42 54 L44 82 L16 82 Z" fill="#f5f3ec" />
        <path d="M18 54 L42 54 L43 68 L17 68 Z" fill="#e6e3da" />
        <path d="M20 32 L40 32 L42 58 L18 58 Z" fill="#fbfaf7" />
        <path d="M20 32 L38 48 L18 58 Z" fill="#eceae1" />
        <rect x="36" y="38" width="8" height="25" rx="4" fill="#c98f5e" transform="rotate(8 40 38)" />
        <circle cx="30" cy="22" r="11" fill="#d99a6c" />
        <rect x="26" y="30" width="8" height="6" fill="#c98f5e" />
      </svg>
    </div>
  );
}

// milestone SVGs keyed by id
export const MILESTONES: Record<string, React.ReactNode> = {
  miqat: (
    <svg width="86" height="140" viewBox="0 0 86 140"><rect x="38" y="20" width="6" height="100" fill="#3a4a66" /><rect x="8" y="20" width="70" height="32" rx="4" fill="#12294C" stroke="#C9A24B" strokeWidth="1.5" /><text x="43" y="41" fill="#E0C277" fontSize="12" textAnchor="middle" fontFamily="Amiri">مِيقَات</text></svg>
  ),
  kaaba: (
    <svg width="130" height="150" viewBox="0 0 130 150"><circle cx="65" cy="110" r="56" fill="none" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 4" opacity=".5"><animateTransform attributeName="transform" type="rotate" from="0 65 110" to="360 65 110" dur="14s" repeatCount="indefinite" /></circle><rect x="44" y="72" width="42" height="52" rx="2" fill="#0a1426" /><rect x="44" y="86" width="42" height="8" fill="#C9A24B" /><rect x="58" y="102" width="11" height="22" fill="#C9A24B" opacity=".8" /></svg>
  ),
  saiy: (
    <svg width="190" height="120" viewBox="0 0 190 120"><path d="M0 108 Q28 50 56 108 Z" fill="#1B335A" /><path d="M134 108 Q162 50 190 108 Z" fill="#1B335A" /><text x="28" y="103" fill="#E0C277" fontSize="10" textAnchor="middle" fontFamily="Amiri">الصَّفَا</text><text x="162" y="103" fill="#E0C277" fontSize="10" textAnchor="middle" fontFamily="Amiri">المَرْوَة</text><path d="M56 98 H134" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="4 5" /></svg>
  ),
  halq: (
    <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="44" fill="none" stroke="#C9A24B" strokeWidth="1.5" opacity=".4" /><g stroke="#E0C277" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M40 75 L78 45" /><path d="M40 45 L78 75" /><circle cx="38" cy="46" r="6" /><circle cx="38" cy="74" r="6" /></g></svg>
  ),
  mina: (
    <svg width="200" height="120" viewBox="0 0 200 120"><path d="M20 108 L50 58 L80 108 Z" fill="#f3f1ea" /><path d="M70 108 L100 58 L130 108 Z" fill="#e6e3da" /><path d="M120 108 L150 58 L180 108 Z" fill="#f3f1ea" /><text x="100" y="103" fill="#0a1426" fontSize="11" textAnchor="middle" fontFamily="Amiri">مِنَى</text></svg>
  ),
  arafat: (
    <svg width="200" height="140" viewBox="0 0 200 140"><path d="M10 128 Q100 12 190 128 Z" fill="#1B335A" /><path d="M70 128 Q100 60 130 128 Z" fill="#12294C" /><circle cx="100" cy="34" r="13" fill="#E0C277" opacity=".75" /><text x="100" y="122" fill="#E0C277" fontSize="11" textAnchor="middle" fontFamily="Amiri">عَرَفَة</text></svg>
  ),
  muzdalifah: (
    <svg width="200" height="120" viewBox="0 0 200 120"><circle cx="152" cy="28" r="11" fill="#E0C277" opacity=".8" /><circle cx="48" cy="24" r="1.6" fill="#fff" /><circle cx="88" cy="40" r="1.4" fill="#fff" /><circle cx="120" cy="20" r="1.6" fill="#fff" /><ellipse cx="70" cy="104" rx="9" ry="5" fill="#3a4a66" /><ellipse cx="95" cy="107" rx="11" ry="6" fill="#2c3a55" /><ellipse cx="120" cy="104" rx="8" ry="5" fill="#3a4a66" /><text x="100" y="90" fill="#E0C277" fontSize="10" textAnchor="middle" fontFamily="Amiri">المُزْدَلِفَة</text></svg>
  ),
  jamarat: (
    <svg width="150" height="150" viewBox="0 0 150 150"><rect x="64" y="40" width="22" height="80" rx="4" fill="#3a4a66" /><rect x="60" y="34" width="30" height="12" rx="3" fill="#2c3a55" /><circle cx="38" cy="64" r="5" fill="#E0C277"><animate attributeName="cx" values="38;62;38" dur="2.4s" repeatCount="indefinite" /><animate attributeName="cy" values="64;52;64" dur="2.4s" repeatCount="indefinite" /></circle><text x="75" y="138" fill="#E0C277" fontSize="11" textAnchor="middle" fontFamily="Amiri">الجَمَرَات</text></svg>
  ),
};
