import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LUM Studios - Professional Photography & Videography",
    short_name: "LUM Studios",
    description: "Premium photography and videography studio in Ile-Ife, Nigeria. Weddings, maternity, baby shoots, portraits, convocation, call to bar, and special events.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#B7C435",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
