"use client"

import { Maincreater } from "./maincreate";
import { Signup } from "./components/Signup";

export default function Page() {
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
