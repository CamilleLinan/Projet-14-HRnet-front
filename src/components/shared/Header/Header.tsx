import { FC } from 'react';
import "./_Header.scss";
import logo from "../../../assets/HRnet - Logo.png"
import { NavLink } from 'react-router-dom';
import { RightCircleOutlined, HomeOutlined } from '@ant-design/icons';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='logo-container'>
        <img src={logo} alt="Wealth Health logo" />
        <p>HRnet</p>
      </div>
      <div className='links-container'>
        <div>
          <HomeOutlined />&nbsp;
          <NavLink 
            className={({ isActive }) => (
              isActive ? 'link active' 
              : 'link inactive'
            )}
            title="Go to Home" 
            to={"/home"}>
            Home
          </NavLink>
        </div>
        <div>
          <RightCircleOutlined />&nbsp;
          <NavLink
            className={({ isActive }) => (
              isActive ? 'link active' 
              : 'link inactive'
            )} 
            title="View Current Employees" 
            to={"/employees"}>
            View Current Employees
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
