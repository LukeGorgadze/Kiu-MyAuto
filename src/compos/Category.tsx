import React, { ChangeEvent, useEffect, useState } from 'react';
import DropDown from './DropDown';
import { CategoryType } from './dataTypes';
import { BsCheck } from 'react-icons/bs';
import EmptyFilter from './EmptyFilter';
interface Props {
    name: string;
    drop: boolean;
    setDrop: React.Dispatch<React.SetStateAction<boolean>>;
    closeOthers: () => void;
    catList: CategoryType[];
    handleOptionClick: (catId: CategoryType) => void;
    checkedCatList: CategoryType[];
    resetCheckLists: () => void;
}
const Category: React.FC<Props> = ({ name, drop, setDrop, closeOthers, catList, checkedCatList, handleOptionClick, resetCheckLists }) => {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const targetElement = event.target as Element;

            if (drop && !targetElement.closest('.DropDownCover') && !targetElement.closest('.DropSection')) {
                setDrop(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [drop, setDrop]);

    const getNames = (): string => {
        if (checkedCatList.length > 0) {
            let res = checkedCatList.map((cat) => cat.title).join(', ');
            if (res.length > 10) {
                return res.slice(0, 10) + '...';
            }
            return res;
        } else {
            return name;
        }
    };
    const newSetDrop = () => {
        closeOthers();
        setDrop(!drop);
    };
    const myName = getNames();
    return (
        <div className="DropDownCover">
            <DropDown drop={drop} setDrop={setDrop} name={myName} activeCheckboxes={0} emptySelected={function (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
                throw new Error('Function not implemented.');
            }} />
            {drop && (
                <div className="DropSection" key={myName}>
                    <div className="DropSection-Options">
                        {catList.map((cat) => (
                            <div className="DropSection-Option" key={cat.category_id}
                                onClick={() => {
                                    handleOptionClick(cat);
                                    console.log(checkedCatList)
                                }}>
                                <div className={checkedCatList.includes(cat) ? "checker checkered" : "checker"}><BsCheck /></div>
                                <div className="DropSection-Option-t">{cat.title}</div>
                            </div>
                        ))}
                    </div>
                    <EmptyFilter setAllFalse={resetCheckLists} setDrop={newSetDrop} />

                </div>
            )
            }
        </div>
    )
}

export default Category