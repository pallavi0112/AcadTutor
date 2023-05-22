import React from 'react'
import {useParams , useLocation, Outlet} from 'react-router-dom';
import Branch from '../Component/Branch/Branch'
import Navbar from '../Component/Navbar/Navbar'
import {navItems , BranchSubmenu}  from "../Data/Menu";
const BranchPage = () => {
  // const {branch} = useParams();
  // const location = useLocation();
  // console.log(location)
  // const {heading}= useLocation().state;
  // console.log(branch)
  // console.log(val)
  return (
    <>
    <Navbar menu={navItems} submenu={BranchSubmenu} />
   <Branch/>
    </>
  )
}

export default BranchPage;