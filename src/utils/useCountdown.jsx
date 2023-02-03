import { useState, useRef} from "react";

const useCountdown= ()=>{
    const [countdown, setCountdown]= useState(600)

    const interval= useRef()

    const init= ()=>{
        interval.current = setInterval(()=>{setCountdown(prev=>(prev - 1)); console.log(countdown)}, 1000) 
    }
    const cancel= ()=>{
        clearInterval(interval.current)
        setCountdown(600)
    }
    const limit = setCountdown === 0 ? true : false
    if(setCountdown===0){
        cancel();
    }

    const minutes = Math.floor(countdown / 60)
    
    const countToSeconds = (countdown - (minutes*60))

    const seconds= countToSeconds !== 0 ? countToSeconds> 9 ? countToSeconds : "0"+countToSeconds : "00" 

    const timeLeft= <p>{minutes}:{seconds}</p>

    return({
      timeLeft,
      init,
      cancel,
      limit  
    })

}
export default useCountdown