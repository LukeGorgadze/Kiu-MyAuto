import React, { FunctionComponent } from "react";
interface IconProps {
    color: string;
}
const Icon: FunctionComponent<IconProps>  = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="63"
      height="33"
      fill="none"
      viewBox="0 0 63 33"
    >
      <path
        fill={color}
        d="M26.448 20.665a3.361 3.361 0 00-.759-2.119l.871-1.071a4.61 4.61 0 011.094 2.066c.082.369.123.745.124 1.123a.656.656 0 00.644.666h6.08a3.875 3.875 0 003.633 2.669 3.941 3.941 0 003.867-4 3.94 3.94 0 00-3.867-4 3.94 3.94 0 00-3.869 4h-1.331a5.436 5.436 0 01.88-2.96 4.082 4.082 0 00-3.03-2.323.646.646 0 01-.438-.289l-1.469-2.276a3.22 3.22 0 00-1.314-1.169c0 .005-.009.007-.015.013a3.099 3.099 0 00-1.059-.315V9.391c.185-.031.372-.05.559-.058h.729a.667.667 0 000-1.333h-.729a5.871 5.871 0 00-5.715 5.921 2.14 2.14 0 00.579 1.526 1.812 1.812 0 001.309.552c.366 0 .73.04 1.088.12.44.105.861.281 1.246.521l-.871 1.071a3.099 3.099 0 00-1.459-.379 3.284 3.284 0 00-3.224 3.333 3.226 3.226 0 106.446 0zm-1.29 0a1.934 1.934 0 11-3.866 0 1.969 1.969 0 011.934-2c.215.003.428.042.63.117l-1.134 1.466a.682.682 0 00.1.938.633.633 0 00.907-.1l1.133-1.471c.193.316.295.68.295 1.05h.001zm15.554-.666a2.627 2.627 0 01-2.577 2.667 2.556 2.556 0 01-2.222-1.334h1.576a1.97 1.97 0 001.934-2 .644.644 0 10-1.289 0 .657.657 0 01-.645.667h-1.933a2.627 2.627 0 012.579-2.667 2.627 2.627 0 012.577 2.667zm-1.933-5.335a3.283 3.283 0 003.223-3.331.655.655 0 00-.647-.668h-2.828l-4.136 2.542a9.75 9.75 0 01-1.7.814 5.43 5.43 0 012.015 1.93c0 .011 0 .022.01.033a5.32 5.32 0 014.063-1.32zm-5.049-2.6l1.029-.641a4.482 4.482 0 00-3.757-2.091 4.356 4.356 0 00-2.392.739c.535.348.992.804 1.342 1.338l1.1 1.715a8.47 8.47 0 002.678-1.061v.001z"
      ></path>
    </svg>
  );
};

export default Icon;
