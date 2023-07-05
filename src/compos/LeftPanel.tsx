import React, { useEffect, useState } from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { TbTractor } from 'react-icons/tb'
import { FaMotorcycle } from 'react-icons/fa'
import Garigeba from './Garigeba'
import MotoIcon from './MotoIcon'
import CarIcon from './CarIcon'
import TractorIcon from './TractorIcon'
import Mwarmoebeli from './Mwarmoebeli'
import Model from './Model'
import Category from './Category'
import { CarItem, ManModels, Manufacturer, ModelType, CategoryType, CheckboxState, checkedElement } from './dataTypes'
import { CgTrashEmpty } from 'react-icons/cg'
import ValuteToggle from './ValuteToggle'
import YearDropDown from './YearDropDown'
import {GrFormClose} from 'react-icons/gr'
// create LeftPanel prop interface
interface LeftPanelProps {
    prodType: number;
    setProdType: React.Dispatch<React.SetStateAction<number>>;
    valuteDollar: boolean;
    setValuteDollar: React.Dispatch<React.SetStateAction<boolean>>;

    vehicleType: number;
    setVehicleType: React.Dispatch<React.SetStateAction<number>>;
    checkedManList: Manufacturer[];
    setCheckedManList: React.Dispatch<React.SetStateAction<Manufacturer[]>>;
    activeManNames: string[];
    setActiveManNames: React.Dispatch<React.SetStateAction<string[]>>;
    checkedModels: ModelType[];
    setCheckedModels: React.Dispatch<React.SetStateAction<ModelType[]>>;
    checkedModelsNames: string[];
    setCheckedModelsNames: React.Dispatch<React.SetStateAction<string[]>>;
    checkedCatList: CategoryType[];
    setCheckedCatList: React.Dispatch<React.SetStateAction<CategoryType[]>>;
    catList: CategoryType[];
    setCatList: React.Dispatch<React.SetStateAction<CategoryType[]>>;
    manList: Manufacturer[];
    setManList: React.Dispatch<React.SetStateAction<Manufacturer[]>>;
    checkboxes: CheckboxState;
    setCheckboxes: React.Dispatch<React.SetStateAction<CheckboxState>>;
    priceInterval: number[];
    setPriceInterval: React.Dispatch<React.SetStateAction<number[]>>;
    timeInterval: number[];
    setTimeInterval: React.Dispatch<React.SetStateAction<number[]>>;
    handleSearch: () => void;
    ForRent: boolean;
    setForRent: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    checkedElements: checkedElement[];
    setCheckedElements: React.Dispatch<React.SetStateAction<checkedElement[]>>;
    updateMans: (lst: Manufacturer[]) => void;
    updateModels: (lst: ModelType[]) => void;
    updateCats: (lst: CategoryType[]) => void;
    showCheckedElements: boolean;
    setShowCheckedElements: React.Dispatch<React.SetStateAction<boolean>>;
    screenWidth: number | undefined;
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}



// Create LeftPanel component
const LeftPanel: React.FC<LeftPanelProps> = ({ prodType, setProdType, valuteDollar, setValuteDollar,
    vehicleType, setVehicleType, checkedManList, setCheckedManList,
    activeManNames, setActiveManNames, checkedModels, checkedModelsNames, setCheckedModelsNames,
    checkedCatList, setCheckedCatList, catList, setCatList, manList, setManList, setCheckedModels,
    checkboxes, setCheckboxes, timeInterval, setTimeInterval, priceInterval, setPriceInterval,
    handleSearch, ForRent, setForRent, currentPage, setCurrentPage, updateMans, updateModels, updateCats,
    showCheckedElements, setShowCheckedElements, checkedElements, setCheckedElements, screenWidth, showFilter,setShowFilter }) => {


    // const [checkedManList, setCheckedManList] = useState<string[]>([]);


    const [garigebaOpen, setGarigebaOpen] = useState<boolean>(false);
    const [mwarmoebeliOpen, setMwarmoebeliOpen] = useState<boolean>(false);
    const [modelOpen, setModelOpen] = useState<boolean>(false);
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
    const [ManModelList, setManModelList] = useState<ManModels[]>([]);
    const [y1open, setY1open] = useState<boolean>(false);
    const [y2open, setY2open] = useState<boolean>(false);




    const setAllFalse = (): void => {
        setCheckboxes({
            იყიდება: false,
            ქირავდება: false,
            დღიურად: false,
            მძღოლით: false,
            შესყიდვით: false,
            დაზღვეული: false,
        });
    };

    const resetAllDropStates = () => {
        setGarigebaOpen(false);
        setMwarmoebeliOpen(false);
        setModelOpen(false);
        setCategoryOpen(false);
        setY1open(false);
        setY2open(false);
    }

    const resetEverything = () => {
        setCheckedManList([]);
        setActiveManNames([]);
        setCheckedModels([]);
        setCheckedModelsNames([]);
        setCheckedCatList([]);
        setValuteDollar(false);
        resetAllDropStates();
        setCheckedElements([])
        setCheckboxes({
            იყიდება: false,
            ქირავდება: false,
            დღიურად: false,
            მძღოლით: false,
            შესყიდვით: false,
            დაზღვეული: false,
        });
        setY1open(false);
        setY2open(false);
        setTimeInterval([0, 0]);
        setPriceInterval([0, 0]);

    }

    const handleOptionClick = (man: Manufacturer) => {

        let lst = checkedManList;
        if (lst.includes(man)) {
            lst = lst.filter(m => m != man);
            // remove man.man_name from activeManNames
            const newActiveNames = activeManNames.filter(name => name !== man.man_name)
            setActiveManNames(newActiveNames)

        }
        else {
            lst.push(man)
        }
        setCheckedManList(lst);
        updateMans(lst);
        fetchModels(lst);
    }

    const handleModelClick = (model: ModelType) => {
        let lst = checkedModels;
        if (lst.includes(model)) {
            lst = lst.filter(m => m != model);
            const newCheckedModelsNames = checkedModelsNames.filter(name => name !== model.model_name)
            setCheckedModelsNames(newCheckedModelsNames)
        }
        else {
            lst.push(model)
            setCheckedModelsNames([...checkedModelsNames, model.model_name])
        }
        setCheckedModels(lst);
        updateModels(lst)
    }

    const resetModelList = () => {
        setManModelList([])
    }

    const handleCatClick = (cat: CategoryType) => {
        const updatedCheckedCatList = checkedCatList.includes(cat)
            ? checkedCatList.filter((c) => c !== cat)
            : [...checkedCatList, cat];
        setCheckedCatList(updatedCheckedCatList);
        updateCats(updatedCheckedCatList)
    }

    const fetchManufacturers = async (vehType: number): Promise<Manufacturer[]> => {
        const res = await fetch(`https://static.my.ge/myauto/js/mans.json`);
        const data = await res.json();
        const resolvedManJsonData = Promise.all(data as Manufacturer[]);
        setCheckedManList([])
        setActiveManNames([])
        setCheckedModels([])
        setCheckedModelsNames([])
        fetchCategories(vehType).then(data => console.log(data));
        setCheckedCatList([])
        const filteredData = (await resolvedManJsonData).filter(
            (man) => {
                if (vehType === 1) {
                    return man.is_car === "1";
                } else if (vehType === 2) {
                    return man.is_spec === "1";
                } else if (vehType === 3) {
                    return man.is_moto === "1";
                }
                else {
                    return false;
                }
            }
        );
        return filteredData;
    }

    const fetchModels = async (checkedManList: Manufacturer[]): Promise<void> => {
        const ManModelList: ManModels[] = await Promise.all(
            checkedManList.map(async (man) => {
                const res = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${man.man_id}`);
                const data = await res.json();
                const resolvedModelJsonData = Promise.all(data.data as ModelType[]);
                const models = await resolvedModelJsonData;

                return { man, models };
            })
        );
        // console.log(ManModelList)
        setManModelList(ManModelList)
    };


    const fetchCategories = async (vehType: number): Promise<CategoryType[]> => {
        const res = await fetch("https://api2.myauto.ge/ka/cats/get");
        const data = await res.json();
        const dataArray = data.data as CategoryType[];
        // const dataArray = Array.isArray(data) ? data : []; // Cast data as an array
        const filteredData = dataArray.filter((cat: CategoryType) => {
            if (vehType === 1) {
                return cat.vehicle_types.includes(0);
            } else if (vehType === 2) {
                return cat.vehicle_types.includes(1);
            } else if (vehType === 3) {
                return cat.vehicle_types.includes(2);
            } else {
                throw new Error("Invalid vehType");
            }
        });
        setCatList(filteredData);
        return filteredData;
    };

    useEffect(() => {
        fetchManufacturers(1).then((data) => { setManList(data); });

    }, []);

    const setYear1 = (year: number) => {
        setTimeInterval([year, timeInterval[1]])
    }
    const setYear2 = (year: number) => {
        setTimeInterval([timeInterval[0], year])
    }


    const setPriceInterval1 = (price: number) => {
        setPriceInterval([price, priceInterval[1]])
    }

    const setPriceInterval2 = (price: number) => {
        setPriceInterval([priceInterval[0], price])
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        if (name === 'price1') {
            if (value === '') {
                setPriceInterval1(0)
                return
            }
            setPriceInterval1(parseInt(value))
        }
        if (name === 'price2') {
            if (value === '') {
                setPriceInterval1(0)
                return
            }
            setPriceInterval2(parseInt(value))
        }
    }
    const myHandleSearch = async () => {
        handleSearch();
        setShowCheckedElements(true)
    }
    return (
        <div className={showFilter?'LeftPanel':'LeftPanel LeftPanelDis'}>
            {screenWidth && screenWidth < 1200 && (
                <div className='LeftPanelBTN' onClick={() => setShowFilter(false)}><GrFormClose/></div>
            )}
            <div className="VehicleSelector">
                <button className={prodType == 1 ? "VehicleSelector-1 active" : "VehicleSelector-1"} onClick={() => {
                    setProdType(1);
                    setVehicleType(1);
                    fetchManufacturers(1).then((data) => { setManList(data); });
                }}>
                    {/* <AiOutlineCar /> */}
                    <CarIcon color={prodType == 1 ? "#FD4100" : "#8C929B"} />
                </button>
                <button className={prodType == 2 ? "VehicleSelector-2 active" : "VehicleSelector-2"} onClick={() => {
                    setProdType(2);
                    setVehicleType(2);
                    fetchManufacturers(2).then((data) => { setManList(data); });
                }}>
                    {/* <TbTractor/> */}
                    <TractorIcon color={prodType == 2 ? "#FD4100" : "#8C929B"} />
                </button>
                <button className={prodType == 3 ? "VehicleSelector-3 active" : "VehicleSelector-3"} onClick={() => {
                    setProdType(3);
                    setVehicleType(3);
                    fetchManufacturers(3).then((data) => { setManList(data); });
                }}>
                    {/* <FaMotorcycle/> */}
                    <MotoIcon color={prodType == 3 ? "#FD4100" : "#8C929B"} />
                </button>
            </div>
            <div className="Filter">
                <div className='Filter-1'>
                    <p>გარიგების ტიპი</p>
                    <Garigeba drop={garigebaOpen} ForRent={ForRent} setForRent={setForRent} setDrop={setGarigebaOpen} closeOthers={resetAllDropStates} setCheckboxes={setCheckboxes} checkboxes={checkboxes} setAllFalse={setAllFalse} />
                </div>
                <div className='Filter-2'>
                    <p>მწარმოებელი</p>
                    <Mwarmoebeli name='მწარმოებელი' checkedElements={checkedElements} setCheckedElements={setCheckedElements} activeNames={activeManNames} setActiveNames={setActiveManNames} manList={manList} checkedManList={checkedManList} handleOptionClick={handleOptionClick} setAllFalse={() => setCheckedManList([])} drop={mwarmoebeliOpen} setDrop={setMwarmoebeliOpen} closeOthers={resetAllDropStates} setCheckedModelsNames={setCheckedModelsNames} resetModelList={resetModelList} />
                </div>
                <div className='Filter-3'>
                    <p>მოდელი</p>

                    <Model name='მოდელი' manModelList={ManModelList} checkedManList={checkedManList} manToggler={handleOptionClick} handleModelClick={handleModelClick} checkedModels={checkedModels} checkedModelsNames={checkedModelsNames}
                        drop={modelOpen} setDrop={setModelOpen} closeOthers={resetAllDropStates} resetCheckLists={() => {
                            setCheckedModels([]);
                            setCheckedModelsNames([]);

                        }} />
                </div>
                <div className='Filter-4'>
                    <p>კატეგორია</p>
                    <Category name='კატეგორია' drop={categoryOpen} resetCheckLists={() => setCheckedCatList([])} setDrop={setCategoryOpen} checkedCatList={checkedCatList} closeOthers={resetAllDropStates} catList={catList} handleOptionClick={handleCatClick} />
                </div>
            </div>
            <div className="Price">
                <div className="priceValute">
                    <div className='prText'>ფასი</div>
                    <ValuteToggle valuteDollar={valuteDollar} setValuteDollar={setValuteDollar} />
                </div>
                <div className="priceInput">
                    <input
                        type="text"
                        name="price1"
                        className="priceInput-1"
                        onChange={handlePriceChange}
                        placeholder={priceInterval[0] === 0 ? "დან" : ""}
                        value={priceInterval[0] ? priceInterval[0] : ''}
                    />
                    <div>-</div>
                    <input
                        type="text"
                        name="price2"
                        className="priceInput-2"
                        placeholder={priceInterval[1] === 0 ? "მდე" : ""}
                        onChange={handlePriceChange}
                        value={priceInterval[1] ? priceInterval[1] : ''}
                    />
                </div>
            </div>
            {/* <div className="Time">
                <div className="Time-Content">
                    <div className="Time-title">
                        წელი
                    </div>
                    <div className="Time-Year">
                        <YearDropDown drop={y1open} setDrop={setY1open} setYear={setYear1} year={timeInterval[0]} closeOthers={resetAllDropStates} placeHolder='დან' />
                        <div>-</div>
                        <YearDropDown drop={y2open} setDrop={setY2open} setYear={setYear2} year={timeInterval[1]} closeOthers={resetAllDropStates} placeHolder='მდე' />
                    </div>
                </div>
            </div> */}
            <div className="Search">
                <button className='Search-btn' onClick={() => { myHandleSearch(); setCurrentPage(1); }}>მოძებნე</button>
                <button className='Search-clear' onClick={() => resetEverything()}><CgTrashEmpty /></button>
            </div>
        </div>
    )
}

export default LeftPanel