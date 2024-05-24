import React from "react";
import {User} from "@nextui-org/react";

export default function Card({url,shortCode}: any) {
  return (
    <User   
      name={url}
      description={shortCode}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
  );
}
