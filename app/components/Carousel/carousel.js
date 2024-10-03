"use client";
import styles from "./carousel.module.css";
function Carousel() {
  return (
    <div
      id="mainCarousel"
      className={`carousel slide ${styles.parentCarousel}`}
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="2"
        ></button>
      </div>

      <div className={`carousel-inner ${styles.carouselInner}`}>
        <div className={`carousel-item active ${styles.carouselItem}`}>
          <img src="../product1.jpg" className="d-block w-100" />
        </div>
        <div className={`carousel-item ${styles.carouselItem}`}>
          <img src="../product1.jpg" className="d-block w-100" />
        </div>
        <div className={`carousel-item ${styles.carouselItem}`}>
          <img src="../product1.jpg" className="d-block w-100" />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span
          className={`carousel-control-prev-icon ${styles.prevIcon}`}
        ></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span
          className={`carousel-control-next-icon ${styles.nextIcon}`}
        ></span>
      </button>
    </div>
  );
}
export default Carousel;
