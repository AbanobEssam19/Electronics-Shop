"use client";
import Card from "@/app/components/Card/card";
import styles from "./page.module.css";
import Footer from "@/app/components/Footer/footer";
import Nav from "@/app/components/Nav/nav";

import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";

export default function Categories() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Nav />
      <div className={`container`} style={{ minHeight: "1000px" }}>
        <div className={`row ${styles.FirstRow}`}>
          <div className={`col-8 ${styles.LeftPart}`}>
            <p className={styles.ShowingResults} style={{ margin: "10px" }}>
              Showing 1-20 of 167 results
            </p>
            {/* <!-- Offcanvas Sidebar --> */}
            <div class="offcanvas offcanvas-start" id="demo">
              <div class="offcanvas-header">
                <h6
                  style={{
                    borderBottom: "1px solid #e3e1e1",
                    padding: "15px  0px 10px 0px",
                    width: "104%",
                  }}
                >
                  Filter Products
                </h6>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  style={{ border: "1px black solid", borderRadius: "20px" }}
                ></button>
              </div>
              <div className={`offcanvas-body`}>
                <p
                  style={{
                    borderBottom: "1px solid #e3e1e1",
                    padding: "25px  0px 10px 0px",
                    width: "104%",
                  }}
                >
                  Filter by price
                </p>
                <div className={styles.FilterPart}>
                  <p style={{ marginTop: "20px" }}>
                    <span style={{ color: "grey" }}>Price:</span>EGP{value} —
                    EGP1,600
                  </p>
                  <button className={styles.Filterbtn}>FILTER</button>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1600"
                  value={value}
                  onChange={handleChange}
                  className={styles.FilterSlider}
                />

                <div
                  style={{
                    borderBottom: "1px solid #e3e1e1",
                    marginBottom: "15px",
                    height: "35px",
                    width: "104%",
                  }}
                >
                  <p style={{ marginTop: "70px" }}>Product Status</p>
                </div>
                <div>
                  <input type="checkbox" value="stock" />
                  <label
                    for="stock"
                    style={{ padding: "10px", fontSize: "15px" }}
                  >
                    In Stock
                  </label>
                  <br />
                  <input type="checkbox" value="sale" />
                  <label
                    for="sale"
                    style={{ padding: " 0px 10px", fontSize: "15px" }}
                  >
                    On Sale
                  </label>
                  <br />
                </div>
              </div>
            </div>

            {/* <!-- Button to open the offcanvas sidebar --> */}
            <button
              className={`btn btn-primary ${styles.SideFilters}`}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#demo"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-filter"
                style={{ color: "#000000" }}
              />{" "}
              Filter Products
            </button>
          </div>
          <div className={`col-2 ${styles.RightPart}`}>
            <div>
              <select name="sort" id="sort" className={styles.SortIcon}>
                <option value="latest">Sort By Latest</option>
                <option value="popularity">Sort By popularity </option>
                <option value="ltoh">Sort By price: low to high</option>
                <option value="htol">Sort By price: high to low </option>
              </select>
            </div>
            <div
              className={styles.ItemsList}
              style={{
                borderLeft: "1px solid #e3e1e1",
                paddingLeft: "10px",
                paddingTop: "2px",
              }}
            >
              <span style={{ color: "grey" }}>Show:</span>
            </div>
            <div className={styles.ItemsList}>
              <select name="items" id="items" className={styles.SortIcon}>
                <option value="latest">20 items</option>
                <option value="popularity">40 items</option>
                <option value="ltoh">60 items</option>
                <option value="htol">80 items </option>
              </select>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-3 ${styles.RowTwoLeftSide}`}>
            <p
              style={{
                borderBottom: "1px solid #e3e1e1",
                padding: "25px  0px 10px 0px",
                width: "104%",
              }}
            >
              Filter by price
            </p>
            <div className={styles.FilterPart}>
              <p style={{ marginTop: "20px" }}>
                <span style={{ color: "grey" }}>Price:</span>EGP{value} —
                EGP1,600
              </p>
              <button className={styles.Filterbtn}>FILTER</button>
            </div>

            <input
              type="range"
              min="0"
              max="1600"
              value={value}
              onChange={handleChange}
              className={styles.FilterSlider}
            />

            <div
              style={{
                borderBottom: "1px solid #e3e1e1",
                marginBottom: "15px",
                height: "35px",
                width: "104%",
              }}
            >
              <p style={{ marginTop: "70px" }}>Product Status</p>
            </div>
            <div>
              <input type="checkbox" value="stock" />
              <label for="stock" style={{ padding: "10px", fontSize: "15px" }}>
                In Stock
              </label>
              <br />
              <input type="checkbox" value="sale" />
              <label
                for="sale"
                style={{ padding: " 0px 10px", fontSize: "15px" }}
              >
                On Sale
              </label>
              <br />
            </div>
          </div>
          <div className={`col-9 ${styles.ProductsList}`}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className={` row ${styles.Pagination}`}>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
}
