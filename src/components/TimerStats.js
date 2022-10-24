import React from "react";
import { timerArray } from "./TimerStatsSaves";

export default function TimerRight(props) {
    console.log(props.timerArray)
    
    let renderedTimerArray = timerArray.map((timerItem, index)=> {
        return (
            <>
                <p>{index}</p>
                <p>{timerItem.min}:{timerItem.sec}</p>
            </>
        )
    })
    return renderedTimerArray
}