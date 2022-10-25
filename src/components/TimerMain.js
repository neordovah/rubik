import React, {useState, useEffect, useRef} from "react"

//export default function TimerMain(props) {
const TimerMain = React.forwardRef((props, ref) => {

    const [isTimerOn, setIsTimerOn] = useState(false)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [timerArray, setTimerArray] = useState([])


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
            if((minutes === 0) && (seconds === 0)) {
            } else {
                setTimerArray([...timerArray, {"min": minutes, "sec": seconds}])
            }
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isTimerOn])

    function timerRightArrayRender() {
        timerArrayRendered = timerArray.reverse().map((element, index) => {
            return (
                <div className="timerRightStat">
                    <p>{timerArray.length - index}.</p>
                    <p>{element.min}:{element.sec}</p>
                </div>
            )
        })
    }


    let timerArrayRendered = []
    if(timerArray.length > 0) {
        timerRightArrayRender()
    }

    function deleteLast() {
        if(timerArray.length > 0) {
            let temp = [...timerArray]
            temp.shift()
            setTimerArray([...temp])
            timerRightArrayRender()
        }
    }

    function reset() {
        setTimerArray([])
        timerRightArrayRender()
    }
    //console.log(props)

    //let value = props.minimiseValue

   // if(value === false) {
    return (
        <div id="timer-main" ref={ref}>
                <h1>{minutes}:{seconds}</h1>
                <button onClick={() => setIsTimerOn(prevTimerOn => !prevTimerOn)} id="timer-start">{!isTimerOn && "START" || "STOP"}</button>
                <div id="timer-left">
                    <div id="timer-stats">
                        <p id="stats-best">Best: 0:0</p>
                        <p id="stats-worst">Worst: 0:0</p>
                        <p id="stats-avg">Avg-5: 0:0</p>
                    </div>
                    <div id="timer-buttons">
                        <button id="timer-delete-last" onClick={deleteLast}>DELETE LAST</button>
                        <button id="timer-reset" onClick={reset}>RESET</button>
                    </div>
                </div>
                <div id="timer-right">
                    <h1>Times</h1>
                    {timerArrayRendered}
                </div>
            </div>
    )
})

export default TimerMain