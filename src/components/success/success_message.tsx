import { Reset, ColorsType } from "../../../interface"

const SuccessMessage = ({colors, reset}: {colors: ColorsType | undefined, reset: Reset})=>{
    return <section  className='colorResponseContainer'>
    <h1>The most common color in this image is:</h1>
    <span>{colors?.hslColor}</span>
    <span>{colors?.rgbColor}</span>
    <span>hex: {colors?.hexColor}</span>
    <button onClick={()=> reset()}>Try another image</button>
  </section>
}

export default SuccessMessage