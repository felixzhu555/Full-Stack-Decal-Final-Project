import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";
import GroupCard from "../components/GroupCard.js";

import '../UserGroups.css';

import axios from "axios";
const backendURL = "http://localhost:4000/";

function UserGroups() {

    const [userGroups, setUserGroups] = useState([]);
    const [isError, setIsError] = useState(false);

    const config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }

	useEffect(() => {
        axios
        .get(backendURL + "user/me", config)
        .then((res) => {
            setUserGroups(res.data.group)
            setUserGroups(['626a26806e8a9d7905e30e67'])
            console.log(res.data.group)
            console.log(userGroups)
            console.log('User Group ')
        })
        .catch((err) => {
            setIsError(true)
        })
        return () => {};
	}, []);

    //console.log(userGroups);
    // var groupCards = [];
    // if (userGroups !== []) {
    //     userGroups.forEach(id => {
    //         groupCards.push(
    //             <GroupCard groupID={id} />
    //         )
    //     });
    // } else {
    //     groupCards.push( <div>No groups as of now!</div> )
    // }
    return (
        <div>
            <Navbar />
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="ugly"></div>
            <div class="loginflex">
                <div class="extremeSpace"></div>
                <div class="centeredSpace">
                    <h1>My Study Groups</h1>
                    {isError || userGroups.length === 0? (
                                    <div>No groups as of now!</div>
                            ) : (
                    userGroups.map((id) => (
                        <GroupCard groupID={id} />
                    ))
                )}
                </div>
                <div class="extremeSpace"></div>
            </div>
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