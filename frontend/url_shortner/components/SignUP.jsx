import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setMessage('');
    setMessage2('');

    // 1️⃣ Validation check
    if (!name || !email || !password) {
      setMessage("Please fill all the details");
      return;
    }

    try {
      // 2️⃣ Axios POST request
      const res = await axios.post("http://localhost:5000/signUP", {
        name,
        email,
        password,
      }, {withCredentials: true});
      console.log(res);
      if(res.data.message == "User already exist"){
        setMessage("You already registered with this email");
        return;
      }
      if(res.data.message == "Signup successful."){
        setMessage2("Signed Successfully, Redirecting to dashboard");
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sign up with your details below.
        </p>

        {/* 🔽 Attach handleSubmit here */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          <p className="text-red-400">{message}</p> 

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="flex w-full justify-center text-green-600 mt-2">{message2}</p>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 ml-2 hover:text-blue-800"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUP;
