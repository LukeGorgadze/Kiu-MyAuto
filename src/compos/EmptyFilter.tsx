import React, { FC } from 'react';

interface Props {
  setAllFalse: () => void;
  setDrop: (value: boolean) => void;
}

const EmptyFilter: FC<Props> = ({ setAllFalse, setDrop }) => {
  return (
    <div className="emptyFilter">
      <div className='emptyFilter-txt' onClick={() => setAllFalse()}>ფილტრის გასუფთავება</div>
      <div className="searchBtn" onClick={() => setDrop(false)}>არჩევა</div>
    </div>
  );
};

export default EmptyFilter;
