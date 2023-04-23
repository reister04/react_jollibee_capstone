import React from 'react';
import { bestSellers, burgers, chickenjoy, familyMeals, main, newProducts, info } from '../assets/home';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

const Home = () => {
    
    return (
        <>
            <main className="mx-auto max-w-[1200px] p-2 bg-white">
                <img src={main} alt="" className="rounded w-full"/>
                <div className="flex justify-center my-2 md:justify-end">
                    <Link className="rounded-full text-white bg-orange-400 w-full py-1 sm:py-2 sm:w-1/2 font-bold text-center" to="/menu">START NEW ORDER</Link>
                </div>
                <section className="grid grid-cols-1 gap-3 mt-3 md:grid-cols-3">
                    <div className="h-[150px] md:col-span-2 relative sm:h-full">
                        <img src={bestSellers} alt="" className="rounded w-full h-full object-cover object-left-top md:object-fill"/>
                        <Link to="/menu/best-sellers" state={{ category: "Best Sellers" }} className="rounded-full font-bold text-white bg-orange-400 py-1 px-5 border-2 border-white absolute bottom-[10px] left-[10px]">SELECT</Link>
                    </div>
                    <div className="h-[200px] md:h-full relative">
                        <img src={familyMeals} alt="" className="rounded w-full h-full object-cover object-left-top md:object-fill"/>
                        <Link to="/menu/family-meals" state={{ category: "Family Meals" }} className="rounded-full font-bold text-white bg-orange-400 py-1 px-5 border-2 border-white absolute bottom-[10px] left-[10px]">SELECT</Link>
                    </div>
                    <div className="h-[200px] md:h-full relative">
                        <img src={chickenjoy} alt="" className="rounded w-full h-full object-cover object-left-top md:object-fill"/>
                        <Link to="/menu/chickenjoy" state={{ category: "Chickenjoy" }} className="rounded-full font-bold text-white bg-orange-400 py-1 px-5 border-2 border-white absolute bottom-[10px] left-[10px]">SELECT</Link>
                    </div>
                    <div className="h-[200px] md:h-full relative">
                        <img src={burgers} alt="" className="rounded w-full h-full object-cover object-left-top md:object-fill"/>
                        <Link to="/menu/burgers" state={{ category: "Burgers" }} className="rounded-full font-bold text-white bg-orange-400 py-1 px-5 border-2 border-white absolute bottom-[10px] left-[10px]">SELECT</Link>
                    </div>
                    <div className="h-[200px] md:h-full relative">
                        <img src={newProducts} alt="" className="rounded w-full h-full object-cover object-left-top md:object-fill"/>
                        <Link to="/menu/new-products" state={{ category: "New Products" }} className="rounded-full font-bold text-white bg-orange-400 py-1 px-5 border-2 border-white absolute bottom-[10px] left-[10px]">SELECT</Link>
                    </div>
                </section>
                <section className="grid grid-cols-1 gap-3 mt-3 md:grid-cols-2">
                    <div className="flex items-center">
                        <Link to="/menu" className="flex items-center justify-center rounded-full text-center font-bold text-red-600 text-sm border-2 border-red-600 w-full md:h-[60%] py-2 md:text-xl md:py-3">View Full Menu</Link>
                    </div>
                    <div className="flex justify-center">
                        <img src={info} alt="" className="sm:h-[90%]"/>
                    </div>
                
                </section>

            </main>
        </>
    )
}

export default Home