import { Metadata } from "next";
import HomeLum from "@/pages/homes/home";

export const metadata: Metadata = {
  title: "Lum Studios | Professional Photography Services in Nigeria",
  description: "Lum Studios offers premium photography services for weddings, maternity, baby shoots, family portraits, convocation, and special events in Nigeria. Book your session today!",
  keywords: ["professional photography Nigeria", "wedding photographer", "maternity photography", "baby photography", "family portraits", "event photography", "photography studio Ile-Ife"],
};

export default function Home() {
  return (
    <>
      <HomeLum />
    </>
  );
}