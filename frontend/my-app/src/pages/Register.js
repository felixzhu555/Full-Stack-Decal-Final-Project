import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
//import { withRouter } from "./WithRouterFix";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
const backendURL = "http://localhost:4000/";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [allFilled, setAllFilled] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [uniqueUsername, setUniqueUsername] = useState(true);

    const nav = useNavigate();
    
    let failMessage;
    if (allFilled) {
        if (passwordsMatch && uniqueUsername) {
            failMessage = ( <div></div> );
        } else if (!passwordsMatch) {
            failMessage = ( <div>Passwords do not match. Please try again.</div> );
        } else if (!uniqueUsername) {
            failMessage = ( <div>That username is taken. Please try again.</div> );
        }
    } else {
        failMessage = ( <div>Please fill in every field.</div> );
    }

    const tryRegister = () => {
        console.log({firstName, lastName, username, password, password2});
        if (firstName === "" || lastName === "" || username === "" || password === "" || password2 === "") {
            setAllFilled(false);
        } else {
            setAllFilled(true);
            if (password !== password2) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true);
                axios.post(backendURL + "user/register", {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password
                }).then(
                    (res) => {
                        console.log("Registration succeeded for: " + username);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("user", username);
                        nav('/browse');
                    },
                    (err) => {
                        if (err.request.response === "username taken") {
                            console.log("Registration failed, username taken");
                            setUniqueUsername(false);
                        }
                        console.log(err);
                    }
                )
            }
        }
    }

    return (
        <div>
            <Button href="/">Home</Button>
            <Form>
                <FormGroup>
                    <Label>
                        First Name
                    </Label>
                    <Input 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        name="firstName"
                        placeholder="e.g. John"
                        type="text" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Last Name
                    </Label>
                    <Input 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        name="lastName" 
                        placeholder="e.g. Smith" 
                        type="text" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Username
                    </Label>
                    <Input 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        name="username" 
                        type="text" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    </Label>
                    <Input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        type="password" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Confirm Password
                    </Label>
                    <Input 
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        name="password2" 
                        type="password" 
                    />
                </FormGroup>
            </Form>
            {failMessage}
            <Button onClick={tryRegister} color="success">Create New Account</Button>
        </div>
    )
}

export default Register;