import styles from "./page.module.css";
import Nav from "@/app/components/Nav/nav";
import Footer from "@/app/components/Footer/footer";

export default function Checkout() {
  return (
    <>
      <Nav />
      <div className={`container ${styles.main}`}>
        <BillingAndShipping />
        <Order />
      </div>
      <Footer />
    </>
  );
}
function BillingAndShipping() {
  return (
    <form className={styles.formClass}>
      <div className={styles.inputCollection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="firstName">First Name *</label>
          <input type="text" id="firstName" required></input>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="firstName" required></input>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="address">Street address *</label>
        <input
          type="text"
          id="address"
          required
          placeholder="House number and street name"
        ></input>
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="City">Town / City *</label>
        <input type="text" id="City" required></input>
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="governorate">Governorate *</label>
        <select id="governorate" required>
          <option>cairo</option>
          <option>Giza</option>
        </select>
      </div>
      <div className={styles.inputCollection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="phone">Phone *</label>
          <input type="text" id="phone" required></input>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" required></input>
        </div>
      </div>
      <h6 style={{ fontWeight: "bold" }}>Additional information</h6>
      <div className={styles.inputWrapper}>
        <label htmlFor="notes">Order Notes</label>
        <textarea
          style={{ borderRadius: "8px", height: "100px", padding: "10px" }}
          id="notes"
          placeholder="Notes about your order"
        ></textarea>
      </div>
    </form>
  );
}

function Order() {
  return (
    <div className={` ${styles.order} container`}>
      <h6 style={{ fontWeight: "bold" }}>YOUR ORDER</h6>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>product</td>
            <td>EGP 50</td>
          </tr>
          <tr>
            <td>product</td>
            <td>EGP 50</td>
          </tr>
          <tr>
            <td>product</td>
            <td>EGP 50</td>
          </tr>
          <tr>
            <td>product</td>
            <td>EGP 50</td>
          </tr>
          <tr>
            <td>product</td>
            <td>EGP 50</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.group}>
        <p style={{ fontWeight: "bold" }}>Total</p>
        <p style={{ fontWeight: "bold" }}>EGP 250</p>
      </div>
      <h6 style={{ fontWeight: "bold" }}>Cash on Delivery</h6>
      <button>Place Order</button>
    </div>
  );
}
