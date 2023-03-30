import { useState, useRef } from "react"
import "../../assets/DragBar.css"

const DragBar= ({action = null})=>{
    const [startPosition, setStartPosition]= useState(false)
    const [position, setPosition]= useState(0)
    const [finalPosition, setFinalPosition]= useState(false)
    const imagen = useRef()
    const pos = useRef()

    const dragStart= (event)=>{
        event.dataTransfer.setDragImage(imagen.current, 0, 0);
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.dropEffect = "move"
        const start= event.clientX
        setStartPosition(start)
        console.log("start", startPosition)
    }

    const onMove= (event)=>{
        
    }

    const dragEnd = async (event)=>{
        const final = event.clientX
        setFinalPosition(final)
        const newPos= (final - startPosition)
        setPosition((oldpos) =>
            (oldpos + newPos))
        console.log("end", finalPosition, newPos)
    }
        return(


        <div className="Dragbar-div--horizontal">
                <div className="Dragbar-div--circle" style={{"left" : position}}
                draggable
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                >

                </div>
            <img ref={imagen}/>
        </div>
    )

}

export default DragBar