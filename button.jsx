import React from "react";
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const { profile } = useAuth();
// const [yourProjects, setYourProjects] = useState([]);

// useEffect(() => {
//   if (profile && profile.fullName) {
//     fetchUserProjects();
//   }
// }, [profile]);

// const fetchUserProjects = async () => {
//


export default function EscrowForm() {
  const getBounty=async () => {

  const collectionRef = collection(firestore, "entries");
        const q = query(collectionRef, where("author", "==", profile.fullName));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
        ;}

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <form
        action="https://www.escrow.com/checkout"
        method="post"
        target="_blank"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          background: "#fff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}
      >
        {/* Hidden Inputs */}
        <input type="hidden" name="type" value="domain_name" />
        <input type="hidden" name="non_initiator_email" value="localguru928@gmail.com" />
        <input type="hidden" name="non_initiator_id" value="3804725" />
        <input type="hidden" name="non_initiator_role" value="seller" />
        <input type="hidden" name="title" value="Work" />
        <input type="hidden" name="currency" value="USD" />
        <input type="hidden" name="domain" value="opensourcecode.com" />
        <input type="hidden" name="concierge" value="false" />
        <input type="hidden" name="with_content" value="false" />
        <input type="hidden" name="fee_payer" value="seller" />
        <input type="hidden" name="return_url" value="" />
        <input type="hidden" name="button_types" value="buy_now" />
        <input type="hidden" name="auto_accept" value="" />
        <input type="hidden" name="auto_reject" value="" />
        <input type="hidden" name="item_key" value="undefined" />

        {/* Editable inputs */}
        <input
          type="number"
          name="price"
          placeholder="Enter Price (USD)"
          required
          min="1"
          style={{
            padding: "10px",
            width: "220px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px"
          }}
        />
        <input
          type="number"
          name="inspection_period"
          placeholder="Inspection Period (days)"
          required
          min="1"
          max="14"
          style={{
            padding: "10px",
            width: "220px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px"
          }}
        />

        {/* Payment button */}
        <button
          className="EscrowButtonPrimary"
          type="submit"
          style={{
            backgroundColor: "#0ecb6f",
            borderRadius: "4px",
            border: "1px solid #0ecb6f",
            boxShadow: "0 2px 4px 0 hsla(0,12%,54%,.1)",
            color: "#fff",
            cursor: "pointer",
            fontFamily: "Open Sans, sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: ".4px",
            lineHeight: "1.2",
            minHeight: "36px",
            padding: "8px 60px",
            textAlign: "center",
            transition: "all .1s linear"
          }}
        >
          PAY HERE
        </button>
        <img
          src="https://t.escrow.com/1px.gif?name=bin&price=5&title=Work&user_id=3804725"
          alt=""
        />
      </form>
    </div>
  );
}
