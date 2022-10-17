import React, {useState} from "react"

export default function Timer() {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isTimerOn, setIsTimerOn] = useState(false)

        
        
    React.useEffect(() => {

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
            
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)

    }, [isTimerOn])

    return (
        <div id="timer">
            <div id="timer-bar">
                <button id="timer-minimise">--</button>
            </div>
            <div id="timer-main">
                <h1>{minutes}:{seconds}</h1>
                <button onClick={() => setIsTimerOn(prevTimerOn => !prevTimerOn)} id="timer-start">START</button>
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
                </div>
            </div>
            
        </div>
    )
}