"use client"
import { useFirebase } from "@/context/firebase"
import { useState } from "react"
function SigninPage() {
  const firebase = useFirebase()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  
  return (
    <div className="text-white p-4" >
      <label className="p-2">Email</label>

      <input type="email" 
      placeholder="Enter your email"
      className="w-full" 
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
      }
      }/>
      <label className="p-3">Password</label>

      <input className="w-full" 
      type="password" 
      placeholder="Enter your password (more than 6 words)"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value)
          }
        }/>
        <button className="text-white bg-orange-500 rounded-2xl p-2" 
        onClick={() => {firebase.signinUser(email, password)} 

         } >signin with email</button>
         <button onClick={firebase.signinGoogle}> signin with google</button>
    </div>
  )
} 

export default SigninPage
