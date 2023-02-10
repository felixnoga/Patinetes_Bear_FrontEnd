import { useState, useRef, useEffect} from "react";

const useCountdown= (time)=>{
    const [countdown, setCountdown]= useState(time)
    const [outOfTime, setOutOfTime]= useState(false)

    const interval= useRef()

    const init= ()=>{
        interval.current = setInterval(()=>{setCountdown(prev=>(prev - 1))}, 1000) 
    }
    // const pause= ()=>{
    //     clearInterval(interval.current)
    // }
    const cancel= ()=>{
        clearInterval(interval.current)
        setCountdown(time)
        setOutOfTime(false)
    }
    // si llega a 0 cambia el estado de out of time y paraliza el contador. 
    useEffect(()=>{
    if(countdown===0){
        setOutOfTime(true);
        clearInterval(interval.current)
        setCountdown(0)
    }},[countdown])

    const minutes = Math.floor(countdown / 60)
    
    const countToSeconds = (countdown - (minutes*60))

    const seconds= countToSeconds !== 0 ? countToSeconds> 9 ? countToSeconds : "0"+countToSeconds : "00" 

    const timeLeft= <p>{minutes}:{seconds}</p>

    return({
      timeLeft,
      init,
      cancel,
      outOfTime  
    })

}
export default useCountdown