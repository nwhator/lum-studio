import { Metadata } from "next";
import HomeLum from "@/pages/homes/home";

export const metadata: Metadata = {
  title: "Lum Studios",
};

export default function Home() {
  return (
    <>
      <HomeLum />
    </>
  );
}