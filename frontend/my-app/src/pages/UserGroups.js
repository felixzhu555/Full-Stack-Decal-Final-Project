import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";
import GroupCard from "../components/GroupCard.js";

import axios from "axios";
const backendURL = "http://localhost:4000/";

function UserGroups() {

    const [userGroups, setUserGroups] = useState([]);
    
    const config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }
    
    axios
    .get(backendURL + "user/me", config)
    .then((res) => {
        setUserGroups(res.data.group);
        //console.log(res.data.group); // -> ["234897f93n494243"] (correct)
        //console.log(userGroups);     // -> undefined (??????)
    })
    .catch((err) => {
        console.log(err);
        return ( <div>error getting user</div> );
    })

    //console.log(userGroups);
    var groupCards = [];
    if (userGroups !== []) {
        userGroups.forEach(id => {
            groupCards.push(
                <GroupCard groupID={id} />
            )
        });
    } else {
        groupCards.push( <div>No groups as of now!</div> )
    }
    
    return (
        <div>
            <Navbar />
            <h1>My Study Groups</h1>
            {groupCards}
        </div>
    )

    // const func = axios
    // .get(backendURL + "user/me", config)
    // .then((res) => res.data)
    // .then((user) => {return user.group})
    // .catch((err) => {
    //     console.log(err);
    //     return ( <div>error getting user</div> );
    // });

    // var groupCards = []

    // const getUserGroup = (usergroup) => {
    //     return usergroup
    // }

    // const getGroup = async () => {
    //     const userGroups = await func;
    //     if (userGroups !== []) {
    //         userGroups.forEach(id => {
    //             groupCards.push(
    //                 <GroupCard groupID={id} />
    //             )
    //         })
    //     } else {
    //         groupCards.push( <div>No groups as of now!</div> )
    //     }
    //     return groupCards;
    //     // console.log(userGroups)
    //     // console.log(groupCards)
    // }

    // var groupCards2;
    // getGroup().then(cards => {
    //     groupCards2 = cards;
    // }
    // );

    // return (
    //     <div>
    //         <Navbar />
    //         <h1>My Study Groups</h1>
    //         {groupCards}
    //     </div>
    // )


    
}

export default UserGroups;