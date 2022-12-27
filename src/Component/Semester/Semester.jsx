import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import { Keyboard, Pagination, Navigation, Mousewheel } from "swiper";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Semester.css'
import Subject from '../Subject/Subject';
import { useLocation } from 'react-router-dom';
const Semester = (props) => {
  const [sem1 , setSem1] = useState([
    {
      "sub_name" : "",
      "sub_id" : "",
      "summary" : ""
    }])
  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const branch = patharray[patharray.length - 1].toUpperCase();
  
  useEffect(() => {
    AOS.init(
      {
        offset: 180,
        duration: 500,
        easing: "linear",
        delay: 100,
      }
    );

    const GetSemesterData = async (branch) => {
      console.log("function branch : " + branch)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/content/${branch}/get_branch`, { 'withCredentials': true }
        );
        const data = response.data
        console.log(data)

      } catch (err) {
        console.error(err);
      }
    };

    GetSemesterData(branch);
  }, [])




  return (
    <div data-aos={props.fade} className='semester'>
      <h2 className='sem-heading'>{props.sem} semester</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={2}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {
          props.subData.map((val, index) => {
            return <SwiperSlide><Subject key={index} img={val.img} name={val.Name} desc={val.Desc} /></SwiperSlide>
          })
        }
      </Swiper>

    </div>
  )
}

export default Semester