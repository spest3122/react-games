import React from "react";

function Col(props){
    let r = props.rowIndex;
    let c = props.colIndex;
    return (
        <div className={"col "+props.class} onClick={()=> props.onClick([r, c])}></div>
    )
}


export default Col;