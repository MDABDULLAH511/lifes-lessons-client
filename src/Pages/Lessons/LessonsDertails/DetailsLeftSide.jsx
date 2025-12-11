import React from "react";
import { useParams } from "react-router";

const DetailsLeftSide = () => {
  const { id } = useParams();
  console.log("Params from left", id);
  return <div></div>;
};

export default DetailsLeftSide;
