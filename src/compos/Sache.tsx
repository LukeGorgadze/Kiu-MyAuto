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
      <circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" strokeWidth="1.4"></circle>
      <circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" strokeWidth="1.4"></circle>
      <path
        stroke="#9CA2AA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M9.5 8l4-1.5M6.214 8L2 7.299M8 9.5V14"
      ></path>
    </svg>
  );
};

export default Icon;
