import React, { useState } from 'react';
import { 
    Dropdown, 
    DropdownToggle,
    DropdownMenu, 
    DropdownItem } from 'reactstrap';

function ProfileIcon({ onRouteChange, toggleModal }) {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
            <img
                src="http://tachyons.io/img/logo.jpg"
                className="pa1 br-100 h3 w3 dib" alt="avatar" />
      </DropdownToggle>
      <DropdownMenu right className="b--transparent shadow-5" style={{marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.5)'}}>
        <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
        <DropdownItem onClick={() => {
          window.sessionStorage.removeItem('token');
          onRouteChange('signout');
          }}>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    )
}

export default ProfileIcon;