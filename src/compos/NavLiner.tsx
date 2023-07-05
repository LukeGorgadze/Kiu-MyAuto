import React from 'react'
import MyAutoLogo from './MyAutoLogo'
import Arrow from './Arrow'
// Create ts Navbar component
const NavLiner: React.FC = () => {
    return (
        <div className='NavLiner'>
            <div>მთავარი</div>
            <div className='Arrow'>
                <Arrow />
            </div>
            <div className='NavSearch'>ძიება</div>
            <div className='Arrow'>
                <Arrow />
            </div>
            <div className='Buy'>იყიდება</div>
        </div>
    )
}

export default NavLiner