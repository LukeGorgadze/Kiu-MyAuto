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
        strokeWidth="1.4"
        d="M12 8a4 4 0 00-8 0"
      ></path>
      <path
        stroke="#9CA2AA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        d="M9 7l1.5-1.5"
      ></path>
    </svg>
  );
};

export default Icon;
