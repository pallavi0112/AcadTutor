import React , {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Img = (props) => {
  useEffect(() => {
    AOS.init(
      {
        offset: 180,
        duration:500,
        easing: "linear",
        delay: 200,
      }
    );
  }, [])
  return (
    <div className='ImgBx'>
          <img src={props.img} alt='img' data-aos="fade-up"/>
    </div>
  )
}

export default Img