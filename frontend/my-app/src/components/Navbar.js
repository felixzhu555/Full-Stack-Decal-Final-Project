import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const nav = useNavigate();

    const logout = () => {
        console.log('logout for user ' + localStorage.getItem("user"));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/");
    }

    const goBrowse = () => {
        nav("/browse");
    }

    const goMyGroups = () => {
        nav("/mygroups");
    }

    const goCreateGroup = () => {
        nav("/creategroup");
    }

    return (
        <div className="navbar">
            <Nav>
                <NavItem>
                    <NavLink onClick={goBrowse}>Classes</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={goMyGroups}>My Groups</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={goCreateGroup}>Create Group</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={logout}>Log Out</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Navbar;