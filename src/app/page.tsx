'use client';
import { useAuth } from "@clerk/nextjs";
import { Maincreater } from "./maincreate";
import { Signup } from "./components/Signup";

export default function Home() {
  const {} = useAuth();
  return (
    <>
      <Maincreater />
      <div>
        <h1>Welcome</h1>
        <Signup />
      </div>
    </>
  );
}
