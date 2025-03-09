import React from "react";

function SquareComponent(props) {
  const classes = props.className ? `${props.className} square` : "square";
  return (
    // <div className="app-header">
    //   <p className="heading-text">Tic Tac Toe</p>
    //   <div className="row jc-center">x</div>
    //   <div className="row jc-center">x</div>
    //   <div className="row jc-center">x</div>
    // </div>
    // <span style={{ border: "1px solid white", padding: "30px" }}>X</span>
    <>
      {/* <span className="square">X</span> */}
      {/* <span className={classes}>X</span> */}
      <span className={classes} onClick={props.onClick}>
        {props.state}
      </span>
    </>
  );
}

export default SquareComponent;
