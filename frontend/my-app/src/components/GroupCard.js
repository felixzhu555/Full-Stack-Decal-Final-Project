import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const backendURL = "http://localhost:4000/";

function GroupCard({ groupID }) {
    const nav = useNavigate();

    const [inGroup, setInGroup] = useState(false);

    const config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }

    axios
    .get(backendURL + "user/me", config)
    .then(res => {
        let g = res.data.group;
        g.forEach(id => {
            if (id === groupID) setInGroup(true);
        });
    })
    .catch(err => console.log(err))

    const leaveGroup = () => {
        axios
        .put(backendURL + "user/leave", {
            username: localStorage.getItem("user"),
            group: groupID,
        }, config)
        .then(res => {
            console.log("Successfully left the group.");
            setInGroup(false);
            let temp = attendees.filter(e => localStorage.getItem("user") !== e);
            setAttendees(temp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const joinGroup = () => {
        axios
        .put(backendURL + "user/add", {
            username: localStorage.getItem("user"),
            group: groupID
        }, config)
        .then(res => {
            console.log("Successfully joined group");
            setInGroup(true);
            let temp = attendees;
            temp.push(localStorage.getItem("user"));
            setAttendees(temp);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    let actionButton;
    if (inGroup) {
        actionButton = <Button color="danger" onClick={leaveGroup}>Leave</Button>; 
    } else {
        actionButton = <Button color="success" onClick={joinGroup}>Join</Button>;
    }

    const [className, setClassName] = useState("");
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [attendees, setAttendees] = useState([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [isReady, setisReady] = useState(false)
    
    useEffect(() => {
        const getData = async () => {
            const response = await axios.post(backendURL + "groups/get", {_id:groupID});
            const {title, date, location, time, description, users, className} = response.data[0];
            setClassName(className);
            setDate(new Date(date));
            setTime(time);
            setLocation(location);
            setAttendees(users);
            setDescription(description);
            setTitle(title);
            //console.log(response)
            setisReady(true)
            return response;
        }
        getData().catch(err => console.log(err));
    }, [])
    
    //2022-04-30 -> 5/1
    const formatDate = () => {
        let newDate = new Date(date.getTime() + 3600000*7);
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        return month + "/" + day;
    }
    
    if(isReady){
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
                            <li><b>Date:</b> {formatDate()}</li>
                            <li><b>Time:</b> {time}</li>
                            <li><b>Attendees:</b> {newAttendees}</li>
                            <li><b>Description:</b> {description}</li>
                        </ul>
                    </CardText>
                    {actionButton}
                </Card>
            </div>
        )
    } else {
        return null
    }
    
}

export default GroupCard;






    // console.log(className)

    // useEffect(() => {
    //     axios.post(backendURL + "groups/get", {
    //         _id: groupID
    //     }).then(
    //         res => res.data[0],
    //         err => {
    //             console.log(err);
    //             return ( <div>Error getting group info</div> );
    //         }
    //     ).then(data => {
    //         console.log(data);
    //         // const {title, date, location, time, description, users, className} = data;
    //         // console.log(a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g);
    //         // const {title} = data;
    //         // console.log(title);
    //         setClassName(data.className);
    //         setDate(data.date);
    //         setLocation(data.location);
    //         setTime(data.time);
    //         setAttendees(data.users);
    //         //console.log(attendees + "  /  " + data.users)
    //         setDescription(data.description);
    //         setTitle(data.title);
    //     })
    //     return () => {};
    // }, [])