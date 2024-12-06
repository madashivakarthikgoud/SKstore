import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (<>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.brandLogo} className='mb-5 w-20' alt=''></img>
            <p className='w-full md:w-2/3 text-gray-600'>
            "Your one-stop destination for quality products, unbeatable deals, and a seamless shopping experience. Join us on the journey to redefine online shopping, where customer satisfaction is always our priority."            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                <li>Home</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 6969969600</li>
                <li>contact@sk.com</li>
            </ul>
        </div>
    </div>
    <div>
        <hr/>
        <p className='py-5 text-sm text-center'>2024 Shiva Karthik . Crafted with passion and creativity by me!</p>
    </div>
    </>
  )
}
export default Footer