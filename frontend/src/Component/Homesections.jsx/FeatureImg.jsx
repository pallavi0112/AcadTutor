import React, {useEffect} from 'react'
import features1 from '../../Images/Features1.png'
import features2 from '../../Images/Features2.png'
import FeaturesCard from './FeaturesCard'
import AOS from 'aos';
import 'aos/dist/aos.css';
const FeatureImg = () => {
    useEffect(() => {
        AOS.init(
          {
            offset: 180,
            duration: 500,
            easing: "linear",
            delay: 100,
          }
        );
      }, [])
    return (
        <div className='features-imgcontainer'>
        <div className='features-imgBx'>
            <img src={features1} alt='features' />
            <img src={features2} alt='' />
        </div>
            <div className='features-content' style={{ top: "5%", left: "16%" }} data-aos="fade-right">
                <FeaturesCard
                    content="An online classroom designed to accelerate learning"
                />
            </div>
            <div className='features-content' style={{ top: "17%", left: "36%" }} data-aos="fade-right">
                <FeaturesCard
                    content="Unit Wise Test Series for better clarity of the concepts"
                />
            </div>
            <div className='features-content' style={{ top: "42%", left: "40%" }} data-aos="fade-right">
                <FeaturesCard
                    content="One to One interaction with your Teachers"
                />
            </div>
            <div className='features-content' style={{ top: "68%", left: "37%" }} data-aos="fade-right">
                <FeaturesCard
                    content="All Resources According to University Syllabus"
                />
            </div></div>
    )
}

export default FeatureImg