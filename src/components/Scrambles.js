import React, { useState } from "react";

export default function Scrambles() {

    //const [scrambles, setScrambles] = useState([1, 2, 3])
    //const [scramblesRendered, setScramblesRendered] = useState([])
    let scrambles = [1, 2, 3]
    let scramblesRendered = []
    scramblesRendered = scrambles.map(scramble => {
        return (
            <div className="scrambleCase">
                <h1>{scramble}</h1>
            </div>
        )
    })

    console.log(scramblesRendered)

    return(
        <>
            {scramblesRendered}  
        </>
    )
}