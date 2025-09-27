import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirebase } from "@/context/firebase";
import { firestore } from "@/context/firebase";
import { dataByQuery } from "@/firestore/page";
export default function EscrowFormBtn({ inrBounty, projectTitle }) {
  // const { user } = useFirebase();
  // const [yourProjects, setYourProjects] = useState([]);
  
  // Conversion logic
  const usdAmount = Math.round(inrBounty / 83);

//   useEffect(() => {
//     // The user object from Firebase Auth has 'displayName', not 'fullName'
//     if (user && user.displayName) {
//       fetchUserProjects();
//     }
//   }, [user]);

//   const fetchUserProjects = async () => {
//     if (!user || !user.displayName) return;
//     const result = await dataByQuery("github", )
//     setYourProjects(results);
//   // };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <form
        action="https://www.escrow.com/checkout"
        method="post"
        target="_blank"
        className="flex flex-col md:flex-row items-center gap-3 w-full"
      >
        {/* Hidden Inputs */}
        <input type="hidden" name="type" value="domain_name" />
        <input type="hidden" name="non_initiator_email" value="localguru928@gmail.com" />
        <input type="hidden" name="non_initiator_id" value="3804725" />
        <input type="hidden" name="non_initiator_role" value="seller" />
        <input type="hidden" name="title" value={projectTitle || "Project Bounty"} />
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

        {/* Display Price & Input for Inspection */}
        <input
          type="hidden"
          name="price"
          value={usdAmount}
        />

        <div className="flex-grow w-full flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5">
          <span className="text-sm text-zinc-400">Price:</span>
          <span className="text-sm font-semibold text-white ml-2">
            ₹{inrBounty}
          </span>
        </div>

        <div className="flex-grow w-full">
          <label htmlFor="inspection_period" className="sr-only">Inspection Period</label>
          <input
            id="inspection_period"
            type="number"
            name="inspection_period"
            placeholder="Inspection Period (days)"
            required
            min="1"
            max="14"
            className="p-2.5 w-full border border-zinc-700 rounded-lg text-sm bg-zinc-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Payment button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm w-full md:w-auto px-6 py-2.5 rounded-lg transition-colors"
        >
          Pay Now
        </button>
        <img
          src="https://t.escrow.com/1px.gif?name=bin&price=5&title=Work&user_id=3804725"
          alt=""
          className="hidden"
        />
      </form>
    </div>
  );
}