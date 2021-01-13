import React from 'react'
import './Header.css'
import Logo from '@material-ui/icons/DesktopWindows';
function Header() {

    return (
        <div className="header">
           <Logo style={{ fontSize: 45 }}/>
           <h1>Family Window</h1>
        </div>
    )
}

export default Header
