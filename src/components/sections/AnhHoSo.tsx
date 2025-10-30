"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSidebar } from "../ui/sidebar";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
}: Readonly<ProfileImageProps>) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleSidebar, open } = useSidebar();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <button
      type="button"
      onClick={() => (isSignedIn ? toggleSidebar() : openSignIn())}
      className=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle AI Chat Sidebar"
    >
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        className="position: relative w-12 h-12"
        priority
      />

      {/* Online Badge */}
      <div className="">
        <div className="">
          <div className="" />
          <div className="" />
        </div>
        <span className="">Online</span>
      </div>

      {/* Hover Overlay */}
      <div
        className={` ${
          isHovered ? "" : ""
        }`}
      >
        <div className="">
          {open ? (
            <X className="" />
          ) : (
            <MessageCircle className="" />
          )}

          <div className="">
            {open ? "Close Chat" : "Chat with AI Twin"}
          </div>
          <div className="">
            {open ? "Click to close chat" : "Click to open chat"}
          </div>
        </div>
      </div>
    </button>
  );
}