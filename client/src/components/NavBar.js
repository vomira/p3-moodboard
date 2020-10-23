import React, { useState } from "react";
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  Navbar,
  NavbarBrand,  
  NavLink,
  NavItem,
} from "shards-react";
import { logout } from "../services/auth";
import Logo from "../resources/logo_trans_cropped.png";
import { Redirect, Link } from "react-router-dom";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const handleLogout = (props) => {
    logout().then(() => {
      props.setState(null);
      //props.history.push('/');
      return <Redirect to="/" />;
    });
  };

  return (
    <Navbar className='primary d-flex justify-content-between' expand='sm'>
    <img src={Logo} className='nav-logo'/>
            {props.user ? (
              <Nav
                className="nav-buttons nav-container d-flex justify-content-end mx-4"
              >
                <NavItem>
                  <NavLink href="#" onClick={() => handleLogout(props)}>
                    Log Out
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown open={open} toggle={() => setOpen(!open)}>
                    <DropdownToggle>Settings</DropdownToggle>
                    <DropdownMenu right>
                      {window.localStorage.getItem("mood") === "good" ? (
                        <DropdownItem>
                          <Link className="settings-link" to="/settings/news">
                            News Preferences
                          </Link>
                        </DropdownItem>
                      ) : (
                        ""
                      )}
                      <DropdownItem>
                        <Link className="settings-link" to="/moodcheck">
                          Set Mood
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </Nav>
            ) : (
              <Nav mx-4>
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              </Nav>
            )}

    </Navbar>
  );
};

export default NavBar;
