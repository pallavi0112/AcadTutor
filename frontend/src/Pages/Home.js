import React from 'react'
import { navItems, BranchSubmenu } from "../Data/Menu";
import Navbar from '../Component/Navbar/Navbar'
import LoginForm from '../Component/loginSignup/LoginForm';
import Section from '../Component/Homesections.jsx/Container'
import Img from '../Component/Homesections.jsx/Img'
import Content from '../Component/Homesections.jsx/Content'
import img1 from '../Images/herosec1.png'
import img2 from '../Images/homesec2.png'
import CardSection from '../Component/Homesections.jsx/CardSection';
import Features from '../Component/Homesections.jsx/Features';
import Footer from "../Component/Footer/Footer";
const Home = () => {
  return (
    <>
      <LoginForm />
        <Navbar menu={navItems} submenu={BranchSubmenu} />
        <Section
          props1={
            <Content
              heading={<React.Fragment>Your <strong className='strong'>Online Academic Learning</strong> starts here. . .</React.Fragment>}
              content='Discover the platform that provides you all the Academic resources that you need to outperform in your class.'
              btn='Get Started'
            />
          }
          props2={
            <Img img={img1} />
          }

        />
      <main>
        <section>
          <Features />
        </section>
        <section>
          <CardSection />
        </section>
        <section className='section-2'>
          <Section
            props1={
              <Img img={img2} />
            }
            props2={
              <Content
                heading={<React.Fragment>Attend every class <strong className='strong'>wherever you are</strong> staying in...</React.Fragment>}
                content='A learning system based on formalised teaching but with the help of E-resources.'
                btn='Explore Resources'
              />
            }
          />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Home