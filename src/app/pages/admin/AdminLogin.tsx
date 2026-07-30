import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LogIn, Eye, EyeOff, ShieldAlert, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSanyonara } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_SECONDS = 60;

export default function AdminLogin() {
  const { login, isLoggedIn } = useSanyonara();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem("login_attempts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutTime, setLockoutTime] = useState<number>(() => {
    const saved = localStorage.getItem("login_lockout_until");
    if (!saved) return 0;
    const remaining = Math.ceil((parseInt(saved, 10) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Countdown timer saat dikunci
  useEffect(() => {
    if (lockoutTime <= 0) return;
    const timer = setInterval(() => {
      setLockoutTime((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("login_lockout_until");
          localStorage.setItem("login_attempts", "0");
          setAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime > 0) {
      toast.error(`Akses dikunci sementara. Silakan tunggu ${lockoutTime} detik lagi.`);
      return;
    }

    setIsSubmitting(true);

    // Simulasi delay singkat 400ms untuk menangkal automated bot / timing attack
    await new Promise((resolve) => setTimeout(resolve, 400));

    const success = login(email, password);

    if (success) {
      localStorage.removeItem("login_attempts");
      localStorage.removeItem("login_lockout_until");
      setAttempts(0);
      toast.success("Berhasil masuk. Selamat datang!");
      navigate("/admin", { replace: true });
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      localStorage.setItem("login_attempts", nextAttempts.toString());

      if (nextAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_TIME_SECONDS * 1000;
        localStorage.setItem("login_lockout_until", lockoutUntil.toString());
        setLockoutTime(LOCKOUT_TIME_SECONDS);
        toast.error(`Terlalu banyak percobaan gagal! Akses dikunci selama ${LOCKOUT_TIME_SECONDS} detik untuk keamanan.`);
      } else {
        const remaining = MAX_ATTEMPTS - nextAttempts;
        toast.error(`Email atau password salah. (Sisa percobaan: ${remaining}x)`);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img src="/library/logo.png" alt="Sanyonara Admin" className="size-14 object-contain" />
            <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
              <Lock className="size-3.5" />
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Sanyonara Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Portal Masuk Terproteksi</p>
        </div>

        {lockoutTime > 0 && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <ShieldAlert className="size-5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">Akses Dikunci Sementara</p>
              <p className="mt-0.5">Terlalu banyak percobaan gagal. Coba lagi dalam <span className="font-mono font-bold">{lockoutTime} detik</span>.</p>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Admin</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email terdaftar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={lockoutTime > 0 || isSubmitting}
              autoComplete="username"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={lockoutTime > 0 || isSubmitting}
                autoComplete="current-password"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-hidden"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full text-sm font-semibold"
            disabled={lockoutTime > 0 || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">Memeriksa Kredensial...</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="size-4" /> Masuk ke Panel Admin
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
