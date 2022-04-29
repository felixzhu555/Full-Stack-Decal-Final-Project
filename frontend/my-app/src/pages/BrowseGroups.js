import React, { useState, useEffect, useReducer, useCallback } from "react";
import Navbar from "../components/Navbar.js";
import { ButtonGroup, Button } from "reactstrap";
import axios from "axios";
import GroupCard from "../components/GroupCard.js";

const backendURL = "http://localhost:4000/";

function BrowseGroups({ className }) {

    className = className.replace("+", " ")

    const clickDateCurry = (date) => {
        const clickDate = () => {
            let dString = date.toISOString().substring(0,10);
            setSelectedDate(dString);
            if (dString !== selectedDate) {
                setisReady(false);
            }
        }
        return clickDate;
    }

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateObjects = [];
    const today = new Date();
    let day = today.getDay();
    const dateButtons = [];
    for (let i = 0; i < 7; i++) {
        let dayofweek = weekdays[(day + i) % 7];
        let incrDate = new Date(today.getTime() + (i * 86400000));
        dateObjects.push(incrDate);
        let date = "" + (incrDate.getMonth() + 1) + "/" + incrDate.getDate();
        dateButtons.push( 
            <Button 
            onClick={clickDateCurry(incrDate)}
            color="primary" 
            outline
            >
                {dayofweek}<br/>{date}
            </Button> 
        )
    }
    const [selectedDate, setSelectedDate] = useState(today.toISOString().substring(0, 10));
    const [dayGroups, setDayGroups] = useState([])
    const [isReady, setisReady] = useState(false)
    //const [groupCards, setGroupCards] = useState([])
    
    // const [rerender, setRerender] = useState(false);
    // const [, updateState] = useState();
    // const forceUpdate = useCallback(() => updateState({}), [])

    return (
        <div>
            <div class="loginflex">
                <div class="extremeSpace"></div>
                <div class="centeredSpace">
                    <Navbar />
                    <h1>Study Groups for {className.replace("+", " ")}</h1>
                    <ButtonGroup>
                        {dateButtons}
                    </ButtonGroup>
                </div>
                <div class="extremeSpace"></div>
            </div>
        </div>
    )
    useEffect(() => {
        const getGroups = async () => {
            console.log(selectedDate + " " + className);
            const response = await axios.post(backendURL + "groups/get", {
                date: selectedDate,
                className: className})
            const g = [];
            // console.log(response);
            response.data.forEach(element => {
                g.push(element)
            });
            // console.log(g);
            setDayGroups(g);
            setisReady(true);
            return response   
        }
       getGroups()
       .then(() => {
            //setRerender(!rerender);
            //forceUpdate();
       })
       .catch(err => console.log(err));
    }, [selectedDate])
   
    // console.log("dayGroups:")
    // console.log(dayGroups);
    let gc = [];
    dayGroups.forEach(g => {
        gc.push(
            <GroupCard groupID={g._id} />
        )
        //console.log(g._id);
    })
    //setGroupCards(gc);

    if (isReady) {
        //console.log(groupCards);
        return (
            <div>
                <Navbar />
                <h1>Study Groups for {className}</h1>
                <ButtonGroup>
                    {dateButtons}
                </ButtonGroup>
                { gc }
            </div>
        )
    } else {
        return null
    }
    
}

export default BrowseGroups;