import React from "react"
import ReactDOM from "react-dom"
import Case from "./Case"
import pllCases from "./pllCases"
import ollCases from "./ollCases"


export default function Main() {

    const pllButton = document.getElementById("pll")
    const ollButton = document.getElementById("oll")

    const pllCasesRendered = pllCases.map(pllCase => {
        return (
            <Case
                name={pllCase.name}
                case={pllCase.case}
                img={pllCase.img}
            />
        )
    })
    const ollCasesRendered = ollCases.map(ollCase => {
        return (
            <Case
                name={ollCase.name}
                case={ollCase.case}
                img={ollCase.img}
            />
        )
    })

    function handleClickPLL() {
        ReactDOM.render(pllCasesRendered, document.querySelector("main"))
    }
    function handleClickOLL() {
        ReactDOM.render(ollCasesRendered, document.querySelector("main"))
    }

    pllButton.onclick = handleClickPLL;
    ollButton.onclick = handleClickOLL;

    return (
        <main>
        </main>
    )
}