import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        < header className="header">
            
            <nav className="nav">
                <Link to='/'><h1>SoccerStat</h1></Link>
                <Link to='/liga'>Лиги</Link>
                <Link to='/teams'>Команды</Link>
            </nav>



        </header >
    )
}

export default Header;