import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };
  return (
    <>
      <br />
      <br />
      <br />
      
    <div className="border p-3 bg-light shadow" style={{ marginTop: 70,borderRadius:'10px' }}>
      <div className="text-center">
          <h1>Register</h1>
          </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          onChange={(e) => {
            setName(e.target.value);
          }}
          />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
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
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          />
      </div>
        <br />
        <div className="text-center">
          <button className="btn btn-primary" style={{width:'100%'}} 
            onClick={handleSignup}>
        Register
          </button>
          </div>
    </div>
          </>
  );
}