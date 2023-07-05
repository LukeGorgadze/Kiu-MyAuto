import React, { ChangeEvent, useState, useEffect } from 'react';
import DropDown from './DropDown';
import { Manufacturer, checkedElement } from './dataTypes';
import { BsCheck } from 'react-icons/bs';
import EmptyFilter from './EmptyFilter';
import { CgClose } from 'react-icons/cg';

interface Props {
  name: string;
  manList: Manufacturer[];
  handleOptionClick: (manId: Manufacturer) => void;
  checkedManList: Manufacturer[];
  setAllFalse: () => void;
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  closeOthers: () => void;
  activeNames: string[];
  setActiveNames: React.Dispatch<React.SetStateAction<string[]>>;
  setCheckedModelsNames: React.Dispatch<React.SetStateAction<string[]>>;
  resetModelList: () => void;
  checkedElements:checkedElement[];
  setCheckedElements:React.Dispatch<React.SetStateAction<checkedElement[]>>;
}

const Mwarmoebeli: React.FC<Props> = ({
  name,
  manList,
  handleOptionClick,
  checkedManList,
  setAllFalse,
  drop,
  setDrop,
  closeOthers,
  activeNames,
  setActiveNames,
  setCheckedModelsNames,
  resetModelList,
  checkedElements,
  setCheckedElements
}) => {
  const activeCheckboxes = checkedManList.length;

  const emptySelected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    resetCheckLists();
    setAllFalse();
    resetModelList();
  };


  const handleOptionClickName = (manName: string) => {
    setActiveNames((prevManNames) => {
      if (prevManNames.includes(manName)) {
        return prevManNames.filter((name) => name !== manName);
      } else {
        return [...prevManNames, manName];
      }
    });
    // console.log(activeNames);
  };

  const getNames = (): string => {
    if (activeNames.length > 0) {
      let res = activeNames.join(', ');
      if (res.length > 10) {
        return res.slice(0, 10) + '...';
      }
      return res;
    }
    return name;
  };

  const resetCheckLists = (): void => {
    setAllFalse();
    setCheckedModelsNames([]);
    setActiveNames([]);
    setCheckedElements([]);
  };

  const newSetDrop = () => {
    closeOthers();
    setDrop(!drop);
  };

  {useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      if (drop && !targetElement.closest('.DropDownCover')) {
        setDrop(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [drop, setDrop]);}

  const DropDownName = getNames();

  return (
    <div className="DropDownCover">
      <DropDown
        drop={drop}
        setDrop={newSetDrop}
        name={DropDownName}
        activeCheckboxes={activeCheckboxes}
        emptySelected={emptySelected}
      />
      {drop && (
        <div className="DropSection">
          <div className="DropSection-Header">
            <div className='DropSection-hsm'>
              <div className="DropSection-h">პოპულარული</div>
            </div>
            {/* <div className="DropSection-b"></div> */}
          </div>
          <div className="DropSection-Options">
            {manList.map((man: Manufacturer) => (
              <div
                className="DropSection-Option"
                onClick={() => {
                  handleOptionClick(man);
                  handleOptionClickName(man.man_name);
                  console.log(man.man_name)
                }}
                key={man.man_id}
              >
                <div
                  className={
                    checkedManList.includes(man)
                      ? 'checker checkered'
                      : 'checker'
                  }
                >
                  <BsCheck />
                </div>
                <div className="DropSection-Option-t">{man.man_name}</div>
              </div>
            ))}
          </div>
          <EmptyFilter setAllFalse={resetCheckLists} setDrop={setDrop} />
        </div>
      )}
    </div>
  );
};

export default Mwarmoebeli;
