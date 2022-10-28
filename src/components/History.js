import React from "react";
import HistoryDayCase from "./HistoryDayCase.js"

export default function History(props) {

   // console.log(props)
   let historyDayCasesRendered = []
   //console.log(props.historyStats)
    //let historyStatsRendered = []
    
    if(props.historyStats && props.historyStats.length > 0) {
        historyDayCasesRendered = props.historyStats.map((DayCase, dayIndex )=> {
            return (
                <>
                    <HistoryDayCase DayCase={DayCase} dayIndex={dayIndex} allStats={props.historyStats} />
                </>
            )
        })
        historyDayCasesRendered = historyDayCasesRendered.reverse()
    }
   

    // DAYRENDERED = props.historyStats.map(dateArray => { return <DayRendered />
    //in History obj with best worst avg
    //buton de x care removes element from array
    //testing!
    //clear button with flex centered

    return (
        <>
            {historyDayCasesRendered}
        </>
    )
}