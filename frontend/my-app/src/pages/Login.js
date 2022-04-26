import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
//import { withRouter } from "./WithRouterFix";
import { useNavigate } from "react-router-dom";

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
        if (username !== "" && password !== "") {
            nav("/mygroups");
        }
    }

    return (
        <div>
            <Button href="/">Home</Button>
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
    )
}

export default Login;