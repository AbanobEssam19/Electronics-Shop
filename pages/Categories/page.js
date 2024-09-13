import Card from "@/app/components/Card/card";

import Footer from "@/app/components/Footer/footer";
import Nav from "@/app/components/Nav/nav";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function Categories() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Nav />
      <Card />
      <Footer />
    </>
  );
}
