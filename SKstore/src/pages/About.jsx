import React from 'react';
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
import NewLetterBox from '../components/NewLetterBox';

export const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      
      {/* Why Choose Us Section */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20'>
        <div className='flex flex-col items-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
          <div className='text-3xl text-gray-800 mb-4'>
            <i className="fas fa-check-circle"></i>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Quality Assurance</h3>
          <p className='text-gray-600 text-center'>At Forever, we ensure every product meets high-quality standards, so you can shop with confidence. Each item is carefully inspected for quality before reaching you.</p>
        </div>

        <div className='flex flex-col items-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
          <div className='text-3xl text-gray-800 mb-4'>
            <i className="fas fa-truck"></i>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Convenience</h3>
          <p className='text-gray-600 text-center'>At Forever, we prioritize your convenience by offering an easy-to-use platform, fast shipping, and hassle-free returns, making your shopping experience smooth and enjoyable.</p>
        </div>

        <div className='flex flex-col items-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
          <div className='text-3xl text-gray-800 mb-4'>
            <i className="fas fa-headset"></i>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Exceptional Customer Service</h3>
          <p className='text-gray-600 text-center'>At Forever, we are committed to providing exceptional customer service, ensuring prompt responses, helpful assistance, and a seamless experience from start to finish.</p>
        </div>
      </div>

      <NewLetterBox />
    </div>
  );
};
