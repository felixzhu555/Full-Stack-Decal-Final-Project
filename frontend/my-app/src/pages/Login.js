import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
//import { withRouter } from "./WithRouterFix";
import { useNavigate } from "react-router-dom";
import '../Login.css';

import axios from "axios";
const backendURL = "http://localhost:4000/";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameExists, setUsernameExists] = useState(true);
    const [passwordCorrect, setPasswordCorrect] = useState(true);

    const nav = useNavigate();
    let failMessage;
    if (!usernameExists) {
        failMessage = ( <div>Username does not exist</div> );
    } else if (!passwordCorrect) {
        failMessage = ( <div>Incorrect password.</div> );
    }

    const tryLogin = () => {
        //  if username exists && password matches username 
        //      go to browse classes page
        //  else
        //      stay on page
        console.log("trying to log in");
        console.log({username, password});
        
        axios.post(backendURL + "user/login", {
            username:username,
            password:password,
        }).then(
            (res) => {
                console.log("Logged In!");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", username);
                nav("/mygroups");
            },
            (err) => {
                if(err.request.response === "Username not found."){
                    console.log("Username not found");
                    setUsernameExists(false);
                } else if (err.request.response === "Incorrect password.") {
                    console.log("Wrong password");
                    setUsernameExists(true);
                    setPasswordCorrect(false);
                }
            }
        )
        if (username !== "" && password !== "") {
            nav("/mygroups");
        }
    }

    return (
        <div class="loginpage">
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
            <div class="loginflex">
                <div class="extremeSpace"></div>
                <div class="centeredSpace">
                    <Button href="/">Home</Button>
                    <div class="ugly"></div>
                    <div class="ugly"></div>
                    <div class="ugly"></div>
                    <Form>
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
                    </Form>
                    {failMessage}
                    <Button onClick={tryLogin} color="success">Log In</Button>
                </div>
                
            </div>
        </div>
    )

}

export default Login;