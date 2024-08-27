import React from "react";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useTMDBData } from "../utils/hooks/useTMDBData";

function Browse() {
  useTMDBData();

  return (
    <div>
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
}

export default Browse;
