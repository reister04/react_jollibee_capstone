import React, { useState, useEffect }from 'react';
import MenuAPI from '../api/category';
import { Link } from 'react-router-dom';


const Menu = () => {
    const [categoryData, setCategoryData] = useState([]);
    
    useEffect(() => {
        const category = JSON.parse(localStorage.getItem('category'));
        if (!category) {
            getCategoryAPI();
        } else if (category) {
            setCategoryData(category);
        }
    }, []);

    const getCategoryAPI = () => {
        MenuAPI.get('menu')
            .then(response => {
                localStorage.setItem('category', JSON.stringify(response.data.data));
                setCategoryData(response.data.data);
                console.log("haha");
            })
            .catch(err => console.log(`Error: ${err}`));
    }

    return (
        <>
            <main className="bg-gray-200 max-w-[1200px] mx-auto font-poppins py-2">
                <h1 className="font-semibold my-2 border-b-2 border-b-rose-600 p-3 bg-white">Menu</h1>
                <section className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-3 lg:grid-cols-4 py-2">
                    {categoryData.map((data, index) => (
                        <div key={data.id} className=" bg-white flex flex-col items-center rounded overflow-hidden text-center pt-3">
                        <div className="flex items-center">
                            <img src={data.image} alt={data.param} className="w-full h-[90px] sm:h-[155px] lg:h-[190px]"/>
                        </div>
                        <div className="h-[50px] flex items-center justify-center px-2">
                            <h2 className="font-semibold text-gray-800">{data.category}</h2>
                        </div>
                        <Link to={data.param} state={{category: data.category}} className="bg-red-600 text-white px-4 py-1 w-full font-bold uppercase md:py-2">Select</Link>
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
}

export default Menu