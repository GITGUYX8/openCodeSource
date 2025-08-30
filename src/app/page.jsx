"use client"
import SignupPage from "../pages/SignupPage"
import SigninPage from "@/pages/SigninPage";
import { FirebaseProvider} from "@/context/firebase";
export default function Home() {
  return (
    <>
    <FirebaseProvider>
  <SignupPage/>
  <SigninPage />
    </FirebaseProvider>

    </>
  )
}  

