import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';





function Loading ( ) {
    return (
        <div>  
         <LinearProgress color="secondary" />
         <LinearProgress color="secondary"/>
         <LinearProgress color="secondary"/>
         
        </div>
    )
}

export default Loading;