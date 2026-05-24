import { GuideStep } from "@/lib/types";

export default function SchemaHowTo({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: GuideStep[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: "th",
    totalTime: "PT12H",
    url,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t,
      url: `${url}#${s.id}`,
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: s.desc + " " + s.duas.map((d) => `ดุอาอ์: ${d.tr} — ${d.mn}`).join(" "),
        },
      ],
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
