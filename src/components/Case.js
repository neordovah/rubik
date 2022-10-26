import React from "react"

export default function Case(props) {
    return (
        <div className="case">
            <h1 className="caseTitle">{props.name}</h1>
            <h2 className="caseCase">{props.case}</h2>
            <div className="caseImage"><img className="caseImg" src={props.img} height="70px" /></div>
        </div>
    )
}