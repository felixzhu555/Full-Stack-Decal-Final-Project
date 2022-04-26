import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
//import { withRouter } from "./WithRouterFix";

const allClasses = [
    'CS 61A',
    'CS 61B',
    'CS 70',
    'EECS 16A',
    'EECS 16B',
    'DATA 8'
]

function CreateGroup() {
    const [classname, setClassname] = useState("CS 61A");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [allFilled, setAllFilled] = useState(true);

    const nav = useNavigate();

    const tryCreateGroup = () => {
        console.log("creating group");
        console.log({classname, title, location, date, time, link, description});
        if (classname === "" || title === "" || location === "" || date === "" || time === "" || description === "") {
            setAllFilled(false);
        } else {
            setAllFilled(true);
            nav("/mygroups")
        }
    }

    let classOptions = [];
    allClasses.forEach(e => classOptions.push(<option>{e}</option>));

    let failMessage;
    if (allFilled) {
        failMessage = ( <div></div> );
    } else {
        failMessage = ( <div>Please fill in every field.</div> );
    }

    return (
        <div>
            <Navbar />
            <h2>Create your own study group!</h2>
            <Form>
                <FormGroup>
                    <Label>
                        Class
                    </Label>
                    <Input
                        value={classname}
                        onChange={e => setClassname(e.target.value)}
                        name="class"
                        type="select"
                    >
                    {classOptions}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Study Group Title
                    </Label>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        name="title"
                        placeholder="e.g. 61A midterm"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Location
                    </Label>
                    <Input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        name="location"
                        placeholder="e.g. Soda 270"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Date (please pick a day within the next 7 days)
                    </Label>
                    <Input
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        name="date"
                        type="date"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Time
                    </Label>
                    <Input
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        name="time"
                        placeholder="e.g. 7-10pm"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Virtual Link
                    </Label>
                    <Input
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        name="link"
                        placeholder="optional"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Description
                    </Label>
                    <Input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        name="description"
                        placeholder="What/How will you be studying?"
                        type="textarea"
                    />
                </FormGroup>
            </Form>
            {failMessage}
            <Button onClick={tryCreateGroup} color="success">Create New Study Group</Button>
        </div>
        
    )
}

export default CreateGroup;