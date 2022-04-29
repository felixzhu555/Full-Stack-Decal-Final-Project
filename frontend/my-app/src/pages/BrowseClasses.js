import React from "react";
import Navbar from "../components/Navbar.js";
import { Button } from "reactstrap";
import '../BrowseClasses.css';

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
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="loginflex">
            <div class="extremeSpace"></div>
            <div class="centeredSpace">
                <h1>Which class are you studying for?</h1>
                {classButtons}
            </div>
            <div class="extremeSpace"></div>
        </div>
        </div>
        
    )
}

export default BrowseClasses;