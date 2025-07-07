import React from "react";
import "./Country.css";

const Country = (props) => {
    if (props.children === undefined || props.children === null || props.children === "") {
        return (
          <div className="country">?</div>
        )
    } else {
        return (
            <div className="country">{props.children}</div>  
        )
    }
}

export default Country;