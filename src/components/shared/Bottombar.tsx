import { bottombarLinks } from '@/constants';
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const {pathname} = useLocation();
  return (
       <section className="bottom-bar">
        {bottombarLinks.map((link)=>{
            const isActive = pathname === link.route;
            return(
              
              <NavLink to={link.route} key={link.lebel} className = {`${isActive && 'bg-primary-500 rounded-[10px]'}flex flex-center flex-col gap-1 p-2 transition`}>
                <img src={link.imgURL} alt={link.label} width={16} height={16} className={`${isActive && 'invert-white'}`} /> 
                <p className='tiny-medium text-light-2 item-center' >{link.label}</p>
              </NavLink>
       
            )
           })}
       </section>
      )
     }


export default Bottombar
