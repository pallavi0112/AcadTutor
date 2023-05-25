import React, { useEffect } from 'react'
import './Location.css'
import { FaChevronRight, FaPassport } from 'react-icons/fa'
import { useLocation, useParams , Link, useNavigate} from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs'
const routes = [
  { path: '/:branch/:subject_id', breadcrumb: localStorage.getItem("Subject_Name")},
  { path: '/:branch/:subject_id/:unit', breadcrumb: localStorage.getItem("Unit_Name") }
];
const Location = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation()
  const navigate  = useNavigate()
  const { subject_id, unit } = useParams()
  // const path = navigate.pathname;
  // const patharray = path.split("/")
  // const cond = patharray.length;
  // console.log(navigate)
  // console.log(path)
  // console.log(cond)
  breadcrumbs.map(({match ,breadcrumb})=>{
    return (
      console.log(breadcrumb , match)
     
    )

  })
  console.log(subject_id, unit)
  return (
    <div className='location_container'>
      <ul className='breadcrumb'>
        {/* {
          patharray.map((val , index)=>{
                if(index == 0)
                    return null
                else if(index < cond-1)
                    return <><li key={index}><a href='/' className='link'>{val}</a><FaChevronRight/></li></>
                else
                    return <><li key={index}>{val}</li></>
          })
        } */}
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Link
            key={match.url}
            to={match.url}
            className={match.pathname === location.pathname ? "breadcrumb-active" : "breadcrumb-not-active"}
            onClick={()=>navigate(-1)}
          >
            {breadcrumb} /
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Location;