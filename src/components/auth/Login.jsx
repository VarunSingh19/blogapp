import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };
  return (
    <>
      <br />
      <br />
     
    <div style={{height:'90vh'}}>
      <div
        className="border p-3 bg-light mx-auto shadow "
        style={{ maxWidth: 400, marginTop: 60 ,borderRadius:'10px'}}
      >
        <div className="text-center">
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            
            }}
          />
        </div>
        <br />
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleLogin}
          style={{width:'100%'}}
          >
          Login
          </button>
          </div>
        </div>
        </div>
    </>
  );
}
