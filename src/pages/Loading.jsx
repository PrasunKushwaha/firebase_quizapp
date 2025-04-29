import React from "react";
import { GiDuration } from "react-icons/gi";

const Loading = () =>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <GiDuration className="text-white text-9xl animate-spin" />
        </div>
      );
      
}

export default Loading;