import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import React, { useEffect, useState } from "react"
import { ColorResponse, Reset } from "../../../interface"

const ErrorMessage = ({reset}:{reset: Reset})=>{
    const frequentColorData = useSelector((state: RootState)=>{
        return state.getFrequentColor.value
      })

      const [error, setError] = useState<ColorResponse>()

    useEffect(()=>{
        setError(frequentColorData as ColorResponse)
      }, [frequentColorData])

    return <section className='colorResponseContainer'>
    <h1>{`Error ${error?.status}`}</h1>
    <p>{error?.data.message}</p>
    
    <button onClick={()=> reset()}>Try another image</button>
  </section>
}

export default ErrorMessage