import React from 'react'
import './header.scss';
import cross from "../../assests/Cross.svg";

const Header = () => {
  return (
    <div className='header'>
        <div>Add from Excel</div>
        <img src={cross} alt="" />        
    </div>
  )
}

export default Header