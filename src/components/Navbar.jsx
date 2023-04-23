import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import Cart from '../assets/cart.png';
import { RiMenuFill, RiCloseFill } from 'react-icons/Ri' 
import { MdArrowForwardIos } from 'react-icons/Md';
import { FaRegUserCircle } from 'react-icons/Fa';
import { navLinks, subMenu } from '../constants';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate  = useNavigate ();

    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    const [accounts, setAccounts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        if (accounts) {
            setAccounts(accounts);
            let isLoggedIn = accounts.find((account) => {
                return (account.isLoggedIn === true)})
            if (isLoggedIn) {
                setCart(isLoggedIn.cart);
            }
        }
    }, []);

    useEffect(() => {
        const body = document.querySelector('body');
        if (toggle) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }, [toggle]);

    const isLoggedIn = accounts.find((account) => {
        return account.isLoggedIn === true;
    });    
    
    const handleLogOut = () => {
        setAccounts(accounts.map((account) => {
            if (account.isLoggedIn === true) {
                return { ...account, isLoggedIn: false };
            } else {
                return account;
            }
        }));
        
        localStorage.setItem('accounts', JSON.stringify(accounts.map((account) => {
            if (account.isLoggedIn === true) {
                return { ...account, isLoggedIn: false };
            } else {
                return account;
            }
        })));
        setCart([]);
        navigate('home')
    };
      
    return (
        <>
            <div className="w-full bg-white">
                <nav className="grid grid-cols-5 sm:flex justify-between items-center navbar px-4 py-2 max-w-[1200px] mx-auto sm:py-3">
                    <div className="sm:hidden text-2xl col-span-2">
                        {toggle ? <RiCloseFill className="cursor-pointer" onClick={() => setToggle(!toggle)} /> : <RiMenuFill className="cursor-pointer" onClick={() => setToggle(!toggle)}/>}
                        <div className={`${
                                    !toggle ? "hidden" : "flex"
                                } bg-transparent w-[100vw] h-[100vh] fixed top-0 left-0 cursor-pointer z-10 `} onClick={() => setToggle(!toggle)} >
                            <div
                                className={`bg-white min-w-[80vw] min-h-[100vh]`}
                                >
                                    <div className="px-6 h-[60px] flex items-center bg-red-600 text-white justify-between">
                                        <div className="flex items-center text-4xl">
                                            <FaRegUserCircle className="me-2"/>
                                            {(isLoggedIn) ? <p className="text-xl">Hi, <span className="font-semibold">{isLoggedIn.username}</span></p> : <Link className="me-3 relative text-base" to="/login">Sign In</Link> }
                                        </div>
                                    </div>
                                <ul className="list-none flex items-start flex-1 flex-col">
                                    {navLinks.map((nav, index) => (
                                    <li
                                        key={nav.id}
                                        className={`px-6 py-2 font-poppins font-medium cursor-pointer text-[16px] flex items-center justify-between w-full hover:text-red-700 hover:font-semibold ${
                                        active === nav.title ? "text-red-500 bg-gray-100" : "text-black"
                                        }`}
                                        onClick={() => setActive(nav.title)}
                                    >   
                                        <Link className="flex w-full justify-between items-center" to={nav.id}>
                                            <div className="flex">
                                                {nav.logo}
                                                {nav.title}
                                            </div>
                                            <MdArrowForwardIos/>
                                        </Link>
                                    </li>
                                    ))}
                                </ul>
                                <ul>
                                    {subMenu.map((menu, index) => (
                                        <li className={` text-black text-[16px] font-poppins flex justify-between items-center hover:text-red-700 hover:font-semibold ${
                                            active === menu.title ? "text-red-500 bg-gray-100" : "text-black"
                                        }`}
                                        key={index}
                                        onClick={() => setActive(menu.title)}
                                        >
                                        <Link className="ps-14 pe-6 flex justify-between w-full py-1 items-center" to={`menu/${menu.id}`} state= {{ category: menu.title }}>
                                            {menu.title}
                                            <MdArrowForwardIos/>
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Link to="/home" onClick={() => setActive("Home")} className="mx-auto w-[40px] h-[40px] sm:mx-0 sm:w-[50px] sm:h-[50px] cursor-pointer ">
                        <img src={Logo} alt="jollibee" ></img>
                    </Link>
                    <ul className="hidden sm:flex justify-between list-none">
                        {navLinks.map((nav, index) => (
                            <li 
                                key={nav.id}
                                className={`font-poppins cursor-pointer font-medium ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
                                onClick={() => setActive(nav.title)}
                            >
                                <Link to={nav.id} className={`${active === nav.title ? "font-bold" : ''}`}>
                                    {nav.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-end justify-end col-span-2 sm:items-center">
                        {(isLoggedIn) ? <p className="text-sm font-semibold me-2 sm:me-3" onClick={handleLogOut}>Log Out</p> : <Link className="me-3 font-semibold relative" to="/login">Sign In</Link> }
                        <Link className="relative" to="/cart">
                            <div className="absolute left-[-10px] top-0 bg-orange-400 rounded-full p-1 w-[20px] h-[20px] flex justify-center items-center">{cart.length}</div>
                            <img src={Cart} alt="" className="h-[30px] w-[30px]" />
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar