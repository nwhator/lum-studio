import { Metadata } from "next";
// Update the import path below to match the actual location and filename of your HomeLum component.
// For example, if the file is named HomeLum.tsx in the (homes)/home directory, use:
import HomeLum from "../pages/homes/home";

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