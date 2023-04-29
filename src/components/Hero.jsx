import React, { useState } from 'react'
import Form from './Form'
import { ethers } from 'ethers'


const Hero = () => {
    const [accounts, setAccounts] = useState(null)
    const [account, setAccount] = useState(null)

  
    const connect = async()=>{
        if (typeof window.ethereum !== "undefined") {
            try{
                console.log('connecting')
                const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
                setAccounts(accounts)
                const acc = ethers.utils.getAddress(accounts[0])
                setAccount(acc)
            } catch(error) {
                console.log(error)
            }
        }
        else{
            console.log("Please install metamask");
        }
    }
    
   
    

  return (
    <header class="bg-white dark:bg-gray-900 mb-40">
        <div className="m-2">
            <div className="navbar bg-teal-300 rounded-md">
                <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Homepage</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>About</a></li>
                    </ul>
                </div>
                </div>
                <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Dimo</a>
                </div>
                <div className="navbar-end">
                    <div className="">
                     {accounts ?
                        (<button className="btn glass text-black" onClick={connect}>
                        Connected
                     </button>):
                        (<button className="btn glass text-black" onClick={connect}>
                        Connect Wallet
                     </button>)}
                    </div>
                </div>
            </div>
        </div>

    <div class="mt-20 md:w-4/5 container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div class="w-full lg:w-1/2">
            <div class="lg:max-w-lg">
                <h1 class="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                    Welcome to our Token Swap Dapp! 
                </h1>
                <p class="mt-4 text-gray-600 dark:text-gray-300">
                    Our platform allows you to easily swap one cryptocurrency for another. Whether you're looking to diversify your portfolio or simply trade between coins, 
                    our Dapp makes it simple and fast. With our user-friendly interface, you can quickly swap tokens and take advantage of market opportunities
                </p>
                <div class="grid gap-6 mt-8 sm:grid-cols-2">
                    <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                        <svg class="w-14 h-14 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <span class="mx-3 text-sm">Fast and secure: Our platform uses cutting-edge blockchain technology to ensure fast and secure transactions.</span>
                    </div>

                    <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                        <svg class="w-14 h-14 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <span class="mx-3 text-sm">Wide range of tokens: We support a wide range of tokens, so you can easily swap between your favorite cryptocurrencies.</span>
                    </div>

                    <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                        <svg class="w-14 h-14 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <span class="mx-3 text-sm">Low fees: Our fees are some of the lowest in the industry, so you can keep more of your profits.</span>
                    </div>

                    <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                        <svg class="w-14 h-14 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <span class="mx-3 text-sm">User-friendly interface: Our Dapp is designed with the user in mind, making it easy for even beginners to use.</span>
                    </div>
                </div>
                <div className=" mt-4 flex justify-center bg-gradient-to-b from-blue-400 to-purple-400 stats shadow">
  
                    <div className="stat place-items-center">
                        <div className="stat-title">Downloads</div>
                        <div className="stat-value">31K</div>
                        
                    </div>
                    
                    <div className="stat place-items-center">
                        <div className="stat-title">Users</div>
                        <div className="stat-value text-secondary">4,200</div>
                        
                    </div>
                    
                    <div className="stat place-items-center">
                        <div className="stat-title">New Registers</div>
                        <div className="stat-value">1,200</div>
                        
                </div>
                
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
            <Form account={account}/>
            
        </div>
    </div>
</header>
  )
}

export default Hero
