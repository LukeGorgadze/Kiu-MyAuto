import React, { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io'
import { CgClose } from 'react-icons/cg'

interface DropDownProps {
    name: string;
    setDrop: React.Dispatch<React.SetStateAction<boolean>>;
    drop: boolean;
    activeCheckboxes: number;
    emptySelected: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DropDown: React.FC<DropDownProps> = ({ name, drop, setDrop, activeCheckboxes, emptySelected }) => {
    return (
        <div>
            <div className='DropDown' onClick={() => setDrop(!drop)}>
                <div className='DropDown-title'>{name}</div>
                {activeCheckboxes === 0 && <div className={drop ? "arrow rotate" : "arrow"}><IoIosArrowDown /></div>}
                {activeCheckboxes > 0 && (
                    <div onClick={emptySelected} className='arrow'  >
                        <CgClose />
                    </div>
                )}
            </div>
            {
                drop && <div className='DropDownContent'></div>
            }
        </div>
    )
}

export default DropDown;
