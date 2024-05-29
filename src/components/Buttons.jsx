import React from "react";

const Buttons = ({ onClick, label }) => {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
};

export default Buttons;
