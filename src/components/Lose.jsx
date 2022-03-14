import React from "react";
import "../style/style.css"

function Win() {
  return (
    <div className="lose">
        <h1 className="score score-span">Loser &#128517;</h1>
        <button className="play-again" onClick= {() => document.location.reload(true)}>Try again</button>
    </div>
  );
}

export default Win;