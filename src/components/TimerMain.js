import React, {useState, useEffect, useRef} from "react"

const TimerMain = React.forwardRef((props, ref) => {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    //const [timerArray, setTimerArray] = useState([])
    const [timerStats, setTimerStats] = useState([{"min": 0, "sec": 0, "sum": 0}, {"min": 0, "sec": 0, "sum": 0}, {"min": 0, "sec": 0, "sum": 0}, ])


    function checkStats() {
        if(props.timerArray.length > 0) {
            let length = props.timerArray.length
            let temp = [...timerStats]
            let tempVar = Math.max(...props.timerArray.map(el => el.sum))
            temp[1] = {"min": Math.trunc(tempVar/60), "sec": tempVar%60, "sum": tempVar}
            tempVar = Math.min(...props.timerArray.map(el => el.sum))
            temp[0] = {"min": Math.trunc(tempVar/60), "sec": tempVar%60, "sum": tempVar}
            if(props.timerArray.length > 4) {
                tempVar = props.timerArray[length-1].sum + props.timerArray[length-2].sum + props.timerArray[length-3].sum + props.timerArray[length-4].sum + props.timerArray[length-5].sum
                tempVar = tempVar / 5
                temp[2] = {"min": Math.trunc(tempVar/60), "sec": Math.trunc(tempVar%60), "sum": tempVar}
            } else {
                temp[2] = {"min": 0, "sec": 0, "sum": 0}
            }
            setTimerStats(temp)

        } else {
            setTimerStats([{"min": 0, "sec": 0, "sum": 0}, {"min": 0, "sec": 0, "sum": 0}, {"min": 0, "sec": 0, "sum": 0}])
        }
    }

    useEffect(() => {
        
        let interval = null

        if(props.isTimerOn) {
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
                props.setTimerArray([...props.timerArray, {"min": Math.trunc(seconds/60), "sec": Math.trunc(seconds%60), "sum": minutes * 60 + seconds, "date": new Date().toLocaleDateString()}])
                
            }
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [props.isTimerOn])

    function timerRightArrayRender() {

        timerArrayRendered = props.timerArray.map((element, index) => {
            return (
                <div className="timerRightStat">
                    <p>{index + 1}.</p>
                    <p>{element.min}:{element.sec}</p>
                </div>
            )
        })
        timerArrayRendered = timerArrayRendered.reverse()
    }

    useEffect(() => {
        checkStats()
    }, [props.timerArray])


    let timerArrayRendered = []
    if(props.timerArray.length > 0) {
        timerRightArrayRender()
    }

    function deleteLast() {
        if(props.timerArray.length > 0) {
            let temp = [...props.timerArray]
            temp.pop()
            props.setTimerArray([...temp])
            timerRightArrayRender()
            checkStats()
        }
    }

    function reset() {
        props.setTimerArray([])
        setTimerStats([{"min": 0, "sec": 0}, {"min": 0, "sec": 0}, {"min": 0, "sec": 0}])
        setMinutes(0)
        setSeconds(0)
        timerRightArrayRender()
    }

    return (
        <div id="timer-main" ref={ref}>
                <h1>{Math.trunc(seconds/60)}:{Math.trunc(seconds%60)}</h1>
                <button onClick={() => props.setIsTimerOn(prevTimerOn => !prevTimerOn)} id="timer-start">{!props.isTimerOn && "START" || "STOP"}</button>
                <div id="timer-left">
                    <div id="timer-stats">
                        <p id="stats-best">Best: {timerStats[0].min}:{timerStats[0].sec}</p>
                        <p id="stats-worst">Worst: {timerStats[1].min}:{timerStats[1].sec}</p>
                        <p id="stats-avg">Avg-5: {timerStats[2].min}:{timerStats[2].sec}</p>
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