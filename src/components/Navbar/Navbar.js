import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LinkIcon from '@material-ui/icons/Link';
import EventIcon from '@material-ui/icons/Event';
import HistoryIcon from '@material-ui/icons/History';

function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar__container">
                <Link to='/memories'>
                    <div>
                        <HistoryIcon style={{ fontSize: 40 }} />
                        <p>Memories</p>
                    </div>
                </Link>
                <Link to='/events'>
                    <div>
                        <EventIcon style={{ fontSize: 40 }} />
                        <p>Events</p>
                    </div>
                </Link>
                <Link to='/connect'>
                    <div>
                        <LinkIcon style={{ fontSize: 40 }} />
                        <p>Connect</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
