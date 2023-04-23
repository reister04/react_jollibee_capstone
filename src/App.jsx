import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import { Navbar, Home, Footer, Menu, Store, Authentication, SubMenu, Cart} from './components';


function App() {
    return (
        
        <>
            <Router basename="/react_jollibee_capstone" >
                <Navbar />
                <Routes>
                        <Route exact path='/' element={< Home />}></Route>
                        <Route exact path='/home' element={< Home />}></Route>
                        <Route exact path='/menu' element={< Menu />}></Route>
                        <Route exact path='/store' element={< Store />}></Route>
                        <Route exact path='/login' element={< Authentication />}></Route>
                        <Route exact path='/menu/:param' element={< SubMenu />}></Route>
                        <Route exact path='/cart' element={< Cart />}></Route>
                </Routes>
                <Footer/>
            </Router>
        </>
    )
}

export default App
