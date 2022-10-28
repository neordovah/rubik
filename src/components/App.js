import React, { useEffect, useRef, useState } from "react"
import pllCases from "./pllCases"
import ollCases from "./ollCases"
import CaseComponent from "./CaseComponent"
import Timer from "./Timer"
import Scrambles from "./Scrambles"
//import History from "./History"
import setTheDate from "./setTheDate"

//let historyStats = []

export default function Main() {
    const [historyStats, setHistoryStats] = useState([])
    const Cases = [pllCases, ollCases]
    let [page, setPage] = useState()
    const ref = useRef(null)
    const [isTimerOn, setIsTimerOn] = useState(false)
    const [timerArray, setTimerArray] = useState([])
    const [clickedHistory, setClickedHistory] = useState(0)
    const [timerArrayCopy, setTimerArrayCopy] = useState([])
    //localStorage.clear()

    /*function removeFromHistoryArray() {
        let date = timerArrayCopy[timerArrayCopy.length-1].date
        for(let i = 0; i < historyStats.length; i++) {
            if(historyStats[i].date == date) {
                let temp = historyStats[i].array
                temp = temp.pop()
                setHistoryStats({"date": date, "array": temp})
                if((historyStats[i].array.length === 0) && (historyStats.length > 0)) {  ////inlocuit aici si mai jos cu 0 ???
                    let temp = historyStats
                    temp = temp.splice(i, 1)
                    setHistoryStats(temp)
                } else if((historyStats[i].array.length === 0) && (historyStats.length === 0)) {
                    setHistoryStats([])
                }
            }
        }
        let temp = timerArrayCopy
        temp.pop()
        setTimerArrayCopy(temp)
    }

    const [date, setDate] = useState(new Date().toLocaleDateString())*/

   /* useEffect(() => {
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
            localStorage.setItem('stats', JSON.stringify(historyStats))
        } 
        if((timerArrayCopy.length < timerArray.length) || (timerArray.length === 0)) {
            console.log(localStorage.stats.length)
            if(((localStorage.stats != "undefined") && localStorage.stats.length > 2)) {
                let temp
                temp = JSON.parse(localStorage.getItem("stats"))
                console.log(temp)
                setHistoryStats(temp)
                //localStorage.setItem('stats', JSON.stringify(historyStats))
                console.log(historyStats)
            }
            if((timerArray.length > 0) ) {
                if(historyStats.length === 0) {
                    let temp = historyStats
                    temp.push({"date": date, "array": [timerArray[0]]})
                    setHistoryStats([...temp])
                }
                else {
                    if((historyStats.length > 0) && (date === historyStats[historyStats.length-1].date)) {
                        let temp = historyStats
                        temp[temp.length-1].array.push(timerArray[timerArray.length-1])
                        console.log(temp)
                        setHistoryStats([...temp])
                    } 
                    else {
                       let temp = historyStats
                       temp.push({"date": date, "array": [timerArray[timerArray.length-1]]})
                       setHistoryStats([...temp])
                    } 
                }
                localStorage.setItem('stats', JSON.stringify(historyStats))
            }
            setTimerArrayCopy(timerArray)
        }
        //localStorage.setItem('stats', JSON.stringify(historyStats))
        
    }, [timerArray])*/

    useEffect(() => {
        handleScrambles()
    }, [])

    /*useEffect(() => {
        if(clickedHistory === 1) {
            handleHistory()
        }
    }, [historyStats])*/



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

    /*function handleDeleteHistory() {
        setHistoryStats([])
        console.log("DELETED")
        console.log("sters")
        localStorage.setItem('stats', JSON.stringify([]))
        console.log(localStorage.stats)
    }*/



    /*function handleHistory() {
        setClickedHistory(1)
        
        setPage(
            <>
                <History historyStats={historyStats} setHistoryStats={setHistoryStats}/>
                <button id="clearHistory" onClick={handleDeleteHistory}>CLEAR HISTORY</button>
            </>
        )
    }*/

    return (
        <>
            <button id="container" onKeyUp={handleTimerUp} onKeyDown={handleTimerDown} autoFocus></button>
            <header>
                <button id="pll" onClick={() => handleClick(0)}>PLL</button>
                <button id="oll" onClick={() => handleClick(1)}>OLL</button>
                <button id="scrambles" onClick={handleScrambles}>SCRAMBLES</button>
                
            </header>
            <main>
                {page}
                <Timer isTimerOn={isTimerOn} setIsTimerOn={setIsTimerOn} timerArray={timerArray} setTimerArray={setTimerArray} ref={ref}/>
               
            </main>
        </>
    )
} 
//<button id="history" onClick={handleHistory} historyStats={historyStats} setHistoryStats={setHistoryStats}>HISTORY</button>