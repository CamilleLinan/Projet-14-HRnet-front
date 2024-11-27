import { FC } from 'react';
import "./_Header.scss";
import { NavLink } from 'react-router-dom';
import { RightCircleOutlined } from '@ant-design/icons';

const Header: FC = () => {
  return (
    <header>
      <p>HRnet</p>
      <div>
        <RightCircleOutlined />&nbsp;
        <NavLink title="View all employees" to={"/"}>
          View Current Employees
        </NavLink>
      </div>
    </header>
  );
};

export default Header;