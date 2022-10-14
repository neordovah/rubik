import React from "react"

export default function Case(props) {
    return (
        <div className="case">
            <h1 className="caseTitle">{props.name}</h1>
            <h2 className="caseCase">{props.case}</h2>
            <img className="caseImg" src={props.img} />
        </div>
    )
}