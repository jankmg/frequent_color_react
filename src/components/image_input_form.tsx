import React, { useEffect, useRef, useState } from "react"
import { HandleSubmitFunction } from "../../interface"



const ImageInputForm = ({handleSubmit} : {handleSubmit: HandleSubmitFunction})=>{
    const inputImage = useRef<HTMLInputElement>(null)

    return <form onSubmit={(e)=> handleSubmit(e, inputImage.current?.value as string)}>
    <h1>Paste an image's URL to find its most common color!</h1>
    <div>
      <input className='form-url-input' ref={inputImage} placeholder='https://example.com/image.jpg' type='text'/>
      <input className='form-button' type="submit" />
    </div>
  </form>
}

export default ImageInputForm