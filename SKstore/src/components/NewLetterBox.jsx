import React from 'react'

const NewLetterBox = () => {

    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
        "Don’t miss out on exclusive deals, product updates, and more! Join our community and be the first to enjoy special offers delivered straight to your inbox."
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input required className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter Your Email'></input>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewLetterBox