"use client";
import styles from "./3d.module.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "@/app/components/Nav/nav";
import Footer from "@/app/components/Footer/footer";

const Printing = () => {
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [grams, setGrams] = useState("");
  const [color, setColor] = useState("");
  const [quality, setQuality] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      Phone,
      grams,
      color,
      quality,
      file,
    });

    setName("");
    setPhone("");
    setGrams("");
    setColor("");
    setQuality("");
    setFile(null);
  };

  return (
    <>
      <Nav />
      <div className={styles.form_container}>
        <h1>3D Printing Service Reservation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Phone">Phone Number</label>
            <input
              type="number"
              id="Phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="grams">Grams of Parts</label>
            <input
              type="number"
              id="grams"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="color">Filament Color</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quality">Quality of Filament Needed</label>
            <input
              type="text"
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="file">Part File (STL)</label>
            <input
              type="file"
              id="file"
              accept=".stl"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Send Order</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Printing;
