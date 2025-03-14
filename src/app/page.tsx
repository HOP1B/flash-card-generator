'use client';
import { useAuth } from "@clerk/nextjs";
import { Maincreater } from "./maincreate";


export default function Home() {
  const {} = useAuth();
  return (
    <>
      <Maincreater />
      <div>
       

      </div>
    </>
  );
}
