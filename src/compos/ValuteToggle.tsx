import React, { FC, FunctionComponent } from "react";

interface ValuteToggleProps {
    setValuteDollar: (valute: boolean) => void;
    valuteDollar: boolean;
}


const ValuteToggle : React.FC<ValuteToggleProps> = ({setValuteDollar,valuteDollar }) => {
  return (
    <div className="valute" onClick={() => setValuteDollar(!valuteDollar)}>
      <div className={valuteDollar ? "currency currCurrency" : "currency"}>
        $
      </div>
      <div className={!valuteDollar ? "currency currCurrency" : "currency"}>
        ₾
      </div>
    </div>
  );
};

export default ValuteToggle;