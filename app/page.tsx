import Image from "next/image";
import { SignIn } from "../components/SignIn";
import UserAvatar from "@/components/UserAvatar";
import { NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import Playground from "@/components/playground";

export default function Home() {
  return (
    <SessionProvider >
    <NextUIProvider>
      <NavbarComponent />
      <Playground/>
    </NextUIProvider>
    </SessionProvider>
  );
}
