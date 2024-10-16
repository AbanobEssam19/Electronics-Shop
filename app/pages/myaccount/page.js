"use client";
import MyaccountSidebar from "@/app/components/MyaccountSidebar/sidebar";

import styles from "./page.module.css";
import Error from "../Error/page";
import { useEffect, useState } from "react";
import { updateUser } from "@/app/states/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AccountDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    region: "",
    curPass: "",
    newPass: "",
    confirmPass: "",
  });
  function updateData(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }
  useEffect(() => {
    if (!user) return; // Ensure user is defined
    console.log("User data loaded:", user);
    setUserData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      address: user.address || "",
      city: user.city || "",
      region: user.region || "",
    });
  }, [user]);

  if (!user) {
    return <Error />;
  }
  console.log(user);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;
  const handleSubmit = async () => {
    if (!userData.curPass) return;
    if (userData.newPass) {
      if (!passwordRegex.test(userData.newPass)) {
        console.error("Invalid password format.");
        return;
      }
      if (userData.newPass !== userData.confirmPass) {
        console.error("Passwords do not match.");
        return;
      }
    }

    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch("/api/edituserdata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        console.error("Failed to update user data.");
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div
      className={`container ${styles.AccountDetails}`}
      style={{ minHeight: "500px" }}
    >
      <MyaccountSidebar num={1} />
      <form action="">
        <label>First name</label>
        <input
          id="firstname"
          type="text"
          value={userData.firstname}
          onChange={updateData}
        />{" "}
        <br />
        <label>Last name</label>
        <input
          id="lastname"
          type="text"
          value={userData.lastname}
          onChange={updateData}
        />{" "}
        <br />
        <label>Street address</label>
        <input
          id="address"
          type="text"
          value={userData.address}
          onChange={updateData}
        />{" "}
        <br />
        <label>Town / City</label>
        <input
          id="city"
          type="text"
          value={userData.city}
          onChange={updateData}
        />{" "}
        <br />
        <label>Region</label>
        <input
          id="region"
          type="text"
          value={userData.region}
          onChange={updateData}
        />{" "}
        <br />
        <label>User name</label>
        <input type="text" value={user.username} disabled /> <br />
        <label>Email address</label>
        <input type="text" value={user.email} disabled /> <br />
        <label>Current password (leave blank to leave unchanged)</label>
        <input
          id="curPass"
          type="password"
          value={userData.curPass}
          onChange={updateData}
        />{" "}
        <br />
        <label>New password (leave blank to leave unchanged)</label>
        <input
          id="newPass"
          type="password"
          value={userData.newPass}
          onChange={updateData}
        />{" "}
        <br />
        <label>Confirm new password</label>
        <input
          id="confirmPass"
          type="password"
          value={userData.confirmPass}
          onChange={updateData}
        />{" "}
        <br />
      </form>
      <button onClick={handleSubmit} className={styles.sumbit}>
        Save Changes
      </button>
    </div>
  );
}
