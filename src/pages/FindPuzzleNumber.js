import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

import UseInput from "../components/UserInput";

function FindPuzzleNumber() {
 
  const arr = ["X", 5, 9, 15, 23, "Y", "Z"];
  const [inputVal, setInputVal] = useState(arr);
  const [result, serResult] = useState([]);
  
  const findXYZ = () => {
    
    for (let i = 0; i < inputVal.length; i++) {
      if (typeof inputVal[i] === "string") {
        const nextIndex = i + 1;
        const prevIndex = i - 1;

        if (i === 0) {
          inputVal[i] = inputVal[nextIndex] - nextIndex * 2;
        } else {
          inputVal[i] = inputVal[prevIndex] + i * 2;
        }
    
      }
      
      serResult(inputVal);
    }
  };


  return (
    
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      
      <UseInput  value={inputVal} disabled={true}/>   
       
      <Button sx={{m:2,color:'#000',background:'#a8c9d9'}} onClick={findXYZ}>Find Number</Button>
     
    </Box>
  );
}

export default FindPuzzleNumber;
