import React, { useEffect, useState } from 'react'
import MyAutoLogo from './MyAutoLogo'
import Vehicle from './Vehicle';
import { CarItem, CategoryType, CheckboxState, Manufacturer, ModelType, checkedElement } from './dataTypes';
import NavButton from './NavButton'
import Loader from './Loader';
import Pager from './Pager';
import { CgClose } from 'react-icons/cg';

interface Props {
  valuteDollar: boolean;
  setValuteDollar: (valute: boolean) => void;
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
  data: CarItem[];
  setData: React.Dispatch<React.SetStateAction<CarItem[]>>;
  setShowTime: React.Dispatch<React.SetStateAction<boolean>>;
  showTime: boolean;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  chosenSort: number;
  setChosenSort: React.Dispatch<React.SetStateAction<number>>;
  chosenPeriod: number;
  setChosenPeriod: React.Dispatch<React.SetStateAction<number>>;
  getProperUrl: (manStr: string, catStr: string) => void;
  Mans: string;
  setMans: React.Dispatch<React.SetStateAction<string>>;
  Cats: string;
  setCats: React.Dispatch<React.SetStateAction<string>>;
  totalPosts: number;
  setTotalPosts: React.Dispatch<React.SetStateAction<number>>;
  totalPageCount: number;
  setTotalPageCount: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  showCheckedElements: boolean;
  checkedElements: checkedElement[];
  updateCheckedElements: (checkedManElements: checkedElement[], checkedModelElements: checkedElement[], checkedCatElements: checkedElement[]) => void;
  checkedManElements: checkedElement[];
  checkedModelElements: checkedElement[];
  checkedCatElements: checkedElement[];
  handleSearch: () => void;
  screenWidth:number|undefined;
  showFilter:boolean;
  setShowFilter:React.Dispatch<React.SetStateAction<boolean>>;
}

const MainPanel: React.FC<Props> = ({ valuteDollar, setValuteDollar, vehicleType, setVehicleType, checkedManList, setCheckedManList,
  activeManNames, setActiveManNames, checkedModels, checkedModelsNames, setCheckedModelsNames,
  checkedCatList, setCheckedCatList, catList, setCatList, manList, setManList, setCheckedModels,
  checkboxes, setCheckboxes, timeInterval, setTimeInterval, priceInterval, setPriceInterval, data, setData, showTime, setShowTime, url, setUrl,
  chosenSort, setChosenSort, chosenPeriod, setChosenPeriod, getProperUrl, Mans, setMans, Cats, setCats, totalPosts, setTotalPosts,
  totalPageCount, setTotalPageCount, currentPage, setCurrentPage, showCheckedElements, checkedElements, updateCheckedElements,
  checkedManElements,checkedModelElements,checkedCatElements,handleSearch,screenWidth,showFilter,setShowFilter }) => {


  const [dropPeriod, setDropPeriod] = useState(false)
  const [dropSort, setDropSort] = useState(false)

  const periodOptions = ["1 საათი", "2 საათი", "3 საათი", "1 დღე", "2 დღე", "3 დღე", "1 კვირა", "2 კვირა", "3 კვირა"]
  const sortOptions = ["თარიღი ზრდადი", "თარიღი კლებადი", "ფასი კლებადი", "ფასი ზრდადი", 'გარბენი კლებადი', 'გარბენი ზრდადი']

  const [queryKey, setQueryKey] = useState(0)

  useEffect(() => {
    setQueryKey((queryKey + 1) % 1000)
  }, [checkedElements])
  const resetDrops = () => {
    setDropPeriod(false)
    setDropSort(false)
  }
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        let currentPage = 1;
        let totalPages = 10;
        let allCarItems: CarItem[] = [];

        do {
          const url = `https://api2.myauto.ge/ka/products/?page=${currentPage}`;
          // setUrl(url)
          const response = await fetch(url);
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
            // console.log(resolvedManJsonData)

            const [respManData, respModelData] = await Promise.all([resolvedManJsonData, resolvedModelJsonData]);

            const modelItem = respModelData.find((model: ModelType) => model.model_id === car.model_id);
            const manufacturer = respManData.find((man: Manufacturer) => parseInt(man.man_id) === car.man_id);

            const carItem = { Car: car, Model: modelItem, Man: manufacturer };
            return carItem;
          });

          const carItems: CarItem[] = await Promise.all(fetchRequests);
          allCarItems = allCarItems.concat(carItems);

          totalPages = 1;
          currentPage++;
          setData(allCarItems);
          setShowTime(true);
        } while (currentPage <= totalPages);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setCurrentPage(1)
    fetchCarData();
  }, []);

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    const { items: carlist, meta } = jsonData.data;
    console.log(meta, "meta")
    setTotalPosts(meta.total)
    setTotalPageCount(meta.last_page)
    setCurrentPage(1)
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
    // console.log(carItems, "AAAA");
    setShowTime(true);
    setData(carItems);
    // console.log(carItems, "carItems")
    // setUrl(url)
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
  const handleSortOrder = (num: number) => {
    setShowTime(false)
    setChosenSort(num)
    console.log(num, "num")
    let newUrl = ""
    if (chosenPeriod === -1) newUrl = getProperUrl(Mans, Cats) + `SortOrder=${num}&`
    else {
      let chosenPeriodStr = chosenPer(chosenPeriod)
      newUrl = getProperUrl(Mans, Cats) + `SortOrder=${num}` + `&Period=${chosenPeriodStr}&`
    }
    console.log(newUrl, "newUrl")
    setCurrentPage(1)
    fetcher(newUrl)
  }

  const handleSortPeriod = (num: number) => {
    setShowTime(false)
    setChosenPeriod(num)
    const chosenPeriodStr = chosenPer(num)
    let newUrl = ""

    if (chosenSort === -1) newUrl = getProperUrl(Mans, Cats) + `Period=${chosenPeriodStr}&`
    else {
      newUrl = getProperUrl(Mans, Cats) + `SortOrder=${chosenSort}` + `&Period=${chosenPeriodStr}&`

    }
    console.log(newUrl, "newUrl")
    setCurrentPage(1)
    fetcher(newUrl)

  }

  const removeFromCheckedManList = (man: Manufacturer) => {
    let lst = checkedManList.filter(mn => mn != man)
    setCheckedManList(lst)
    const newLst = lst.map(elem => (
      {
      element: elem,
      removeSelfOrigin: null,
      removeSelfRelative: null,
    }))
    updateCheckedElements(newLst, checkedModelElements, checkedCatElements)
    // handleSearch()
  }
  const removeFromCheckedCatList = (cat: CategoryType) => {
    const lst = checkedCatList.filter(ct => ct != cat)
    setCheckedCatList(lst)
    const newLst = lst.map(elem => (
      {
      element: elem,
      removeSelfOrigin: null,
      removeSelfRelative: null,
    }))
    updateCheckedElements(checkedManElements, checkedModelElements, newLst)
    // handleSearch()
  }
  const removeFromCheckedModels = (model: ModelType) => {
    const lst = checkedModels.filter(md => md != model)
    setCheckedModels(lst)
    const newLst = lst.map(elem => (
      {
      element: elem,
      removeSelfOrigin: null,
      removeSelfRelative: null,
    }))
    updateCheckedElements(checkedManElements, newLst, checkedCatElements)
    // handleSearch()
  }
  const removeFromActiveManNames = (name: string) => {
    const newLst = activeManNames.filter(nm => nm != name)
    setActiveManNames(newLst)
  }
  const removeFromCheckedModelsNames = (name: string) => {
    const newLst = checkedModelsNames.filter(nm => nm != name)
    setCheckedModelsNames(newLst)
  }


  return (
    <div className='MainPanel'>
      <div className="MainPanel-nav">
        <div className='totalPosts'>{totalPosts} განცხადება</div>
        <div className='MainPanel-nav-buttons'>
          {screenWidth && screenWidth < 1200 && <div className='filterToggle' onClick={() => setShowFilter(true)}>ფილტრი</div>}
          <NavButton name="პერიოდი" drop={dropPeriod} setDrop={setDropPeriod} resetDrops={resetDrops} options={periodOptions} chosenState={chosenPeriod} setChosenState={setChosenPeriod} handleSort={handleSortPeriod} />
          <NavButton name="სორტირება" drop={dropSort} setDrop={setDropSort} resetDrops={resetDrops} options={sortOptions} chosenState={chosenSort} setChosenState={setChosenSort} handleSort={handleSortOrder} />
        </div>
      </div>
      {checkedElements.length > 0 && (
        <div className="Queries" key={checkedElements.length}>
          {checkedElements.map((item: checkedElement, index: number) =>
            item.element.hasOwnProperty("man_name") ? (
              <div className="Query" key={index}>
                <div className="Query-Name">{item.element.man_name}</div>
                <div className="Query-Remove" onClick={() => { removeFromCheckedManList(item.element); removeFromActiveManNames(item.element.man_name) }}>
                  <CgClose />
                </div>
              </div>
            ) : item.element.hasOwnProperty("model_name") ? (
              <div className="Query" key={index}>
                <div className="Query-Name">{item.element.model_name}</div>
                <div className="Query-Remove" onClick={() => { removeFromCheckedModels(item.element); removeFromCheckedModelsNames(item.element.model_name) }}>
                  <CgClose />
                </div>
              </div>
            ) : item.element.hasOwnProperty("title") ? (
              <div className="Query" key={index}>
                <div className="Query-Name">{item.element.title}</div>
                <div className="Query-Remove" onClick={() => { removeFromCheckedCatList(item.element) }}>
                  <CgClose />
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      <div className='MainPanel-Content'>
        {!showTime && (
          <div className="MainPanel-Content-Loader">
            <Loader col="#FD4100" />
          </div>
        )}
        {showTime && data && data.map((item: CarItem, index: number) => (
          item.Car && (
            <Vehicle
              key={index}
              name={item.Model?.model_name}
              man_name={item.Man?.man_name}
              photo={item.Car?.photo}
              photo_ver={item.Car?.photo_ver}
              prod_year={item.Car?.prod_year}
              car_run_km={item.Car?.car_run_km}
              engine_volume={item.Car?.engine_volume}
              product_id={item.Car?.car_id}
              customs_passed={item.Car?.customs_passed}
              drive_type_id={item.Car?.drive_type_id}
              price={item.Car?.price}
              price_usd={item.Car?.price_usd}
              order_date={item.Car?.order_date}
              views={item.Car?.views}
              right_wheel={item.Car?.right_wheel}
              valuteDollar={valuteDollar}
              setValuteDollar={setValuteDollar}
            />
          )
        ))}
      </div>
      <div className='PagerContainer'>
        {showTime && <Pager currentPage={currentPage} setCurrentPage={setCurrentPage} totalPageCount={totalPageCount} getProperUrl={getProperUrl} />}
      </div>
    </div >
  )
}

export default MainPanel