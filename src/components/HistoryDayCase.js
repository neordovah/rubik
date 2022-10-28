import React from "react";

export default function HistoryDayCase(props) {
let arrayTimesRendered = []
    //console.log(props.DayCase.array)    
    if(props.DayCase.array && props.DayCase.array.length > 0) {
        arrayTimesRendered = props.DayCase.array.map((element, index) => {
            return (
                <div className="stat">
                    <p>{element.min}:{element.sec}</p>
                    <button className="deleteTime" onClick={event => handleDeleteStat(event, index)}>X</button>
                </div>
            )
        })
        arrayTimesRendered = arrayTimesRendered.reverse()
    }
    
    function handleDeleteStat(event, index) {
        let newArray = props.allStats
        newArray[props.dayIndex].array.splice(index, 1) 
        localStorage.setItem('stats', JSON.stringify(newArray))
        console.log()
    }

    function handleExpand() {
        console.log("expand")
    }

    return (
        <>
            <div className="dayStat">
                <h1>{props.DayCase.date}</h1>
                <button className="expand" onClick={handleExpand}>-></button>
            </div>
            {arrayTimesRendered}
        </>
    )
}