import React from "react";
import Navbar from "../components/Navbar.js";
import { Button } from "reactstrap";

const allClasses = [
    'CS 61A',
    'CS 61B',
    'CS 70',
    'EECS 16A',
    'EECS 16B',
    'DATA 8'
]

function BrowseClasses() {

    const buttonLink = (className) => {
        return "/browse/" + className.replace(" ", "+");
    }

    let classButtons = [];
    allClasses.forEach(className => {
        classButtons.push(
            <Button 
                href={buttonLink(className)}
                color="primary"
            >
                {className}
            </Button>
        )
    });

    return (
        <div>
            <Navbar />
            <h1>Which class are you studying for?</h1>
            {classButtons}
        </div>
        
    )
}

export default BrowseClasses;