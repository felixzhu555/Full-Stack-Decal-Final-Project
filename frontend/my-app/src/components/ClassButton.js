import React from "react";

function ClassButton ({ classString, onClick }) {
    return (
        <div className="button" onClick={onClick}>
            {classString}
        </div>
    )
}