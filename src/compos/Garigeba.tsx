import React, { ChangeEvent, useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import EmptyFilter from './EmptyFilter';
import { CgClose } from 'react-icons/cg'
import {CheckboxState} from './dataTypes'

interface Props {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  closeOthers: () => void;
  setAllFalse: () => void;
  setCheckboxes: React.Dispatch<React.SetStateAction<CheckboxState>>;
  checkboxes: CheckboxState;
  ForRent: boolean;
  setForRent: React.Dispatch<React.SetStateAction<boolean>>;
}

const Garigeba: React.FC<Props> = ({ drop, setDrop, closeOthers,setAllFalse,setCheckboxes,checkboxes,ForRent,setForRent }) => {
 

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === 'ქირავდება' && !checked) {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        დღიურად: false,
        მძღოლით: false,
        შესყიდვით: false,
        დაზღვეული: false,
      });
    }
    else if (name === 'ქირავდება' && checked) {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        იყიდება: false,
      });
      setForRent(true)
    }
    else if (name === 'იყიდება' && checked) {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        ქირავდება: false,
        დღიურად: false,
        მძღოლით: false,
        შესყიდვით: false,
        დაზღვეული: false,
      });
      setForRent(false)
    }
    else if ((name === 'დღიურად' || name === 'მძღოლით' || name === 'შესყიდვით' || name === 'შესყიდვით' || name === 'დაზღვეული') && checked) {
      setCheckboxes({ ...checkboxes, [name]: checked, ['ქირავდება']: checked, ['იყიდება']: false });
      setForRent(true)
    } else {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
  };

  // create function to set all checkboxes to false
  

  const close = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    setAllFalse();
  }
  const getActiveCheckboxeStrings = () => {
    const activeCheckboxes = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name);
    // make string out of activeCheckboxes
    if (activeCheckboxes.length >= 1) {
      let res = activeCheckboxes.join(', ');
      // if res is too long, cut it and add '...'
      if (res.length > 15) {
        res = res.slice(0, 15) + '...';
      }
      return res;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      if (drop && !targetElement.closest('.GarigebaContainer') && !targetElement.closest('.EmptyFilter')) {
        setDrop(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [drop, setDrop]);

  const getActiveChecboxes = () => {
    const activeCheckboxes = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name);
    return activeCheckboxes;
  }

  const activeList = getActiveCheckboxeStrings();
  const activeCheckboxes = getActiveChecboxes().length;
  return (
    <div className="GarigebaContainer">
      <div className="Garigeba" onClick={() => { closeOthers(); setDrop(!drop) }}>
        <div className='Garigeba-t'>{activeList ? activeList : "გარიგების ტიპი"}</div>
        {activeCheckboxes == 0 && <div className={drop ? "arrow rotate" : "arrow"}><IoIosArrowDown /></div>}
        {activeCheckboxes > 0 && (
          <div onClick={close} className='arrow'  >
            <CgClose />
          </div>
        )}

      </div>
      {drop &&
        <div className='Garigeba-DropDown'>
          <div className="Garigeba-options">
            {/* Separate first two checkboxes */}
            <div className="checkboxCover"
              onClick={() =>
                handleCheckboxChange({
                  target: { name: 'იყიდება', checked: !checkboxes.იყიდება },
                } as ChangeEvent<HTMLInputElement>)
              }>
              <div
                className={checkboxes.იყიდება ? 'checker checkered' : 'checker'}
              >
                <BsCheck />
              </div>
              <div
                key="იყიდება"
                className={
                  checkboxes.იყიდება ? 'checkbox checked' : 'checkbox'
                }
              >
                იყიდება
              </div>
            </div>
            <div className="checkboxCover"
              onClick={() =>
                handleCheckboxChange({
                  target: { name: 'ქირავდება', checked: !checkboxes.ქირავდება },
                } as ChangeEvent<HTMLInputElement>)
              }>
              <div
                className={checkboxes.ქირავდება ? 'checker checkered' : 'checker'}
              ><BsCheck /></div>
              <div
                key="ქირავდება"
                className={
                  checkboxes.ქირავდება ? 'checkbox checked' : 'checkbox'
                }
              >
                ქირავდება
              </div>
            </div>
            <div className="checkboxesInside">
              {/* Remaining checkboxes */}
              {Object.entries(checkboxes)
                .slice(2)
                .map(([name, checked]) => (
                  <div className="checkboxCover"
                    key={name}
                    onClick={() =>
                      handleCheckboxChange({
                        target: { name, checked: !checked },
                      } as ChangeEvent<HTMLInputElement>)
                    }>
                    <div
                      className={checked ? 'checker checkered' : 'checker'}
                    >
                      <BsCheck />
                    </div>
                    <div
                      key={name}
                      className={checked ? 'checkbox checked' : 'checkbox'}
                    >
                      {name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {activeCheckboxes > 0 && (
            <div className='EmptyFilter'>
              <EmptyFilter setAllFalse={setAllFalse} setDrop={setDrop} /></div>
          )}
        </div>
      }

    </div>
  );
};

export default Garigeba;
