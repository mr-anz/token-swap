import React from 'react'

const Modal = ({tokens, onSelect, onSubmit}) => {
  

  const handleSelect = (value) => {
    onSelect(value);
  };
  
  const handleSubmit = (value) => {
    onSubmit(value);
  };
  
  return (
    <>  
    
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
    <div className="modal">
    <div className="modal-box relative">
        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="form-control  mt-6">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>

       {tokens && tokens.map((token,i) => 
        (<div key={i} className='m-4 flex justify-start cursor-pointer'  onClick={() => handleSelect(token)}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={token.logoURI} className='contain'/>
            </div>
          </label>
          <h2 className="card-title ml-4">{token.name.slice(0,20)} - <small>{token.symbol}</small></h2>      

  </div>))}
        
    </div>
    </div>

    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
    <div className="modal">
    <div className="modal-box relative">
        <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="form-control  mt-6">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>

       {tokens && tokens.map((token,i) => 
        (<div key={i} className='m-4 flex justify-start cursor-pointer'  onClick={() => handleSubmit(token)}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={token.logoURI} className='contain'/>
            </div>
          </label>
          <h2 className="card-title ml-4">{token.name.slice(0,20)} - <small>{token.symbol}</small></h2>      

  </div>))}
        
    </div>
    </div>
    </>


  )
}

export default Modal