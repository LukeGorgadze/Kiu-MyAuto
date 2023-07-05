import React, { useEffect } from 'react';

interface Props {
    year: number;
    setYear: (year: number) => void;
    drop: boolean;
    setDrop: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolder: string;
    closeOthers: () => void;
}

const yearList = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i >= 1900; i--) {
        years.push(i);
    }
    return years;
};

const YearDropDown: React.FC<Props> = ({
    year,
    setYear,
    drop,
    setDrop,
    placeHolder,
    closeOthers
}) => {
    const clickHandler = () => {
        closeOthers();
        setDrop(!drop);
        console.log(drop);
    };

    const getName = () => {
        if (year === 0) return placeHolder;
        return year;
    }
    const newName = getName()

    const clickYearHandler = (year: number) => {
        setYear(year)
        setDrop(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const targetElement = event.target as Element;
            if (drop && !targetElement.closest('.YearDropDown-Cover') && !targetElement.closest('.YearDropDown-options')) {
                setDrop(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [drop, setDrop]);
    return (
        <div className='YearDropDown-Cover' >
            <div className="YearDropDown" onClick={clickHandler}>
                <div className="YearDropDown-Placeholder">{newName}</div>
            </div>
            {drop && <div className="YearDropDown-options">
                {yearList().map((year, index) => (
                    <div className="year" key={index} onClick={() => clickYearHandler(year)}>
                        {year}
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default YearDropDown;
