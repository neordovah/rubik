import React from "react"

export default function Case(props) {
    return (
        <div className="case">
            <h1>{props.name}</h1>
            <h2>{props.case}</h2>
            <img src={props.img} />
        </div>
    )
}