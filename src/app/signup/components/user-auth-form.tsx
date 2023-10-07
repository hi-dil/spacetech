"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/lib/firebase/signIn";
import Link from "next/link";
import { AlertDestructive } from "@/components/Alert";
import validator from "validator";
import signUp from "@/lib/firebase/signUp";
import processUserSignUp from "@/lib/processUserSignUp";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [confirmPasswordClass, setConfirmPasswordClass] = useState("");
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
      console.log(error);
      setError("There's an error while signing you up");
    }

    if (result == null) {
      console.log(error);
      setError("There's an error while signing you up");
    }

    processUserSignUp(result?.user.email, provider, result)

  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(event);
    setIsLoading(true);
    setError("");

    if (!validator.isEmail(email)) {
      setEmailClass("border-red-500");
      setIsLoading(false);
      setError("Please Enter proper email");
    }

    if (password !== confirmPassword) {
      setPasswordClass("border-red-500");
      setConfirmPasswordClass("border-red-500");
      setIsLoading(false);
      setError("The password not match");

      return;
    }

    const res = await signUp(email, password);
    console.log(res);

    await processUserSignUp(email, "email", res)
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
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className={emailClass}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailClass("");
              }}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCorrect="off"
              className={passwordClass}
              disabled={isLoading}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordClass("");
              }}
            />
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              required
              className={confirmPasswordClass}
              name="confirmPassword"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordClass("");
              }}
            />
            {error !== "" ? <AlertDestructive errorMessage={error} /> : ""}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create New Account
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Click{"  "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/login"
            >
              here 
            </Link>
            {" "} to login to your account
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
