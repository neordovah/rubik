import React, { useEffect, useRef, useState } from "react"
import pllCases from "./pllCases"
import ollCases from "./ollCases"
import CaseComponent from "./CaseComponent"
import Timer from "./Timer"
import Scrambles from "./Scrambles"
import History from "./History"

let historyStats = []
export default function Main() {

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
        console.log(historyStats.length)
        for(let i = 0; i < historyStats.length; i++) {
            console.log(historyStats[i].date)
            if(historyStats[i].date == date) {
                historyStats[i].array.pop()
                if((historyStats[i].array.length === 0) && (historyStats.length > 1)) {
                    historyStats.splice(i, 1)
                } else if((historyStats[i].array.length === 0) && (historyStats.length === 1)) {
                    historyStats = []
                }
            }
        }
        let temp = timerArrayCopy
        temp.pop()
        setTimerArrayCopy(temp)
    }

    useEffect(() => {

        if ((timerArrayCopy.length > timerArray.length) && timerArray.length === 0) {
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
            if(localStorage.stats && localStorage.stats.length > 0) {
                historyStats = JSON.parse(localStorage.getItem("stats"));
            }
            if(timerArray.length > 0) {

                if(historyStats.length === 0) {
                    historyStats.push({"date": new Date().toLocaleDateString(), "array": [timerArray[0]]})
                }
                else {
                    if(new Date().toLocaleDateString() === historyStats[historyStats.length-1].date) {
                        historyStats[historyStats.length-1].array.push(timerArray[timerArray.length-1])
                    }
                    else {
                        historyStats.push({"date": new Date().toLocaleDateString(), "array": [timerArray[timerArray.length-1]]})
                    }
                }
            }
            setTimerArrayCopy(timerArray)
        }
        localStorage.setItem('stats', JSON.stringify(historyStats))
        console.log(historyStats)
        
    }, [timerArray])
    

    useEffect(() => {
        handleScrambles()
    }, [])

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
