import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from "swiper";
import {Link} from "react-router-dom";

SwiperCore.use([Navigation, Pagination])

const HomeScreen = () => <div className="flex flex-col items-stretch space-y-16">
  <Swiper
    spaceBetween={50}
    slidesPerView={1}
    navigation
    loop
    pagination={{ clickable: true }}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    className="w-full sm:rounded-xl shadow"
    style={{height: '32rem'}}
  >
    <SwiperSlide>
      <img className="w-full h-full object-cover object-top filter brightness-75" src="/images/carousel-1.jpg"/>
      <div className="absolute sm:max-w-lg p-12 sm:right-16 inset-y-32 sm:inset-y-40 flex flex-col justify-center bg-gray-100 sm:rounded-lg shadow text-left text-3xl text-gray-900 font-wide font-light">
        <p>Get a clear picture of all of your assets and expenses in one secure place.</p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <img className="w-full h-full object-cover filter brightness-75" src="/images/carousel-2.jpg"/>
      <div className="absolute sm:max-w-sm p-12 sm:left-16 inset-y-28 sm:inset-y-28 flex flex-col justify-center bg-gray-100 sm:rounded-lg shadow text-left font-wide text-gray-900">
        <h2 className="text-4xl font-light">Reach your goals faster</h2>
        <p className="text-xl mt-5">Centralize all your accounts so you can learn, manage, and improve your financial status.</p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <img className="w-full h-full object-cover filter brightness-75" src="/images/carousel-3.jpg"/>
      <div className="absolute sm:max-w-sm p-12 sm:right-16 inset-y-24 flex flex-col justify-center bg-gray-100 sm:rounded-lg shadow text-left font-wide text-gray-900">
        <h2 className="text-4xl font-light">Start saving today</h2>
        <p className="text-xl mt-5">Set up budget limits to control your day-to-day spending across categories like groceries, food, rent or tech.</p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <img className="w-full h-full object-cover filter brightness-75" src="/images/carousel-4.jpg"/>
      <div className="absolute sm:max-w-sm p-12 sm:left-16 inset-y-32 flex flex-col justify-center bg-gray-100 sm:rounded-lg shadow text-left font-wide text-gray-900">
        <h2 className="text-4xl font-light">Stay organized</h2>
        <p className="text-xl mt-5">Centralize all your accounts so you can learn, manage, and improve your financial status.</p>
      </div>
    </SwiperSlide>
  </Swiper>
  <div className="h-56 flex flex-col justify-around text-center">
    <p className="text-4xl font-wide font-light px-8">We can't wait for you to try it out</p>
    <div className="flex justify-center items-center space-x-8">
      <Link to="/login" className="px-6 py-3 transition bg-gradient-to-tr from-blue-600 to-blue-500 hover:to-blue-600 text-white text-xl font-light rounded-lg shadow hover:shadow-lg">Login</Link>
      <Link to="/register" className="px-6 py-3 transition bg-gradient-to-bl from-blue-50 hover:from-white to-white text-blue-600 text-xl font-light rounded-lg shadow hover:shadow-lg">Register</Link>
    </div>
  </div>
</div>

export default HomeScreen