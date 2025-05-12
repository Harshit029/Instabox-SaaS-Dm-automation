"use client";

import { useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 220,
  height = 60,
  className = "",
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className} ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity={1} />
          <stop offset="100%" stopColor="#EC4899" stopOpacity={1} />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter={isHovered ? "url(#softGlow)" : ""}>
        <rect
          x="10"
          y="10"
          width="280"
          height="60"
          rx="12"
          fill="url(#logoGradient)"
          fillOpacity={0.08}
          stroke="url(#logoGradient)"
          strokeWidth={1.5}
          strokeOpacity={0.3}
          className="transition-all duration-300"
        />

        <text
          x="150"
          y="48"
          textAnchor="middle"
          fill="url(#logoGradient)"
          className="font-bold"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            letterSpacing: "-0.02em"
          }}
        >
          Instabox
        </text>

        <circle
          cx="260"
          cy="40"
          r="8"
          fill="url(#logoGradient)"
          className={`transition-all duration-300 ${
            isHovered ? "scale-125 opacity-100" : "opacity-80"
          }`}
        >
          <animate
            attributeName="r"
            values="8;9;8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <path
          d="M230 30H250V50H230V30Z"
          fill="url(#logoGradient)"
          fillOpacity={0.5}
          className="transition-opacity duration-300"
        />
        <path
          d="M230 55H270V60H230V55Z"
          fill="url(#logoGradient)"
          fillOpacity={0.7}
          className="transition-opacity duration-300"
        />
      </g>
    </svg>
  );
}