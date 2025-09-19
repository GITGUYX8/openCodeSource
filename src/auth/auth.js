import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup   }  from "firebase/auth"
import { firebaseAuth } from "@/context/firebase";
export const  signupUser = (email, password) => {
 createUserWithEmailAndPassword(firebaseAuth, email,  password)
    .then((userCredential) => {
    console.log(userCredential)
  })
  .catch((error) => {
    const errorHead = error.code;
    const errorMessage = error.message;
    console.log(errorHead + ": " + errorMessage)
    // ..
  });
}
export const signinGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)

}
export const signinUser = (email, password) =>  {
signInWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    // Signed in // ...
    console.log(userCredential)

  })
  .catch((error) => {
    const errorHead = error.code;
    const errorMessage = error.message;
    console.log(errorHead + ": " + errorMessage)
  });
}