import React, {useState, useEffect, useRef} from "react"
import TimerMain from "./TimerMain"


export default function Timer() {

    const [minimiseTimer, setMinimiseTimer] = useState(false)
    const mainRef = useRef(null)
    const timerRef = useRef(null)

    function minimiseFunction() {
        setMinimiseTimer(prevValue => !prevValue)

        if(minimiseTimer === false) {
            timerRef.current.style.transform = "translate(0, 278px)"
            timerRef.current.style.transition = "0.5s"
        } else {
            timerRef.current.style.transform = "translate(0, 0)"
        }
    }

    return (
        <div id="timer" ref={timerRef}>
            <div id="timer-bar">
                <button id="timer-minimise" onClick={minimiseFunction}>--</button>
            </div>
            <TimerMain ref={mainRef} />
        </div>
    )
}
//