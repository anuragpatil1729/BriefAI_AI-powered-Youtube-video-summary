import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setSummary("");
    setDisplayed("");
    setError("");
    setCopied(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "SYSTEM FAILURE");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "SYSTEM ERROR");
    } finally {
      setLoading(false);
    }
  };

  // ⌨️ Terminal typing effect
  useEffect(() => {
    if (!summary) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + summary.charAt(i));
      i++;
      if (i >= summary.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [summary]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-screen h-screen bg-black text-cyan-300 flex items-center justify-center relative overflow-hidden">
      {/* Animated cyberpunk background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/25 via-black to-cyan-900/25 animate-pulse" />

      {/* Centered neon glass card */}
      <div className="relative z-10 w-full max-w-3xl mx-auto rounded-2xl border border-cyan-500/40 bg-black/70 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.35)] p-10">
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-widest text-cyan-400">
          Youtube SUMMARIZER
        </h1>

        <p className="text-center text-sm text-cyan-500 mb-8">
           AI POWERED • YOUTUBE INTELLIGENCE INTERFACE
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="ENTER YOUTUBE URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-black/60 border border-cyan-500/40 rounded-lg px-4 py-2 text-cyan-200 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-bold tracking-wide transition-all duration-300 ${
              loading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:shadow-[0_0_45px_rgba(0,255,255,0.9)]"
            }`}
          >
            {loading ? "PROCESSING…" : "EXECUTE"}
          </button>
        </form>

        {loading && (
          <div className="flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-full border-2 border-cyan-500 border-t-fuchsia-500 animate-spin shadow-[0_0_25px_rgba(0,255,255,0.8)]" />
          </div>
        )}

        {error && (
          <p className="text-fuchsia-500 text-center mb-4 font-mono">
            ⚠ {error}
          </p>
        )}

        {displayed && (
          <div className="border border-fuchsia-500/40 rounded-xl p-6 bg-black/60 shadow-[0_0_40px_rgba(255,0,255,0.35)]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-fuchsia-400 tracking-wider">
                SUMMARY_OUTPUT
              </h2>
              <button
                onClick={copyToClipboard}
                className="text-xs px-3 py-1 rounded-md border border-cyan-500/40 hover:bg-cyan-500/10 transition"
              >
                {copied ? "COPIED ✓" : "COPY"}
              </button>
            </div>

            <p className="whitespace-pre-line text-cyan-200 leading-relaxed font-mono text-sm">
              {displayed}
              <span className="animate-pulse">▌</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);