import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CardIcon({
  className,
  size = 24,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      height={size}
      width={size}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" />
      <path d="M10 16H6" />
      <path d="M14 16H12.5" />
      <path d="M2 10L22 10" />
    </svg>
  );
}
