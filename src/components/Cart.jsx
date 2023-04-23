import React, { useState, useEffect }from 'react';
import { MdOutlineDeleteForever } from 'react-icons/Md';

const Cart = () => {

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [isCheckOut, setIsCheckOut] = useState(false);

    const quantityTotal = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        if (accounts) {
            setAccounts(accounts);
            let isLoggedIn = accounts.find((account) => {
                return (account.isLoggedIn === true)})
            if (isLoggedIn) {
                setCart(isLoggedIn.cart);
                const totalPrice = isLoggedIn.cart.reduce((acc, item) => {
                    return acc + (item.price * item.quantity);
                }, 0);
                setTotalPrice(totalPrice);
                setSubTotal(totalPrice + 50);
            }
        }
    }, []);

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

    const handleIncrease = (item) => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.description === item.description) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else {
                return cartItem;
            }
        });
        setCart(updatedCart);
        const totalPrice = updatedCart.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        setTotalPrice(totalPrice);
        setSubTotal(totalPrice + 50);
    };
      
      const handleDecrease = (item) => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.description === item.description && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            } else {
                return cartItem;
            }
        });
        console.log(updatedCart);
        setCart(updatedCart);
        const totalPrice = updatedCart.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        setTotalPrice(totalPrice);
        setSubTotal(totalPrice + 50);

    };
    
    const handleDeleteItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        const totalPrice = updatedCart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(totalPrice);
        setSubTotal(totalPrice + 50);
    }

    const handleCheckout = () => {
        setCart([]);
        localStorage.setItem('accounts', JSON.stringify(accounts.map((account) => {
            if (account.isLoggedIn === true) {
                return { ...account, cart };
            } else {
                return account;
            }
        })));
        window.location.reload(false);
    }

    if (cart.length === 0) {
        return (
            <>
                <main className="max-w-[1200px] mx-auto bg-gray-200 px-2 py-4 flex justify-center">
                    <h1 className="uppercase">Please add some items to your cart.</h1>
                </main>
            </>
        )
    } else {
        return (
            <main className="max-w-[1200px] mx-auto bg-gray-200 px-2 py-4 flex flex-col md:flex-row">
                <div className="h-[45vh] md:h-[72vh] overflow-auto">
                {cart.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4 sm:mx-10 bg-white rounded py-2">
                        <div className="flex items-center justify-center ">
                        <div className="flex justify-center items-center">
                            <MdOutlineDeleteForever className="text-2xl text-red-600 sm:text-4xl cursor-pointer hover:text-gray-700" onClick={() => { handleDeleteItem(index) }}/>
                        </div>
                            <img src={item.img} alt={item.description} className="w-[75%] rounded p-2"/>
                        </div>
                        <div className="flex flex-col justify-center text-xs ">
                            <p className="mb-1 font-medium">{item.description}</p>
                            <p>₱{item.price}.00</p>
                        </div>
                        <form>
                            <div className="flex justify-center w-full items-center h-full">
                                <button type="button" className="rounded-l bg-yellow-300 border border-yellow-300 w-[20%] text-dark flex justify-center items-center disabled:opacity-50" onClick={() => { handleDecrease(item) }} disabled={item.quantity == 1}>
                                -
                                </button>
                                <input
                                type="number"
                                className="border border-gray-200 text-center outline-none w-[30%]"
                                value={item.quantity}
                                onChange={(e) => setValue(parseInt(e.target.value))}
                                />
                                <button type="button" className="rounded-r bg-yellow-300 border border-yellow-300 w-[20%] text-dark flex justify-center items-center" onClick={() => { handleIncrease(item) }}>
                                +
                                </button>
                            </div>
                        </form>
                    </div>
                ))}
                </div>
                
                <div className="px-2 py-4 bg-white flex flex-col justify-between md:max-h-[50vh] rounded md:w-[50%]">
                    <div>
                        <h1 className="font-semibold mb-2">Order Summary</h1>
                        <p className="flex justify-between">Subtotal ({quantityTotal} items) <span>₱{totalPrice}</span> </p>
                        <p className="flex justify-between mb-4">Delivery fee <span>₱50.00</span></p> 
                        <p className="flex justify-between mb-2">Subtotal <span>₱{subTotal}</span></p>
                    </div>
                    <button className="bg-red-600 text-white w-full rounded py-1 ms-auto" onClick={() => {setIsCheckOut(true) }}>Proceed to Checkout</button>
                </div>

                <div className={`relative z-10 ${isCheckOut ? 'flex' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="text-center py-4 px-4 relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <p className="mb-2 font-semibold">Your order is being processed with care and attention</p>
                                    <button className="bg-red-600 text-white rounded py-1 px-4" onClick={handleCheckout}>Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>   
            </main>
        )
    }
}

export default Cart