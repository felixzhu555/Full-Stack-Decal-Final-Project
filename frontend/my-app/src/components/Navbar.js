import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

function Navbar() {

    const logout = () => {
        console.log('logout');
    }

    return (
        <div className="navbar">
            <Nav>
                <NavItem>
                    <NavLink href="/browse">Classes</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/mygroups">My Groups</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/creategroup">Create Group</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" onClick={logout}>Log Out</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Navbar;