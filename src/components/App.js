import React, { useEffect, useRef, useState } from "react"
import pllCases from "./pllCases"
import ollCases from "./ollCases"
import CaseComponent from "./CaseComponent"
import Timer from "./Timer"
import Scrambles from "./Scrambles"
import History from "./History"
import setTheDate from "./setTheDate"

let historyStats = []
//const [historyStats, setHistoryStats] = []
export default function Main() {
    //console.log(localStorage)

    const Cases = [pllCases, ollCases]
    let [page, setPage] = useState()
    const ref = useRef(null)
    const [isTimerOn, setIsTimerOn] = useState(false)
    const [timerArray, setTimerArray] = useState([])
    const [clickedHistory, setClickedHistory] = useState(0)
    const [timerArrayCopy, setTimerArrayCopy] = useState([])
    //localStorage.clear()
   

    function removeFromHistoryArray() {
        let date = timerArrayCopy[timerArrayCopy.length-1].date
        //console.log(historyStats.length)
        for(let i = 0; i < historyStats.length; i++) {
            //console.log(historyStats[i].date)
            if(historyStats[i].date == date) {
                historyStats[i].array.pop()
                //let temp = historyStats[i].array
                //temp = temp.pop()
                //setHistoryStats({"date": date, "array": temp})
                if((historyStats[i].array.length === 0) && (historyStats.length > 1)) {
                    historyStats.splice(i, 1)
                    //let temp = historyStats
                    //temp = temp.splice(i, 1)
                    //setHistoryStats(temp)
                } else if((historyStats[i].array.length === 0) && (historyStats.length === 1)) {
                    historyStats = []
                    //setHistoryStats([])
                }
            }
        }
        let temp = timerArrayCopy
        temp.pop()
        setTimerArrayCopy(temp)
    }

    const [date, setDate] = useState(new Date().toLocaleDateString())
    setTheDate(date, setDate)

    useEffect(() => {
       // console.log("B")
        if((!localStorage.stats) || (localStorage.stats === undefined)) {
            localStorage.setItem('stats', JSON.stringify([]))
        }
        if((timerArrayCopy.length > timerArray.length) && timerArray.length === 0) {
            while(timerArrayCopy.length > 0) {
                removeFromHistoryArray()
            }
            localStorage.setItem('stats', JSON.stringify(historyStats))
            setTimerArrayCopy([])
        }
        else if((timerArrayCopy.length > timerArray.length) && timerArrayCopy.length > 0) {
            if(timerArrayCopy.length > 0) {
                removeFromHistoryArray()
            }
        } 
        if((timerArrayCopy.length < timerArray.length) || (timerArray.length === 0)) {
            if((localStorage.stats.length > 2)) {
                console.log("empty")
                console.log(localStorage.stats.length) ///////LENGTH = CATE CARACTERE SUNT [] = 2 !!
                console.log(localStorage.stats)
               historyStats = JSON.parse(localStorage.getItem("stats"));
                //let temp
               // temp = JSON.parse(localStorage.getItem("stats"))
                //setHistoryStats(JSON.parse(localStorage.getItem("stats")))
               // setHistoryStats(temp)
                //console.log(historyStats)
            }
            if(timerArray.length > 0) {

                if(historyStats.length === 0) {
                    historyStats.push({"date": date, "array": [timerArray[0]]})
                    //let temp = historyStats
                   // temp.push({"date": date, "array": [timerArray[0]]})
                    //setHistoryStats(temp)
                }
                else {
                    if(date === historyStats[historyStats.length-1].date) {
                        historyStats[historyStats.length-1].array.push(timerArray[timerArray.length-1])
                        //let temp = historyStats
                        //temp = temp[temp.length-1].array.push(timerArray[timerArray.length-1])
                       // setHistoryStats(temp)
                    }
                    else {
                     historyStats.push({"date": date, "array": [timerArray[timerArray.length-1]]})
                      // let temp = historyStats
                       //temp.push({"date": date, "array": [timerArray[timerArray.length-1]]})
                       //setHistoryStats(temp)
                    }
                }
            }
            setTimerArrayCopy(timerArray)
        }
        localStorage.setItem('stats', JSON.stringify(historyStats))
        //console.log(historyStats)
        
    }, [timerArray])


    useEffect(() => {
        if(clickedHistory === 1) {
            console.log("CHENAG")
            console.log(historyStats)
            //handleHistory()
        }
    }, [historyStats])

    useEffect(() => {
        handleScrambles()
    }, [])

    useEffect(() => {
        if(clickedHistory === 1) {
            handleHistory()
        }
    }, [timerArray])

    function handleClick(val) {
        setClickedHistory(0)
        setPage(
                <>
                    <CaseComponent title={"edge"} cases={Cases[val]} value={val}/>
                    <CaseComponent title={"corner"} cases={Cases[val]} value={val}/>
                    <CaseComponent title={"edgeCorner"} cases={Cases[val]} value={val}/>
                    <CaseComponent title={"cross"} cases={Cases[val]} value={val}/>
                </>
        )
            
    }

    function handleScrambles() {
        setPage(
            <div id="scramblesCases">
            <h1>Scrambles</h1>
                <Scrambles />
            </div>
        )
    }

    const handleTimerUp = (e) => {
        if(e.keyCode === 32) {
            setIsTimerOn(!isTimerOn)
            ref.current.style.backgroundColor = "rgb(174, 114, 2)"
        }
    }

    const handleTimerDown = (e) => {
        if(e.keyCode === 32 && !isTimerOn) {
            ref.current.style.backgroundColor = "green"
        }
    }

    function handleDeleteHistory() {
        historyStats = []
        //setHistoryStats([])
        localStorage.setItem('stats', JSON.stringify(historyStats))
    }



    function handleHistory() {
        setClickedHistory(1)
        
        setPage(
            <>
                <History historyStats={historyStats}/>
                <button id="clearHistory" onClick={handleDeleteHistory}>CLEAR HISTORY</button>
            </>
        )
    }

//<button id="container" onKeyUp={handleTimerUp} onKeyDown={handleTimerDown} autoFocus></button>
    return (
        <>
        
            <header>
                <button id="pll" onClick={() => handleClick(0)}>PLL</button>
                <button id="oll" onClick={() => handleClick(1)}>OLL</button>
                <button id="scrambles" onClick={handleScrambles}>SCRAMBLES</button>
                <button id="history" onClick={handleHistory} historyStats={historyStats}>HISTORY</button>
            </header>
            <main>
                {page}
                <Timer isTimerOn={isTimerOn} setIsTimerOn={setIsTimerOn} timerArray={timerArray} setTimerArray={setTimerArray} ref={ref}/>
               
            </main>
        </>
    )
} 
