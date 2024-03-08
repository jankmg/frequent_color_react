import { Reset } from "../../../interface"

const SuccessMessage = ({color, reset}: {color: string | undefined, reset: Reset})=>{
    return <section className='colorResponseContainer'>
    <h1>The most common color in this image is:</h1>
    <span>{color}</span>
    <button onClick={()=> reset()}>Try another image</button>
  </section>
}

export default SuccessMessage