//frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMsg(res.message);
  };

  return (
    <div className="page">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
