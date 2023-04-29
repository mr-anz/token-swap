import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import qs from 'qs'
import { ethers } from 'ethers'
import ABI from '../abis/ERC20.json'
import BigNumber from 'big-number'




const Form = ({account}) => {
    const [tokens,setTokens] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null);
    const [select, setSelect] = useState(null);
    const [value, setValue] = useState(null)
    const [getValue, setGetValue] = useState(null)

    let Tokens, swapPriceJSON, swapQuoteJSON
    const listTokens = async()=>{
        console.log("initializing");
        let response = await fetch('https://cdn.furucombo.app/furucombo.tokenlist.json');
        let tokenListJSON = await response.json();
        Tokens = tokenListJSON.tokens;
        setTokens(Tokens)
    }

   const getPrice = async(e)=>{
        setValue(e.target.value)
        
        if(!selectedValue || !select || !value) return
        let amount = Number((value) * 10 ** selectedValue.decimals)
        console.log(amount)
        const params = {
            sellToken: selectedValue.address,
            buyToken: select.address,
            sellAmount: amount,
        }

        // Fetch the swap price.
        const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`);

        swapPriceJSON = await response.json();
        console.log("Price: ", swapPriceJSON);

        setGetValue( swapPriceJSON.buyAmount / (10 ** select.decimals));
        
    }
    
    const getQuote = async(acc,e)=>{
        e.preventDefault()
        if(!selectedValue || !select || !value) return
        let amount = Number((value) * 10 ** selectedValue.decimals)
        console.log(amount)
        const params = {
            sellToken: selectedValue.address,
            buyToken: select.address,
            sellAmount: amount,
            takerAddress: acc,
        }
        
        // Fetch the swap quote.
        const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);

        swapQuoteJSON = await response.json();
        console.log("Price: ", swapQuoteJSON);

        setGetValue( swapQuoteJSON.buyAmount / (10 ** select.decimals));

        return swapQuoteJSON
    }

    const trySwap = async()=>{
        const takerAddress = account
        const swapQuoteJSON = await getQuote(takerAddress)

        //set Token Allowance
        //set up approval amount
        const fromTokenAddress = selectedValue.address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const maxApproval = new BigNumber(2).pow(256).minus(1);
        const ERC20TokenContract = new ethers.Contract(fromTokenAddress, ABI, provider )
        
        // Grant the allowance target an allowance to spend our tokens.
        const tx = await ERC20TokenContract.approve(
            swapQuoteJSON.allowanceTarget,
            maxApproval,
        )
        .then((tx) => {
            console.log("tx: ", tx)
        });

        // Perform the swap
        //const receipt = await ethers.sendTransaction(swapQuoteJSON);
        //console.log("receipt: ", receipt);
    }

console.log(select)

    useEffect(() => {
        async function init(){
            await listTokens()
        }
        init()
    }, []);

  return (
    <div class="w-full max-w-sm p-6 m-auto mx-auto bg-gradient-to-b from-green-200 to-purple-200 rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex justify-center mx-auto">
            <img class="w-auto h-7 sm:h-8" src="https://seeklogo.com/images/S/snapsvg-logo-8E936C9AE9-seeklogo.com.png" alt=""/>
        </div>

        <form class="mt-6">
            <div >
            <label for="password" class="block text-base text-gray-800 dark:text-gray-200">Your Pay</label>
                <div className="btn-group grid grid-cols-2">
                    
                    <label htmlFor="my-modal-3" className="btn text-sm btn-outline">
                        {selectedValue && (
                            <div className="avatar placeholder mr-2">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                    <img src={selectedValue.logoURI} />
                                </div>
                            </div>
                                    
                        )}
                        {selectedValue ? (selectedValue.name.slice(0,11)) : "Token"}
                    </label>
                    <input type="number" placeholder="Type here" className="input input-bordered input-md" onChange={ getPrice}/>
                </div>
                <Modal tokens={tokens} onSubmit={(value) => setSelect(value)} onSelect={(value) => setSelectedValue(value)}/>
            </div>

            <div class="mt-10">
                <label for="password" class="block text-sm text-gray-800 dark:text-gray-200">Receive</label>
                <div className="btn-group grid grid-cols-2">
                    <label htmlFor="my-modal-4" className="btn text-sm btn-outline">
                        {select && (
                            <div className="avatar placeholder mr-2 ">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                    <img src={select.logoURI} />
                                </div>
                            </div>
                            
                        )}
                        {select ? (select.name.slice(0,11)) : "Token"}
                    </label>
                    <label type="number" placeholder="Type here" className="input input-bordered input-md">{getValue && getValue}</label>
                </div>            
            </div>

            <div class="mt-20 flex justify-center items-center glass">
                <button className="btn  w-full" type="submit" onClick={trySwap}>Swap</button>
            </div>
        </form>
        
       

      
    </div>
  )
}

export default Form