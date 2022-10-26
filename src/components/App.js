import React, { useRef, useState } from "react"
import pllCases from "./pllCases"
import ollCases from "./ollCases"
import CaseComponent from "./CaseComponent"
import Timer from "./Timer"
import Scrambles from "./Scrambles"


export default function Main() {

    const Cases = [pllCases, ollCases]
    let [page, setPage] = useState()
    const ref = useRef(null)

    const [isTimerOn, setIsTimerOn] = useState(false)

    function handleClick(val) {

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
            <>
                <Scrambles />
            </>
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
                <Timer isTimerOn={isTimerOn} setIsTimerOn={setIsTimerOn} ref={ref}/>
               
            </main>
        </>
    )
} 
