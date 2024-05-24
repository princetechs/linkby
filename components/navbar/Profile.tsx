import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'
import {signOut} from "next-auth/react";
export default function Profile({session }: any) {
  return (
   
    <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <Avatar
        isBordered
        as="button"
        className="transition-transform"
        color="secondary"
        name="Jason Hughes"
        size="sm"
        src={session.user.image}
      />
    </DropdownTrigger>
    <DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem key="profile" className="h-14 gap-2">
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{session.user.name}</p>
      </DropdownItem>
      <DropdownItem onClick={() => signOut()} key="logout" color="danger">
        Log Out
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}
