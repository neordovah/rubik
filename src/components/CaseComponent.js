import React from "react"
import Case from "./Case"

export default function CaseComponent(props) {

    let casesRendered = []
    let goodCases = []

    function importAll(r) {
        let images = {};
         r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item)})
        return images
    }
    let images = []
    images[0] = importAll(require.context('./img/pll', false, /\.(png|jpe?g|svg)$/))
    images[1] = importAll(require.context('./img/oll', false, /\.(png|jpe?g|svg)$/))
    

    for(let i = 0; i < props.cases.length; i++) {

        if(props.title === props.cases[i].perm) {
            goodCases.push(props.cases[i])
        }
    }
    
    let value = props.value
    casesRendered = goodCases.map(caseElement => {
        let image = `${caseElement.id}.png`
            return ( 
                <Case
                    key={caseElement.id}
                    perm={caseElement.perm}
                    name={caseElement.name}
                    case={caseElement.case}
                    img={images[value][image]}
                />
            )
    })


    let componentTitle
    if(props.title === "edge") {
        componentTitle = "Edge cases"
    } else if(props.title === "corner") {
        componentTitle = "Corner cases"
    } else if(props.title === "edgeCorner") {
        componentTitle = "Edge and corner cases"
    } else {
        componentTitle = "Cross oriented correctly cases"
    }

    return (
        <>
            {(casesRendered.length > 0) && <h1 className="componentTitle">{componentTitle}</h1>}
            {casesRendered && casesRendered}
        </>
    )
}