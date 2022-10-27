import React from "react";

export default function History(props) {

    console.log(props)

   console.log(props.historyStats)
    let historyStatsRendered = []
   

    // DAYRENDERED = props.historyStats.map(dateArray => { return <DayRendered />
    //in History obj with best worst avg
    //buton de x care removes element from array
    //testing!
    //clear button with flex centered

    return (
        <>
            {historyStatsRendered}
        </>
    )
}