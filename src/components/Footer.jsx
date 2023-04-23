import React from 'react';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/Ai' 

const Footer = () => {
    return (
        <>
            <footer className="max-w-[1200px] mx-auto bg-white font-poppins px-2 grid grid-cols-1 py-4 md:grid-cols-3">
                <div className="col-span-3">
                    <p className="text-base font-semibold">Stay Connected</p>
                    <ul className="flex mb-4">
                        <li className="me-2 text-3xl"><a href="https://www.instagram.com/jollibee/" target="_blank"><AiOutlineInstagram /></a></li>
                        <li className="me-2 text-3xl"><a href="https://www.facebook.com/JollibeePhilippines" target="_blank"><AiOutlineFacebook /></a></li>
                        <li className="me-2 text-3xl"><a href="https://twitter.com/jollibee" target="_blank"><AiOutlineTwitter /></a></li>
                    </ul>
                </div>
                <div>
                    <p className="text-base font-semibold">Stay up-to-date</p>
                    <p className="text-gray-500 text-sm mb-2">Don't miss out on exclusive online offers!</p>
                </div>
                <form action="" className="grid grid-cols-3 gap-2 mb-2 col-span-3 lg:col-span-1 lg:mb-0">
                    <input type="text" placeholder="Enter your email" className="border-2 border-gray-200 px-1 rounded py-1 col-span-2 focus-visible:outline-red-600"/>
                    <input type="submit" value="Subscribe" className="rounded bg-red-600 text-white px-3 py-1 border-2 border-red-600"/>
                </form>
                <div className="flex items-center justify-center col-span-3 lg:col-span-1">
                    <p className="text-xs font-bold sm:text-sm">Copyright © 2019 Jollibee. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer