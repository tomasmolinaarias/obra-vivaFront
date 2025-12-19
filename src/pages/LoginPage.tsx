import { useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";

import { login } from "../services/auth.service";
import { mapAuthError } from "../services/errorMessages";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

type LoginArgs = {
  email: string;
  password: string;
};

async function loginMutation(
  _key: string,
  { arg }: { arg: LoginArgs }
) {
  return login(arg);
}

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin1234");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { trigger, isMutating } = useSWRMutation(
    "auth/login",
    loginMutation
  );

  const canSubmit = useMemo(() => {
    return (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      !isMutating
    );
  }, [email, password, isMutating]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await trigger({
        email: email.trim(),
        password,
      });

      window.location.href = "/dashboard";
    } catch (err: any) {
      const rawMessage =
        typeof err?.message === "string"
          ? err.message
          : "AUTH_INVALID";

      setErrorMsg(mapAuthError(rawMessage));
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Obra Viva</CardTitle>
          <CardDescription>
            Acceso a la plataforma
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorMsg && (
            <Alert
              variant="destructive"
              className="mb-4"
            >
              <AlertDescription>
                {errorMsg}
              </AlertDescription>
            </Alert>
          )}

          <form
            className="space-y-4"
            onSubmit={onSubmit}
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!canSubmit}
            >
              {isMutating
                ? "Ingresando..."
                : "Entrar"}
            </Button>

            <p className="text-xs text-muted-foreground">
              Endpoint:{" "}
              <span className="font-mono">
                /api/v1/auth/login/
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
