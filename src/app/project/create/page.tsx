"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { CreateForm } from "./component/form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const user = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <>
      <div className="mx-20">
        <CreateForm />
      </div>
    </>
  );
}
