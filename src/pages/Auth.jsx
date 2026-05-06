import { useState } from "react";
import { signIn, signUp } from "../services/authServices";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../contexts/ToastContexts";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const location = useLocation();
  const initialMode = location.state?.mode !== "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;

    if (isLogin) {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }

    setLoading(false);

    if (result?.error) {
      addToast(result.error.message, "error");
      return;
    }

    addToast(isLogin ? "Login berhasil!" : "Cek email untuk verifikasi.", "success");
    if (isLogin) navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-8">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/60 md:flex-row md:min-h-[640px]">
        
        {/* Kiri: Branding Panel */}
        <div className="relative flex w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-8 text-white md:w-5/12 md:p-12 lg:p-14">
          {/* Overlay Efek Dekoratif */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-[20%] -top-[10%] h-[70%] w-[70%] rounded-full bg-white/10 blur-3xl mix-blend-overlay"></div>
            <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-blue-400/30 blur-3xl mix-blend-overlay"></div>
          </div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-widest text-white">MYANIME</span>
          </div>

          <div className="relative z-10 my-12 md:my-0">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login-branding"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">Welcome <br/>Back!</h2>
                  <p className="text-lg leading-relaxed text-blue-100/90">
                    Senang melihatmu kembali. Lanjutkan perjalanan menonton animemu hari ini.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register-branding"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">Join Our <br/>Community</h2>
                  <p className="text-lg leading-relaxed text-blue-100/90">
                    Buat akun sekarang dan mulai kelola daftar tontonan serta koleksi anime favoritmu.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative z-10 hidden md:block">
            <button
              onClick={() => navigate("/")}
              className="mb-3 flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </button>
            <p className="text-sm text-blue-200/70">© 2026 RyannPy. All rights reserved.</p>
          </div>
        </div>

        {/* Kanan: Form Panel */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-7/12 md:p-12 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "register-form"}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto w-full max-w-sm"
            >
              <div className="mb-10 text-center md:text-left">
                <h1 className="mb-3 text-3xl font-bold text-slate-900">
                  {isLogin ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-slate-500">
                  {isLogin ? "Masukkan kredensial akunmu di bawah ini" : "Isi form di bawah untuk membuat akun baru"}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleAuth}>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-70 disabled:hover:shadow-none"
                >
                  {loading && (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}
                  {loading ? "Memproses..." : isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-sm text-slate-600">
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    {isLogin ? "Register sekarang" : "Sign in di sini"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
