import React from 'react';
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
import NewLetterBox from '../components/NewLetterBox';

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'><strong>Our Store</strong></p>
          <p className='text-gray-500'>Srinivasa nagar<br/> jagathgirigutta, Hyderabad, Telangana</p>
          <p className='text-gray-500'><strong>Tel:</strong> 7337...... <br /><strong>Email:</strong> ....shivakarthik....@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at SKstore</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  );
};

export default Contact;
