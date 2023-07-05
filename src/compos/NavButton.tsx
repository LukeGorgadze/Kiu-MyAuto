import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io';

interface Props {
    name: string;
    drop: boolean;
    setDrop: React.Dispatch<React.SetStateAction<boolean>>;
    resetDrops: () => void;
    options: string[];
    chosenState: number;
    setChosenState: React.Dispatch<React.SetStateAction<number>>;
    handleSort: (num: number) => void;
}

const NavButton: React.FC<Props> = ({ name, drop, setDrop, resetDrops, options, chosenState, setChosenState, handleSort }) => {
    const clickHandler = () => {
        resetDrops();
        setDrop(!drop);
    }

    const optionClicker = (num: number) => {
        setChosenState(num);
        setDrop(false);
        handleSort(num);
        console.log(num)

    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const targetElement = event.target as Element;
            if (drop && !targetElement.closest('.FilterCover')) {
                setDrop(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [drop, setDrop]);

    return (
        <div className='FilterCover'>
            <button className='MainPanel-filter' onClick={() => clickHandler()}>
                <div className='MainPanel-filter-t'>{chosenState == -1 ? name : options[chosenState - 1]}</div>
                <div className={drop ? "arrow rotate" : "arrow"}> <IoIosArrowDown /></div>

            </button >
            {drop && (
                <div className='DropSectionFilter'>
                    <div className="DropSection-FilterOptions">
                        {options.map((option, index) => (
                            <div className='FilterOption' key={option} onClick={() => optionClicker(index + 1)}>
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default NavButton;