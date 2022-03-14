import React from "react";

function Win() {
  return (
    <div className="win">
        <h1 className="score-span">Winner ! &#11088;</h1>
        <button onClick={() => document.location.reload(true)}>Again</button>
    </div>
  );
}

export default Win;