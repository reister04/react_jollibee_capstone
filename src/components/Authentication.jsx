import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

const Authentication = () => {

    const navigate  = useNavigate ();
    const [accounts, setAccounts] = useState([{ username: "admin", password: "admin", isLoggedIn: false, cart: []}]);
    
    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem('accounts'));
        if (accounts) {
            setAccounts(accounts);
        }
    }, []);
    
    useEffect(() => {
        if (accounts.length !== 1) {
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        const loggedInUser = accounts.find(account => account.isLoggedIn);
        if (loggedInUser) {
            navigate("/home");
            window.location.reload(false);
        }
    }, [accounts, navigate]);

    const handleSignUp = (e) => {
        console.log("signup to par");
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const repPass = e.target[2].value;

        if (username && password && repPass && password == repPass) {
            const foundAccount = accounts.find((account) => {
                return account.username === username;
            });

            if (foundAccount) {
                console.log("This user already exists in the system.");
            } else {
                setAccounts([...accounts, {username: username, password: password, isLoggedIn: false, cart: []}])
                e.target[0].value = '';
            }
        }
        e.target[1].value = '';
        e.target[2].value = '';
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;    

        const foundAccount = accounts.find((account) => {
            return account.username === username && account.password === password;
        });

        if (foundAccount) {
            setAccounts(accounts.map((account) => {
                if (account.username === username && account.password === password) {
                    return { ...account, isLoggedIn: true };
                } else {
                    return account;
                }
            }));
            console.log("user exist");
        } else {
            console.log("Wrong Username and Password");
        }
    }

    return (
        <>
            <main className="bg-gray-200 max-w-[1200px] p-2 mx-auto flex flex-col font-poppins md:flex-row md:justify-between min-h-[400px] md:px-10 md:h-[75vh]">
                <section className="md:w-[45%] py-5">
                    <h1 className="font-bold">Sign In</h1>
                    <h2 className="text-gray-400 text-sm mb-4">Sign in with your email and password</h2>
                    <form action="" onSubmit={handleSignIn}>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" autoComplete="current-username"/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password" autoComplete="current-password"/>
                        </div>
                        <input type="submit" value="Sign In" className="bg-red-600 text-white py-1 rounded w-full uppercase"/>
                    </form>
                </section>
                <div className="md:w-[1px] md:min-h-[400px] border border-red-600 my-3 m flex items-center">
                </div>
                <section className="md:w-[45%] py-5">
                    <h1 className="font-bold">Sign Up</h1>
                    <h2 className="text-gray-400 text-sm mb-4">Create account to start using Jollibee Delivery</h2>
                    <form action="" onSubmit={handleSignUp}>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg_username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reg_username" type="text" placeholder="Username" autoComplete="new-username"/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg_password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reg_password" type="password" placeholder="password" autoComplete="new-password"/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg_repeat_password">
                            Repeat Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reg_repeat_password" type="password" placeholder="password" autoComplete="repeat-password"/>
                        </div>
                        <input type="submit" value="Sign Up" className="bg-red-600 text-white py-1 rounded w-full uppercase"/>
                    </form>
                </section>
                
            </main>
        </>
    )
}

export default Authentication