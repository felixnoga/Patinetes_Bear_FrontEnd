import { useState, useRef } from "react"
import "../../assets/DragBar.css"

const DragBar= ({action = null})=>{
        const [startPosition, setStartPosition]= useState(false)
        const [isMoving, setIsMoving]= useState(false)
        const [finalPosition, setFinalPosition]= useState(0)
        const [styleElement, setStyleElement]= useState(false)

        const imagen= useRef()

    const startMovement =(event) =>{
        event.preventDefault()
        // event.dataTransfer.setDragImage(imagen.current, 0, 0);
        // event.dataTransfer.effectAllowed = "move";
        const startX= event.clientX
        console.log("start", event.clientX, startPosition, finalPosition)
        setStartPosition(startX)
        setIsMoving(true)
        document.addEventListener("mousemove", movement)
        document.addEventListener("mouseup", finishMove)
    }
    const movement= (event)=> {
        event.preventDefault()
        event.stopPropagation();
        let finalX = event.clientX
        if(finalX === 0){
             return}
        let Xrange= finalX - startPosition ;
        if(Xrange === 0) {return}       
        if((finalPosition - Xrange) < 0) {Xrange = 0}
        setFinalPosition(finalPosition + Xrange)
        console.log("onDrag", event.clientX, startPosition, finalPosition, Xrange, )
    }
    const finishMove= (event)=>{
        event.preventDefault()
        event.stopPropagation()
        const finalX = event.clientX
        // if(finalX ===  0){ return }
        // let Xrange = finalPosition + finalX - startPosition;
        // if (Xrange < 0) Xrange = 0
        // setFinalPosition(Xrange)
        document.removeEventListener("mousemove", movement)
        document.removeEventListener("mouseup", finishMove)
        console.log("finish",event.clientX, startPosition, finalPosition)
    }
    const dragEnter= (event)=>{
        event.dataTransfer.dropEffect = "copy";

    }
    const dragOver= (event)=>{
        // event.dataTransfer.setDragImage(imagen.current, 0, 0);
        event.preventDefault()
    }
    const changeStyle= (event)=>{
        setStyleElement(!styleElement)
        event.preventDefault()
        // action()
    }

    


    return(
        <div className="Dragbar-div--main">
            <div className={`Dragbar-div--horizontal ${styleElement ? "isDrag" : null}`}>
                <div className="Dragbar-div--circle" style={{left: finalPosition}} 
                // onDragStart={startMovement}
                // onDragCapture={movement}
                // onDragEnd={finishMove}
                // onDragOver={dragOver}
                onMouseDown={startMovement}
                >
                </div>
                <div className="Dragbar-div--reception" 
                // onDragEnter={changeStyle}
                // onDragLeave={changeStyle}
                // onDragEnter={dragEnter}
                // onDrop={changeStyle}
                // onDragOverCapture={dragOver}
                >

                </div>
            </div>
            <img ref={imagen}/>
        </div>
    )

}

export default DragBar