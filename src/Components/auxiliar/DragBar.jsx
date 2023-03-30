import { useState, useEffect} from "react"
import "../../assets/DragBar.css"

const DragBar= ({action, isDisabled})=>{
    const  [value, setValue]= useState(0)
    const [isActivate, setIsActivate]= useState(false)

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const activateFunction= (event)=>{
        if (event.target.value < 850){
            setValue(0)
           return setIsActivate("false")
        }
        setValue(1000)
        setIsActivate(true)
        action()
    }


        return(

        <>
            <div>
                <div className={`Dragbar-div--background ${isDisabled && "disabled"}`}>
                        <p className={`Dragbar-p ${isDisabled && " disabled"}`}>Desliza para iniciar </p>
                    <input className="Dragbar-div--horizontal" type="range" min="0" max="1000" step="1"
                    value={value}
                    onTouchEnd={activateFunction}
                    onMouseUp={activateFunction}
                    onChange={handleChange}
                    disabled={isDisabled && true }
                    />
                </div>
            </div>
                    {/* <p>Valor seleccionado{value}  {isActivate}</p> */}
        </>
    )

}

export default DragBar