import React from "react";
import { Metadata } from "next";
import ContactMain from "@/pages/contact/contact";

export const metadata: Metadata = {
  title: "Contact - Lum Studios | Get in Touch",
  description: "Contact Lum Studios for professional photography services in Nigeria. Book your session for weddings, portraits, maternity, baby shoots, and special events. Call +234 814 553 8164",
  keywords: ["contact lum studios", "photography booking Nigeria", "professional photographer contact", "wedding photography inquiry", "portrait photography booking"],
};

const ContactPage = () => {
  return (
    <ContactMain/>
  );
};

export default ContactPage;
