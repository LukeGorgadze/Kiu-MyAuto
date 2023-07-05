import React from "react";

const Icon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <rect
        width="10.8"
        height="7.8"
        x="2.6"
        y="7.6"
        stroke="#8C929B"
        strokeWidth="1.2"
        rx="1.2"
      ></rect>
      <path
        stroke="#8C929B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M8 5v5"
      ></path>
      <path
        stroke="#8C929B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12v1.5"
      ></path>
      <circle
        cx="8"
        cy="2.5"
        r="1.8"
        stroke="#8C929B"
        strokeWidth="1.4"
      ></circle>
      <path
        stroke="#8C929B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 10v3M11 10v3"
      ></path>
    </svg>
  );
};

export default Icon;
