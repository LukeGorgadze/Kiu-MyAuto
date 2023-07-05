import React from 'react'
import MyAutoLogo from './MyAutoLogo'
// Create ts Navbar component
const Navbar: React.FC = () => {
    // go to link when clicked

    return (
        <div className='Navbar'>
            <div className="content">
                <div className="MyAutoLogo">
                    <MyAutoLogo onClick={() => window.location.reload()} />
                </div>
            </div>

        </div>
    )
}

export default Navbar