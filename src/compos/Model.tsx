import React, { ChangeEvent, useEffect, useState } from 'react';
import DropDown from './DropDown';
import { ManModels, Manufacturer, ModelType } from './dataTypes';
import { BsCheck } from 'react-icons/bs';
import EmptyFilter from './EmptyFilter';
interface Props {
    name: string;
    manModelList: ManModels[];
    manToggler: (manId: Manufacturer) => void;
    handleModelClick: (model: ModelType) => void;
    checkedModels: ModelType[];
    checkedModelsNames: string[];
    checkedManList: Manufacturer[];
    drop: boolean;
    setDrop: React.Dispatch<React.SetStateAction<boolean>>;
    closeOthers: () => void;
    resetCheckLists: () => void;
}
const Model: React.FC<Props> = ({ name, manModelList, manToggler, handleModelClick, checkedManList, checkedModels, checkedModelsNames, drop, setDrop, closeOthers,resetCheckLists }) => {

    // const [drop, setDrop] = useState<boolean>(false)

    useEffect(() => {
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
    }, [drop, setDrop]);


    const getNames = (): string => {
        if (checkedModelsNames.length > 0) {
            let res = checkedModelsNames.join(', ');
            if (res.length > 10) {
                return res.slice(0, 10) + '...';
            }
            return res;
        }
        return 'მოდელი';
    }
    const realName = getNames();

    const newSetDrop = () => {
        closeOthers();
        checkedManList.length > 0 && !drop ? setDrop(true) : setDrop(false);
    };
    return (
        <div className="DropDownCover">
            <DropDown drop={drop} setDrop={newSetDrop} name={realName} activeCheckboxes={0} emptySelected={function (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
                throw new Error('Function not implemented.');
            }} />
            {drop && (
                <div className="DropSection">

                    <div className='DropSection-Options'>
                        {manModelList.map((manModel,index) => (
                            <div key={index}>
                                <div className='DropSection-Option' key={index} onClick={() => manToggler(manModel.man)}>
                                    <div className="checker checkered" >
                                        <BsCheck />
                                    </div>
                                    <div className="DropSection-Header-Man" key={manModel.man.man_id} >
                                        <div className="DropSection-h">{manModel.man.man_name}</div>
                                        {/* <div className="DropSection-b"></div> */}
                                    </div>

                                </div>
                                {manModel.models.map((model,index) => (
                                    <div className='DropSection-Option' key={index} onClick={() => handleModelClick(model)}>
                                        <div className={checkedModels.includes(model) ? "checker checkered" : "checker"} >
                                            <BsCheck />
                                        </div>
                                        <div className="DropSection-Option-t">{model.model_name}</div>
                                    </div>
                                ))}


                            </div>
                        ))}


                    </div>
                    <EmptyFilter setAllFalse={resetCheckLists} setDrop={setDrop} />
                </div>

            )}
        </div>



    )
}

export default Model