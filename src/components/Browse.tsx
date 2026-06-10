import React from "react";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useTMDBData } from "../utils/hooks/useTMDBData";

function Browse() {
  useTMDBData();

  return (
    <div className="bg-black min-h-screen">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
}

export default Browse;
