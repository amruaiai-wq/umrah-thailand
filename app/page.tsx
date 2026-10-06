import UmrahStory from "@/components/journey/UmrahStory";
import SchemaHowTo from "@/components/SchemaHowTo";
import { umrahSteps } from "@/data/guides";
import "./journey.css";

export default function HomePage() {
  return (
    <main>
      {/* HowTo structured data moved here from the retired /umrah page */}
      <SchemaHowTo
        name="วิธีทำอุมเราะห์ ทีละขั้นตอน พร้อมดุอาอ์และหลักฐาน"
        description="คู่มือการประกอบพิธีอุมเราะห์ 5 ขั้นตอน พร้อมดุอาอ์และหลักฐาน"
        url="https://umrahthailand.com/"
        steps={umrahSteps}
      />
      <UmrahStory />
    </main>
  );
}
