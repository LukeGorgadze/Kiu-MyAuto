import React, { useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import MainPanel from './MainPanel';
import { Car, CarItem, CategoryType, CheckboxState, ManModels, Manufacturer, ModelType, checkedElement } from './dataTypes';
import Loader from './Loader';

// Create PageContent component
const PageContent: React.FC = () => {
    const [prodType, setProdType] = useState<number>(1);
    const [valuteDollar, setValuteDollar] = useState<boolean>(true);

    // Add every state below to MainPanel as props

    // Deal type
    const [checkboxes, setCheckboxes] = useState<CheckboxState>({
        იყიდება: false,
        ქირავდება: false,
        დღიურად: false,
        მძღოლით: false,
        შესყიდვით: false,
        დაზღვეული: false,
    });

    // Vehicle type
    const [vehicleType, setVehicleType] = useState<number>(1);

    // Manufacturers
    const [manList, setManList] = useState<Manufacturer[]>([]);
    const [checkedManList, setCheckedManList] = useState<Manufacturer[]>([]);
    const [activeManNames, setActiveManNames] = useState<string[]>([]);

    // Models
    const [checkedModels, setCheckedModels] = useState<ModelType[]>([]);
    const [checkedModelsNames, setCheckedModelsNames] = useState<string[]>([]);

    // Categories
    const [catList, setCatList] = useState<CategoryType[]>([]);
    const [checkedCatList, setCheckedCatList] = useState<CategoryType[]>([]);

    // Price and time intervals
    const [priceInterval, setPriceInterval] = useState<number[]>([0, 0]);
    const [timeInterval, setTimeInterval] = useState<number[]>([0, 0]);

    const [data, setData] = useState<CarItem[]>([]);
    const [showTime, setShowTime] = useState(false)

    const [totalPosts, setTotalPosts] = useState<number>(0);

    // Product API parameter keys
    const [ForRent, setForRent] = useState<boolean>(false)
    const [Mans, setMans] = useState<string>("")
    const [chosenPeriod, setChosenPeriod] = useState<number>(-1)
    const [chosenSort, setChosenSort] = useState<number>(-1)
    const [Cats, setCats] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPageCount, setTotalPageCount] = useState(0)
    const [url, setUrl] = useState<string>("https://api2.myauto.ge/ka/products/?")

    // ------------------------------

    // Store checkedManList, checkedModels, checkedCatList elements in a separate array and create wrapper objects for them, which will also have a function to remove them from this array and checkedlists

    const [checkedElements, setcheckedElemetns] = useState<checkedElement[]>([])
    const [checkedManElements, setcheckedManElemetns] = useState<checkedElement[]>([])
    const [checkedModelElements, setcheckedModelElemetns] = useState<checkedElement[]>([])
    const [checkedCatElements, setcheckedCatElemetns] = useState<checkedElement[]>([])
    const [showCheckedElements, setShowCheckedElements] = useState<boolean>(false)

    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
    const [showFilter, setShowFilter] = useState<boolean>(false)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Initial screen width
        setScreenWidth(window.innerWidth);

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const updateMans = (lst: Manufacturer[]) => {
        const newCheckedElements: checkedElement[] = lst.map(ch => ({
            element: ch,
            removeSelfOrigin: null,
            removeSelfRelative: null
        }));
        setcheckedManElemetns(newCheckedElements)
    }
    const updateCats = (lst: CategoryType[]) => {
        const newCheckedElements: checkedElement[] = lst.map(ch => ({
            element: ch,
            removeSelfOrigin: null,
            removeSelfRelative: null
        }));
        setcheckedCatElemetns(newCheckedElements);
    };
    const updateModels = (lst: ModelType[]) => {
        const newCheckedElements: checkedElement[] = lst.map(ch => ({
            element: ch,
            removeSelfOrigin: null,
            removeSelfRelative: null
        }));
        setcheckedModelElemetns(newCheckedElements)
    }

    // ------------------------------


    const getProperUrl = (manStr: string, catStr: string) => {
        let myurl = url
        let rentNum = ForRent ? 1 : 0
        myurl += `ForRent=${rentNum}&`
        if (manStr !== "")
            myurl += `Mans=${manStr}&`
        if (catStr !== "")
            myurl += `Cats=${catStr}&`
        if (priceInterval[0] !== 0)
            myurl += `PriceFrom=${priceInterval[0]}&`
        if (priceInterval[1] !== 0)
            myurl += `PriceTo=${priceInterval[1]}&`
        if (currentPage !== 1) {
            myurl += `Page=${currentPage}&`
        }
        return myurl
    }
    const chosenPer = (num: number) => {
        let nnum = num
        let sym = ""
        if (nnum > 0 && nnum < 4) {
            console.log("noice")
            sym = "h"
        } else if (nnum >= 4 && nnum < 7) {
            nnum -= 3
            sym = "d"
        }
        else if (nnum >= 7) {
            nnum -= 6
            sym = "w"
        }
        const chosenPerStr = nnum + sym
        return chosenPerStr
    }
    const handleSearch = () => {
        setShowTime(false);
        setShowCheckedElements(true)
        updateCheckedElements(checkedManElements, checkedModelElements, checkedCatElements)
        const fetchCarData = async () => {
            try {
                // ASSUME YOU KNOW EVERY ENDPOINT, MOVE ON
                // let url = "";
                let manStr = ""
                let catStr = ""
                if (checkedManList.length > 0 && checkedModels.length === 0) {
                    manStr = checkedManList.map((man) => man.man_id).join("-");
                    setMans(manStr)
                    console.log(manStr, "MAAANS")
                    // url = `https://api2.myauto.ge/ka/products/?Mans=${str}`;
                }
                else {
                    const mappedData: { [key: string]: number[] } = {};
                    checkedModels.forEach((model) => {
                        const modelIds = mappedData[model.man_id] || [];
                        modelIds.push(model.model_id);
                        mappedData[model.man_id] = modelIds;
                    });

                    const mappedDataString = Object.keys(mappedData)
                        .map((key) => {
                            const modelIds = mappedData[key];
                            return `${key}.${modelIds.join(".")}`;
                        }).join("-")
                    setMans(mappedDataString)
                    manStr = mappedDataString
                    // url = `https://api2.myauto.ge/ka/products/?Mans=${mappedDataString}`;
                }

                if (checkedCatList.length > 0) {
                    catStr = checkedCatList.map((cat) => cat.category_id).join(".");
                    setCats(catStr)
                }


                let myurl = getProperUrl(manStr, catStr);
                if (chosenPeriod !== -1) {
                    let chosenPeriodStr = chosenPer(chosenPeriod)
                    myurl += `Period=${chosenPeriodStr}&`
                }
                if (chosenSort !== -1) {
                    myurl += `SortOrder=${chosenSort}&`
                }
                const response = await fetch(myurl);
                const jsonData = await response.json();
                const { items: carlist, meta } = jsonData.data;
                setTotalPosts(meta.total)
                setTotalPageCount(meta.last_page)


                const fetchRequests = carlist.map(async (car: { man_id: number; model_id: number }) => {
                    const [modelResponse, manResponse] = await Promise.all([
                        fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${car.man_id}`),
                        fetch(`https://static.my.ge/myauto/js/mans.json`),
                    ]);
                    const [modelJsonData, manJsonData] = await Promise.all([
                        modelResponse.json(),
                        manResponse.json(),
                    ]);
                    const resolvedModelJsonData = Promise.all(modelJsonData.data as ModelType[]);
                    const resolvedManJsonData = Promise.all(manJsonData as Manufacturer[]);
                    const [respManData, respModelData] = await Promise.all([resolvedManJsonData, resolvedModelJsonData]);
                    const modelItem = respModelData.find((model: ModelType) => model.model_id === car.model_id);
                    const manufacturer = respManData.find((man: Manufacturer) => parseInt(man.man_id) === car.man_id);
                    const carItem = { Car: car, Model: modelItem, Man: manufacturer };
                    return carItem;
                });
                const carItems: CarItem[] = await Promise.all(fetchRequests);
                console.log(carItems, "AAAA");
                setShowTime(true);
                setData(carItems);
                console.log(myurl)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchCarData();
    };
    useEffect(() => {
        updateMans(checkedManList);
        console.log(checkedElements, "checkedElements")
    }, [checkedManList]);

    useEffect(() => {
        updateModels(checkedModels);
        console.log(checkedElements, "checkedElements")
    }, [checkedModels]);

    useEffect(() => {
        updateCats(checkedCatList);
        console.log(checkedElements, "checkedElements")
    }, [checkedCatList]);

    useEffect(() => {
        handleSearch();

    }, [currentPage]);

    useEffect(() => {
        if (checkedElements.length == 0) {
            setShowCheckedElements(false)
        }
    }, [checkedElements]);


    const updateCheckedElements = (checkedManElements: checkedElement[], checkedModelElements: checkedElement[], checkedCatElements: checkedElement[]) => {
        const newCheckedElements: checkedElement[] = [...checkedManElements, ...checkedModelElements, ...checkedCatElements]
        setcheckedElemetns(newCheckedElements)
    }
    // useEffect(() => {
    //     // add these three lists to checkedElements
    //     if (showCheckedElements) {
    //         const newCheckedElements: checkedElement[] = [...checkedManElements, ...checkedModelElements, ...checkedCatElements]
    //         setcheckedElemetns(newCheckedElements)
    //         setShowCheckedElements(false)
    //     }

    // }, [checkedManElements, checkedModelElements, checkedCatElements]);
    return (
        <div className='PageContent'>
            <LeftPanel
                key={1}
                prodType={prodType}
                setProdType={setProdType}
                valuteDollar={valuteDollar}
                setValuteDollar={setValuteDollar}
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
                manList={manList}
                setManList={setManList}
                checkedManList={checkedManList}
                setCheckedManList={setCheckedManList}
                activeManNames={activeManNames}
                setActiveManNames={setActiveManNames}
                checkedModels={checkedModels}
                setCheckedModels={setCheckedModels}
                checkedModelsNames={checkedModelsNames}
                setCheckedModelsNames={setCheckedModelsNames}
                catList={catList}
                setCatList={setCatList}
                checkedCatList={checkedCatList}
                setCheckedCatList={setCheckedCatList}
                checkboxes={checkboxes}
                setCheckboxes={setCheckboxes}
                priceInterval={priceInterval}
                setPriceInterval={setPriceInterval}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
                handleSearch={handleSearch}
                ForRent={ForRent}
                setForRent={setForRent}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                checkedElements={checkedElements}
                setCheckedElements={setcheckedElemetns}
                updateMans={updateMans}
                updateModels={updateModels}
                updateCats={updateCats}
                showCheckedElements={showCheckedElements}
                setShowCheckedElements={setShowCheckedElements}
                screenWidth={screenWidth}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
            />

            <MainPanel
                key={2}
                Mans={Mans}
                setMans={setMans}
                getProperUrl={getProperUrl}
                valuteDollar={valuteDollar}
                setValuteDollar={setValuteDollar}
                vehicleType={vehicleType}
                setVehicleType={setVehicleType}
                manList={manList}
                setManList={setManList}
                checkedManList={checkedManList}
                setCheckedManList={setCheckedManList}
                activeManNames={activeManNames}
                setActiveManNames={setActiveManNames}
                checkedModels={checkedModels}
                setCheckedModels={setCheckedModels}
                checkedModelsNames={checkedModelsNames}
                setCheckedModelsNames={setCheckedModelsNames}
                catList={catList}
                setCatList={setCatList}
                checkedCatList={checkedCatList}
                setCheckedCatList={setCheckedCatList}
                checkboxes={checkboxes}
                setCheckboxes={setCheckboxes}
                priceInterval={priceInterval}
                setPriceInterval={setPriceInterval}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
                setData={setData}
                setShowTime={setShowTime}
                showTime={showTime}
                data={data}
                url={url}
                setUrl={setUrl}
                chosenSort={chosenSort}
                setChosenSort={setChosenSort}
                chosenPeriod={chosenPeriod}
                setChosenPeriod={setChosenPeriod}
                Cats={Cats}
                setCats={setCats}
                totalPosts={totalPosts}
                setTotalPosts={setTotalPosts}
                totalPageCount={totalPageCount}
                setTotalPageCount={setTotalPageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                showCheckedElements={showCheckedElements}
                checkedElements={checkedElements}
                updateCheckedElements={updateCheckedElements}
                checkedManElements={checkedManElements}
                checkedModelElements={checkedModelElements}
                checkedCatElements={checkedCatElements}
                handleSearch={handleSearch}
                screenWidth={screenWidth}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
            />
        </div>
    );
};

export default PageContent;
