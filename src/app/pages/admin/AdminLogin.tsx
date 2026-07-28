import { useState } from "react";
import { useNavigate } from "react-router";
import { Snowflake, LogIn } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSanyonara } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, isLoggedIn } = useSanyonara();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    navigate("/admin", { replace: true });
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Berhasil masuk. Selamat datang!");
      navigate("/admin", { replace: true });
    } else {
      toast.error("Email atau password salah.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img src="/library/logo.png" alt="Sanyonara Admin" className="size-14 object-contain" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Sanyonara Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Masuk untuk mengelola konten website</p>
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@sanyonara.id" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="mt-2">
            <LogIn className="size-4" /> Masuk
          </Button>
        </form>

        <div className="mt-6 rounded-xl bg-accent/60 p-3 text-center text-xs text-accent-foreground">
          Demo login — Email: <strong>{import.meta.env.VITE_ADMIN_EMAIL || "admin@sanyonara.id"}</strong> · Password: <strong>{import.meta.env.VITE_ADMIN_PASSWORD || "admin123"}</strong>
        </div>
      </div>
    </div>
  );
}
