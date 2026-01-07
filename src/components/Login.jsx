import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // login API call
    console.log({ username, password });
    if(username==="shashikant"){
        navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-800/90 border border-red-900/30 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-900/20 border border-red-900/30 mb-4">
              <svg 
                className="w-6 h-6 text-red-900" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
            <p className="text-neutral-400 text-sm">Enter your credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-red-900/40 focus:border-red-900 focus:outline-none placeholder:text-neutral-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-red-900/40 focus:border-red-900 focus:outline-none placeholder:text-neutral-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-red-900 hover:bg-red-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!username || !password}
              >
                Sign In
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-3 rounded-lg bg-transparent border border-red-900/40 text-red-900 hover:bg-red-900/10 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}