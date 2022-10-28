import React, { useEffect } from "react";
import HistoryDayCase from "./HistoryDayCase.js"

export default function History(props) {


   let historyDayCasesRendered = []

    function renderDayArray() {
        historyDayCasesRendered = props.historyStats.map((DayCase, dayIndex )=> {
                return (
                    <>
                        <HistoryDayCase DayCase={DayCase} dayIndex={dayIndex} historyStats={props.historyStats} setHistoryStats={props.setHistoryStats}/>
                    </>
                )
            })
            historyDayCasesRendered = historyDayCasesRendered.reverse()
        }
    
    if(props.historyStats && props.historyStats.length > 0) {
        renderDayArray()
    }

    useEffect(() => {
            renderDayArray()
    }, [props.historyStats])


    return (
        <>
            {historyDayCasesRendered}
        </>
    )
}