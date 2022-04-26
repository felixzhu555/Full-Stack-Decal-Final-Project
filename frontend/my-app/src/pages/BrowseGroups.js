import React from "react";
import Navbar from "../components/Navbar.js";

function BrowseGroups({ className }) {
    return (
        <div>
            <Navbar />
            <h2>Study Groups for {className}</h2>
        </div>
    )
}

export default BrowseGroups;