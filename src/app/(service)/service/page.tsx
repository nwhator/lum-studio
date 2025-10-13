import React from "react";
import { Metadata } from "next";
import ServiceMain from "@/pages/service/service";

export const metadata: Metadata = {
  title: "Service | LUM Studios - Photography & Videography Services",
  description: "Explore our professional photography and videography services in Ile-Ife, Nigeria. Wedding photography, portraits, maternity shoots, events, and more.",
};

const ServicePage = () => {
  return (
    <ServiceMain/>
  );
};

export default ServicePage;
