import React from "react";

const Navbar = ({ name, type }) => {
  return (
    <div>
      <h4>{name}</h4>
      <h6>{type}</h6>
    </div>
  );
};

export default Navbar;
