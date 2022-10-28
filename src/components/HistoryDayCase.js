import React , {useEffect, useState} from "react";
let arrayTimesRendered = []
export default function HistoryDayCase(props) {

    
    const [historyStatsCopy, setHistoryStatsCopy] = useState(props.historyStats)  
    
    function dayStatsRender() {
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

    console.log(props.DayCase)
    if(props.DayCase.array && (props.DayCase.array.length > 0)) {
        dayStatsRender()
    }
    
    function handleDeleteStat(event, index) {
        console.log(props.DayCase.array.length)
        console.log(historyStatsCopy)
        if(props.DayCase.array.length > 1) {
            let newArray = historyStatsCopy
            newArray[props.dayIndex].array.splice(index, 1)
            props.setHistoryStats([...newArray])
            setHistoryStatsCopy(props.historyStats)
            localStorage.setItem('stats', JSON.stringify(props.HistoryStats))
            dayStatsRender()
        }
        else if(props.DayCase.array.length === 1){
            let newArray = historyStatsCopy
        newArray.splice(props.dayIndex, 1)
        props.setHistoryStats([...newArray])
        setHistoryStatsCopy(props.historyStats)
        localStorage.setItem('stats', JSON.stringify(props.HistoryStats))
        dayStatsRender()
        }
       else {
            setHistoryStatsCopy = []
            props.setHistoryStats = []
            localStorage.setItem('stats', JSON.stringify(props.HistoryStats))
        }
    }

    console.log(arrayTimesRendered)

    useEffect(() => {
        dayStatsRender()
    }, [props.historyStats])

    function handleExpand() {
        console.log("expand")
    }

    return (
        <>
            <div className="dayStat">
                <h1>{props.DayCase.date}</h1>
                <button className="expand" onClick={handleExpand}> - </button>
            </div>
            {arrayTimesRendered}
        </>
    )
}