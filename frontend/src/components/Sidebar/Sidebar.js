import React from 'react';
import './Sidebar.css';
import { Public, Stars, Work, AccountCircle } from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <NavLink to="/">HOME</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink >PUBLIC</NavLink>
                        <div className="link">
                            <div className="link-tag">
                                <Public />
                                <NavLink to="/questions">Questions</NavLink>
                            </div>
                            <div className="link-tag">
                                <NavLink to="/tags" className="mt-1 mb-1"><LocalOfferIcon color='primary' fontSize='small' /> Tags</NavLink>
                            </div>
                            <div className="link-tag">
                                <AccountCircle />
                                <NavLink to="/profile">Profile</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
