import { Sponsor } from "@/lib/types";

export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="sponsor-grid" id="sponsors">
      {sponsors.length ? (
        sponsors.map((s) => (
          <div className="sponsor" key={s.id}>
            <span className="sp-badge">โฆษณา</span>
            <div className="sp-top">
              <div className="sp-logo">{s.i}</div>
              <div>
                <h4>{s.n}</h4>
                <div className="rate">{s.r}</div>
              </div>
            </div>
            <p>{s.d}</p>
            <a className="btn btn-outline" href={s.url || "#"} style={{ fontSize: ".85rem", padding: "9px 18px" }}>
              ดูรายละเอียด →
            </a>
          </div>
        ))
      ) : (
        <p style={{ color: "#69707E" }}>ยังไม่มีโฆษณา</p>
      )}
    </div>
  );
}
