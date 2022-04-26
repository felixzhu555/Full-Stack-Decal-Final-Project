import React from "react";
import { Button } from "reactstrap";

function Homepage() {
    return (
        <div>
            <h1>Match n' Study</h1>
            <h5>Having a hard time in CS 61A? Preparing for the EECS 16A midterm next week? Find a study group today for any introductory CS class here at Berkeley!</h5>
            <Button color="success" href="/register">Register</Button>
            <Button color="primary" href="/login">Login</Button>
            <img src={require("../images/study_group.jpg")} alt="study group"/>
        </div>
    )
}

export default Homepage;