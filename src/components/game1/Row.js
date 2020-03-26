import React from "react";
import Col from "./Col"

function Row(props){
    let col = props.item.map((item, i)=> ( 
        <Col 
            class={item === 1 ? 'col_b' : ''}
            key={'C'+i} 
            rowIndex={props.index} 
            colIndex={i}
            onClick={props.onClick}
        ></Col> 
    ));
    return (
        <div className="row">
            {col}
        </div>
    )
}

export default Row;