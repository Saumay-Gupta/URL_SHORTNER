import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setMessage(''); 
    setMessage2('');
    // 1️⃣ Validation
    if (!email || !password) {
      setMessage("Please fill all the details");
      return;
    }

    try {
      // 2️⃣ Axios POST
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      }, {withCredentials: true});

      if(res.data.message == "Invalid credentials."){
        setMessage("Either the email or the password is wrong");
        return;
      }
      if(res.data.message == "Login successful."){
        setMessage2("Login Successfully, Redirecting to dashboard");
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">
          Log in with your email and password.
        </p>

        {/* 🔽 handleSubmit attached here */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              autoComplete="email"
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
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
            />
          </div> 

          <p className="text-red-400">{message}</p> 

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
        
        <p className="flex w-full justify-center text-green-600 mt-2">{message2}</p>

        <p className="mt-4 text-center text-sm text-slate-500">
          New here?
          <button
            onClick={() => navigate("/signUP")}
            className="text-blue-600 hover:text-blue-800 ml-2"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
