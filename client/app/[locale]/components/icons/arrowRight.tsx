import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function ArrowRightIcon({
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
      <path d="M9 5L15 12L9 19" />
    </svg>
  );
}
