import React from "react";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
          <div className="relative w-full rounded-3xl border border-slate-200 bg-white/80 p-10 text-center shadow-lg backdrop-blur">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-blue-100 blur-2xl" />
            <div className="absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-slate-100 blur-2xl" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Fast • Simple • Clean
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Shorten your long URLs in seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
              Keep your links neat, shareable, and memorable. Get started and
              create your first short link instantly.
            </p>

            <div className="mt-10 flex justify-center">
              <button
                onClick={e => navigate('/signUP')}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
