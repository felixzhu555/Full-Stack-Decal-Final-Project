import React from "react";
import Navbar from "../components/Navbar.js";
import { ButtonGroup, Button } from "reactstrap";

function BrowseGroups({ className }) {

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    let day = today.getDay();
    const dateButtons = [];
    for (let i = 0; i < 7; i++) {
        let dayofweek = weekdays[(day + i) % 7];
        let incrDate = new Date(today.getTime() + (i * 86400000));
        let date = "" + (incrDate.getMonth() + 1) + "/" + incrDate.getDate();
        dateButtons.push( 
            <Button color="primary" outline>{dayofweek}<br/>{date}</Button> 
        )
    }

    return (
        <div>
            <Navbar />
            <h1>Study Groups for {className.replace("+", " ")}</h1>
            <ButtonGroup>
                {dateButtons}
            </ButtonGroup>
        </div>
    )
}

export default BrowseGroups;