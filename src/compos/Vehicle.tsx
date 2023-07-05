import React from 'react'
import Speed from './Speed'
import Sache from './Sache'
import Avtomatic from './Avtomatic'
import Shedareba from './Shedareba'
import Note from './Note'
import Favorite from './Favorite'
import Motor from './Motor'
import ValuteToggle from './ValuteToggle'
interface VehicleProps {
    product_id: number;
    name: string | undefined;
    prod_year: number;
    car_run_km: number;
    engine_volume: number;
    photo: string;
    photo_ver: number;
    man_name: string | undefined;
    customs_passed: boolean | undefined;
    drive_type_id: number;
    price: number;
    price_usd: number;
    views: number;
    order_date: string;
    right_wheel: boolean | undefined;
    valuteDollar: boolean;
    setValuteDollar: (valute: boolean) => void;
}

const Vehicle: React.FC<VehicleProps> = ({ price, right_wheel, price_usd, name, drive_type_id, man_name, prod_year, customs_passed, car_run_km, engine_volume, photo, photo_ver, product_id,
    views, order_date, valuteDollar, setValuteDollar }) => {
    const img = `https://static.my.ge/myauto/photos/${photo}/thumbs/${product_id}_1.jpg?v=${photo_ver}`
    // console.log(img)
    const drive_type = (drive_type_id: number): string => {
        switch (drive_type_id) {
            case 1:
                return 'ავტომატიკა'
            case 2:
                return 'მექანიკა'
            case 3:
                return 'ვარიატორი'
            case 4:
                return 'ტიპტრონიკი'
            default:
                return 'რაცხა'
        }
    }
    const postedDate: Date = new Date(order_date);
    const currentDate: Date = new Date();
    const timeDifference: number = currentDate.getTime() - postedDate.getTime();
    // If posted date is more than 1 day ago, then show days ago, else show hours ago
    const hoursAgo: number = Math.floor(timeDifference / (1000 * 3600));
    const daysAgo: number = Math.floor(timeDifference / (1000 * 3600 * 24));

    return (
        <div className='Vehicle'>
            <div className='carImageContainer'>
                <img className='carImage' src={img} alt="Not found" />
            </div>
            <div className='carInfo'>
                <div className='carHeader'>
                    <div className='cartitle'>
                        <div className='Vehicle-name'>{man_name} {name}</div>
                        <div className='year'>{prod_year}წ</div>
                    </div>
                    <div className='carHeader-rSection'>
                        <div className={customs_passed? "customsPassed" : "customsNotPassed"}>{customs_passed ? 'განბაჟებული ' : 'განუბაჟებელი'}</div>
                    </div>
                </div>
                <div className='carInfo-middleSection'>
                    <div className='carParameters'>
                        <div className='carParameters-1'>
                            <div className='params'>
                                <div className='carParameters-icon'><Motor /></div>
                                <div>{(engine_volume / 1000).toFixed(1)} დატ.</div>
                            </div>
                            <div className='params'>
                                <div className='carParameters-icon'><Avtomatic /></div>
                                <div>{drive_type(drive_type_id)}</div>
                            </div>
                        </div>
                        <div className='carParameters-2'>
                            <div className='params'>
                                <div className='carParameters-icon'><Speed /></div>
                                <div>{car_run_km.toLocaleString('en', { useGrouping: true })} კმ</div>
                            </div>
                            <div className='params'>
                                <div className='carParameters-icon'><Sache /></div>
                                <div>{right_wheel ? 'მარჯვენა' : 'მარცხენა'}</div>
                            </div>

                        </div>
                    </div>
                    <div className='carPrice'>
                        <div>{valuteDollar? price_usd : price}</div>
                        <ValuteToggle valuteDollar = {valuteDollar} setValuteDollar = {setValuteDollar}/>
                    </div>
                </div>
                <div className='carInfo-lowerSection'>
                    <div className="view-time">
                        <div className='viewCount'>{views} ნახვა</div>
                        <div className='dot'>•</div>
                        <div className='orderDate'>{daysAgo > 0 ? daysAgo + " დღის წინ" : hoursAgo + " საათის წინ"}</div>
                    </div>
                    <div className="carInfo-lowerSection-btns">
                        <div><Note/></div>
                        <div><Shedareba/></div>
                        <div><Favorite/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicle