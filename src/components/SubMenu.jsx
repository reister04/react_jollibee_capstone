import React, { useState, useEffect }from 'react';
import MenuAPI from '../api/category';
import { IoMdArrowBack } from 'react-icons/Io' 
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { subMenu } from '../constants';
import { MdArrowForwardIos } from 'react-icons/Md';


const SubMenu = () => {
    const location = useLocation();
    const navigate  = useNavigate ();
    const category = location.state.category;
    const { param } = useParams();

    const [active, setActive] = useState(category);
    const [items, setItems] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [cart, setCart] = useState([]);
    const [value, setValue] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const isLoggedIn = accounts.find((account) => {
        return (account.isLoggedIn === true)
    });

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
        getMenuAPI();
    }, [param]);

    useEffect(() => {
        if (accounts.length !== 0 ) {
            localStorage.setItem('accounts', JSON.stringify(accounts.map((account) => {
                if (account.isLoggedIn === true) {
                    return { ...account, cart };
                } else {
                    return account;
                }
            })));
        }
    }, [cart]);

    const getMenuAPI = () => {
        MenuAPI.get(`menu/${param}`)
            .then(response => {
                localStorage.setItem('items', JSON.stringify(response.data.data));
                setItems(response.data.data);
            })
            .catch(err => console.log(`Error: ${err}`));
    }

    const handleChangeMenu = () => {
        getMenuAPI();
    }

    const handleBuy = (data) => {
        if (isLoggedIn) {
            setShowModal(true);
            setCurrentData(data);
        } else {
            navigate("/login");
        }
    }

    const handleBuyItem = (e) => {
        e.preventDefault();
        console.log(e);
        let quantity = parseInt(e.target[1].value);
        console.log(typeof(quantity));
        const itemIndex = cart.findIndex(item => item.description === currentData.description);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[itemIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            setCart([...cart, {description: currentData.description, img: currentData.img, price: currentData.price, quantity: quantity}]);
        }
        window.location.reload(false);
    }

    const handleIncrease = () => {
        setValue(value + 1);
    };

    const handleDecrease = () => {
        setValue(value - 1);
    };

    return (
        <> 
            <div className="flex flex-row bg-gray-200 max-w-[1200px] mx-auto font-poppins py-2 h-[100vh]">
                <aside className="hidden md:flex flew-col w-[40%] my-2 lg:w-[25%]">
                    <ul className="w-full">
                    {subMenu.map((menu, index) => (
                        <li className={` bg-white ms-4 text-black text-[16px] font-poppins flex justify-between items-center hover:text-red-700 hover:font-semibold`}
                        key={index}
                        onClick={() => setActive(menu.title)}
                        >
                        <Link className={`ps-6 pe-4 py-2 flex justify-between w-full items-center ${
                            active === menu.title ? "text-red-500 bg-gray-100" : "text-black"
                        }`} to={`/menu/${menu.id}`} state= {{ category: menu.title }} onClick={handleChangeMenu}>
                            {menu.title}
                            <MdArrowForwardIos/>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </aside>
                <main className="overflow-auto w-full">
                    <div className="sticky top-0 font-semibold my-2 border-b-2 border-b-rose-600 p-3 bg-white flex items-center md:mx-2 md:relative">
                        <Link className="mr-2 text-xl md:hidden" to="/menu"><IoMdArrowBack/></Link>
                        <h1>{category}</h1>
                    </div>
                    <section className="grid grid-cols-2 gap-4 px-2 lg:grid-cols-3 py-2 ">
                        {items.map((data, index) => (
                            <div key={data.id} className="bg-white flex flex-col items-center rounded overflow-hidden pt-3">
                            <div className="flex items-center mb-4">
                                <img src={data.img} alt={data.description} className="w-full h-[90px] sm:h-[155px] md:h-[190px]"/>
                            </div>
                            <div className="h-[100px] flex flex-col px-2 bg-white w-full text-start py-2">
                                <h2 className="font-bold text-gray-800 text-xs sm:text-sm md:text-md mb-2">{data.description}</h2>
                                <h3 className="text-xs sm:text-sm md:text-md font-medium">Price: ₱{data.price}.00</h3>
                            </div>
                            <button onClick={() => {handleBuy(data)}} className="bg-red-600 text-white px-4 py-1 w-full font-bold uppercase text-center md:py-3">Buy</button>
                            </div>
                        ))}
                    </section>
                    <div className={`relative z-10 ${showModal ? 'flex' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="px-4 sm:px-6">
                                        <div className="w-[80%] flex items-center mx-auto justify-center pt-5">
                                            <img className="object-contain" src={currentData.img} alt="" />
                                        </div>
                                        <p>{currentData.description}</p>
                                        <form className="grid grid-cols-2" onSubmit={handleBuyItem}>
                                            <label className="flex justify-between">
                                                Price: ₱{currentData.price}
                                            </label>
                                            <div className="flex items-center w-full justify-center">
                                                <button type="button" className="rounded-l bg-yellow-300 border border-yellow-300 text-dark w-[20%] flex justify-center items-center disabled:opacity-50" onClick={handleDecrease} disabled={value == 1}>
                                                -
                                                </button>
                                                <input
                                                type="number"
                                                className="border border-gray-200 text-center w-[60%] outline-none"
                                                value={value}
                                                onChange={(e) => setValue(parseInt(e.target.value))}
                                                />
                                                <button type="button" className="rounded-r bg-yellow-300 border border-yellow-300 text-dark w-[20%] flex justify-center items-center" onClick={handleIncrease}>
                                                +
                                                </button>
                                            </div>
                                            <div className="py-3 col-span-2 sm:flex sm:flex-row-reverse sm:justify-center">
                                                <input type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-50%" value="Buy"/>
                                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-50%" onClick={() => {setShowModal(false)}}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </main>
            </div>            
        </>
    )
}

export default SubMenu