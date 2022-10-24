import React, {useState, useEffect} from "react"
import {timerArray} from "./TimerStatsSaves"
//////USESTATE ASYNC AND DOESNT UPDATE IN TIME


export default function Timer() {

    const [isTimerOn, setIsTimerOn] = useState(false)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    //const [timerArray, setTimerArray] = useState([{min: "", sec: ""}])
    //const [timerArray, setTimerArray] = useState([])
    //let timerArray = []

    useEffect(() => {
        
        let interval = null

        if(isTimerOn) {
            setSeconds(0)
            setMinutes(0)
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1)
                if(seconds === 59) {
                    setMinutes(prevMinutes => prevMinutes + 1)
                    setSeconds(0)
                }
            }, 1000)
        }
        else {
            //setTimerArray(prevArray => [...prevArray, {min: `${minutes}`, sec: `${seconds}`}])
            //timerArray = ({"min": ${minutes}, "sec": `${seconds}`})
            if((minutes === 0) && (seconds === 0)) {
            } else {
                console.log(minutes, seconds)
                timerArray.push(minutes)
                timerArray.push(seconds)
            }
            clearInterval(interval)

            console.log(timerArray)
        }
        return () => clearInterval(interval)
    }, [isTimerOn])

    const [updatedTimerArray, setUpdatedTimerArray] = useState(null)
    //const [done, setDone] = useState(null)

    useEffect(() => {
        if(isTimerOn === false) {
            setUpdatedTimerArray([...timerArray])
            //setDone(true)
            //console.log(updatedTimerArray)
        }
    }, [isTimerOn])
    console.log(updatedTimerArray)

    return (
        <div id="timer">
            <div id="timer-bar">
                <button id="timer-minimise">--</button>
            </div>
            <div id="timer-main">
                <h1>{minutes}:{seconds}</h1>
                <button onClick={() => setIsTimerOn(prevTimerOn => !prevTimerOn)} id="timer-start">{!isTimerOn && "START" || "STOP"}</button>
                <div id="timer-left">
                    <div id="timer-stats">
                        <p id="stats-best">Best: 00:00</p>
                        <p id="stats-worst">Worst: 00:00</p>
                        <p id="stats-avg">Avg-5: 00:00</p>
                    </div>
                    <div id="timer-buttons">
                        <button id="timer-delete-last">DELETE LAST</button>
                        <button id="timer-reset">RESET</button>
                    </div>
                </div>
                <div id="timer-right">
                    {updatedTimerArray}
                </div>
            </div>
        </div>
    )
}