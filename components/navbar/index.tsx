"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Logo } from "./Logo";
import Profile from "./Profile";
import { auth } from "@/auth";
import { SignIn } from "../SignIn";
import { useSession, signIn } from "next-auth/react";
// import { SignIn } from "../SignIn";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    // console.log(session)
    const menuItems = [
        "Git",
        "ShortLink"
      ];
    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>
            <NavbarBrand>
                <p className="font-bold text-inherit">LinkBy</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Git
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="secondary">
                        ShortLink
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="#" >
                        X
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" justify="end" >
                {session ? <Profile session={session} /> : <Button color="primary" variant="ghost" onClick={() => signIn()}>Sign In</Button>}
            </NavbarContent>
            <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>

    );
}
