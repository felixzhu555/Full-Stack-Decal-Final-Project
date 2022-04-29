import React from "react";
import { Button } from "reactstrap";
import '../Homepage.css';

function Homepage() {
    return (
        <div class="homescreen">
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <h1 class="title">Match n' Study</h1>
            <div class="homeflexbox">
                <div class = "left">
                    <div class="divider"></div>
                
                    <div class="description">
                        <h5><strong>Having a hard time in CS 61A? Preparing for the EECS 16A midterm next week? 
                            <br></br>Find a study group today for any introductory CS class here at Berkeley!</strong></h5>
                    </div>

                    <div class="buttons">
                        <div class="space"></div>
                        <div class="button1">
                            <Button color="success" href="/register">Register</Button>
                        </div>
                        <div class="button2">
                            <Button color="primary" href="/login">Login</Button>
                        </div>
                        <div class="space"></div>
                    <div class="divider"></div>
                    </div>

                </div>
                <div class="right">
                    <img src={require("../images/LaunchPic.png")} alt="study group"/>
                </div>
            </div>
        </div>
    )
}

export default Homepage;