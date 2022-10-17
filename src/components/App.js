import React, { useState } from "react"
import pllCases from "./pllCases"
import ollCases from "./ollCases"
import CaseComponent from "./CaseComponent"
import Timer from "./Timer"

export default function Main() {

    const Cases = [pllCases, ollCases]
    let [page, setPage] = useState()

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
        /*setPage(
            <Scramble />
        )*/
    }

    return (
        <>
            <header>
                <button id="pll" onClick={() => handleClick(0)}>PLL</button>
                <button id="oll" onClick={() => handleClick(1)}>OLL</button>
                <button id="scrambles" onClick={handleScrambles()}>SCRAMBLES</button>
            </header>
            <main>
                {page}
                {Timer()}
            </main>
        </>
    )
}