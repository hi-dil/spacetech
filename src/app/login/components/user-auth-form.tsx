"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  signInWithEmail,
  signInWithGithub,
  signInWithGoogle,
} from "@/lib/firebase/signIn";
import Link from "next/link";
import { AlertDestructive } from "@/components/Alert";
import processUserSignUp from "@/lib/processUserSignUp";
import getData from "@/lib/firebase/getData";
import SetLocalStorage from "@/lib/SetLocalStorage";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOneClikLogin = async (provider: string) => {
    let result = null, error = null;

    switch (provider) {
      case "google": {
        const res = await signInWithGoogle();
        result = res.result;
        error = res.error;
        break;
      }

      case "github": {
        const res = await signInWithGithub();
        result = res.result;
        error = res.error;
        break;
      }

      default:
        break;
    }

    if (error) {
      setError("There's an error while signing you up");
    }

    processUserSignUp(email, provider, result);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    setError("");
    event.preventDefault();
    setIsLoading(true);

    if (email === null && password === null) return;
    const res = await signInWithEmail(email, password);

    if (res.error) {
      setError(
        "There's an error while signing you up. Please make sure your email and password are correct",
      );
      setIsLoading(false);
      return;
    }

    const docsnap = await getData("user", email);
    console.log(docsnap);
    if (docsnap.error || !docsnap.result?.exists() || docsnap === null) {
      setIsLoading(false);
      setError("There's an error while signing you up. Please make sure your email and password are correct");
    }

    const userData = docsnap.result.data();
    // store some user data in local storage
    SetLocalStorage(userData.email, userData.displayName, userData.imageURL);
    setIsLoading(false);
  }
  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              required
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              required
              name="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error !== "" ? <AlertDestructive errorMessage={error} /> : ""}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Click{"  "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/signup"
            >
              here
            </Link>{" "}
            to sign up
          </p>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="m-0"
        type="button"
        disabled={isLoading}
        onClick={() => handleOneClikLogin("google")}
      >
        {isLoading
          ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          : <Icons.google className="mr-2 h-4 w-4" />} Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => handleOneClikLogin("github")}
      >
        {isLoading
          ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          : <Icons.gitHub className="mr-2 h-4 w-4" />} Github
      </Button>
    </div>
  );
}
