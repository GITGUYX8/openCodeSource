// import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect   }  from "firebase/auth"
// import { firebaseAuth } from "@/context/firebase";
// export const  signupUser = (email, password) => {
//  createUserWithEmailAndPassword(firebaseAuth, email,  password)
//     .then((userCredential) => {
//     console.log(userCredential)
//   })
//   .catch((error) => {
//     const errorHead = error.code;
//     const errorMessage = error.message;
//     console.log(errorHead + ": " + errorMessage)
//     // ..
//   });
// }
// export const signinGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ prompt: 'select_account' });

//   try {
//     const result = await signInWithRedirect(firebaseAuth, provider);
//     console.log("Google Sign-in successful:", result.user);
//   } catch (error) {
//     if (error.code === "auth/popup-closed-by-user") {
//       console.warn("User closed the Google sign-in popup.");
//     } else {
//       console.error("Google Sign-in error:", error.code, error.message);
//     }
//   }
// };

// export const signinUser = (email, password) =>  {
// signInWithEmailAndPassword(firebaseAuth, email, password)
//   .then((userCredential) => {
//     // Signed in // ...
//     console.log(userCredential)

//   })
//   .catch((error) => {
//     const errorHead = error.code;
//     const errorMessage = error.message;
//     console.log(errorHead + ": " + errorMessage)
//   });
// }