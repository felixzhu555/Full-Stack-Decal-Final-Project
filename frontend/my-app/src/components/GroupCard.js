import React, { useState } from "react";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import axios from "axios";
const backendURL = "http://localhost:4000/";

function GroupCard({ groupID }) {

    // figure out how to get day of the week and put it in date string

    let actionButton;
    if (true) { // if current user is in this group
        actionButton = <Button color="danger">Leave</Button>; 
        // add onClick function (either join or leave)
    } else {
        actionButton = <Button color="success">Join</Button>;
    }

    const [className, setClassName] = useState();
    const [date, setDate] = useState();
    const [location, setLocation] = useState();
    const [time, setTime] = useState();
    const [attendees, setAttendees] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    
    axios.post(backendURL + "groups/get", {
        _id: groupID
    }).then(
        res => res.data[0],
        err => {
            console.log(err);
            return ( <div>Error getting group info</div> );
        }
    ).then(data => {
        console.log(data);
        setClassName(data.className);
        setDate(data.date);
        setLocation(data.location);
        setTime(data.time);
        setAttendees(data.users);
        console.log(attendees + "  /  " + data.users)
        setDescription(data.description);
        setTitle(data.title);
    })

    console.log(className);
    console.log(date);
    console.log(location);
    console.log(time);
    console.log(description);
    console.log(title);

    let ret = "";
    attendees.forEach(a => {
        ret += a + ", ";
    });
    let newAttendees = ret.substring(0, ret.length - 2);

    return (
        <div>
            <Card body>
                <CardTitle tag="h4">
                    {title}
                </CardTitle>
                <CardText>
                    <ul>
                        <li><b>Class:</b> {className}</li>
                        <li><b>Location:</b> {location}</li>
                        <li><b>Date:</b> {date}</li>
                        <li><b>Time:</b> {time}</li>
                        <li><b>Attendees:</b> {newAttendees}</li>
                        <li><b>Description:</b> {description}</li>
                    </ul>
                </CardText>
                {actionButton}
            </Card>
        </div>
    )
}

export default GroupCard;