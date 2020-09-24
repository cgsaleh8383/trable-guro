import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../image/Logo2.png'
import './Header.css'

const Header = (props) => {
    const [showArea, setShowArea, loggedIn, setLoggedIn, name] = useContext(userContext);

    return (
        <div className='main_header'>
            <div className='logo'>
                <Link to="/">
                    <img src={props.img || logo} alt="" />
                </Link>
            </div>

            <div className="search_box">
                <input type="search" name="" id="" placeholder="Search your Destination..."/>
            </div>

            <div className="header_menu">
                <ul>
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link> Destination</Link>
                    </li>
                    <li>
                        <Link> Blog</Link>
                    </li>
                    <li>
                        <Link> Hotel Details</Link>
                    </li>
                      
                </ul>

                {
                    loggedIn ?
                        <h4 >
                            <span style={{ color: "orange" }}>| </span>
                            Welcome, {name}
                        </h4>
                        : <>
                            <Link className='login_btn' to="/auth">
                               <button>Login</button>
                            </Link>
                        </>
                }
            </div>
        </div >
    );
};

export default Header;