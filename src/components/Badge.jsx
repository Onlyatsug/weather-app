import React from "react";
import "./Badge.css";

const Badge = (props) => {
    const temp = props.children;
    
    if (temp > 28) {
        var status = "hot";
        return (
          <div className="badge hot">{status}</div>  
        )
      } else if (temp < 16) {
        var status = "cold";
        return (
          <div className="badge cold">{status}</div>  
        )
    } else {
        return (
          <div className="badge normal">normal</div>  
        )
    }
}

export default Badge;