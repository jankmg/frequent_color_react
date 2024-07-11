import React, { useEffect, useRef, useState } from "react"
import { HandleSubmitFunction, imageData } from "../../interface"



const ImageInputForm = ({handleSubmit} : {handleSubmit: HandleSubmitFunction})=>{
    const inputImage = useRef<HTMLInputElement>(null)
    const inputFileImage = useRef<HTMLInputElement>(null)

    const [isFileSelected, setIsFileSelected] = useState<boolean>(false)
    const [isUrl, setIsUrl] = useState<boolean>(false)
    const [imageData, setImageData] = useState<imageData>({isFile: false, imageUrl: "", imageFile: undefined})
    const [fileImage, setFileImage] = useState<FileList | undefined | null>(undefined)
    const [imageUrl, setImageUrl] = useState<string | undefined>("")


    //check if an image has been uploaded/selected
    useEffect(()=>{
      if(inputFileImage.current){
        if (fileImage){
          setIsFileSelected(true)
          return
        }
  
        //if an image has not been selected or has been unselected, set the input value to default
        setIsFileSelected(false)
        inputFileImage.current.value = inputFileImage.current.defaultValue
      }
    }, [fileImage])

    //check if the user has introduced an url
    useEffect(()=>{
      if(imageUrl){
        setIsUrl(true)
        return
      }

      setIsUrl(false)
    }, [imageUrl])
    
    
    //handle everything related to the past elements
    const handlePaste = (e: ClipboardEvent)=>{
      if(e.clipboardData && inputFileImage.current){
        //check if the user is pasting an image or text
        if(e.clipboardData.files.length){
          //it they are pasting an image, grab it from the clipboard
          inputFileImage.current.files = e.clipboardData.files
          setFileImage(inputFileImage.current.files)
          setIsFileSelected(true)
        }
      }
    }

    //add the event listener
    useEffect(()=>{
      window.addEventListener('paste', (e)=> handlePaste(e as ClipboardEvent))

      return()=>{
        window.removeEventListener('paste', (e)=> handlePaste(e as ClipboardEvent))
      }
    }, [])

    useEffect(()=>{
      //if the user has typed an url, send the data as url
      if(isUrl && imageUrl){
        setImageData({isFile: false, imageUrl: imageUrl, imageFile: undefined})
        return
      }

      //if it's not an url, send it as a file
      setImageData({isFile: true, imageUrl: undefined, imageFile: fileImage})
    }, [isUrl, imageUrl, fileImage])

    //reset everything to default if the user cancels the action
    const handleCancel = ()=>{
      setIsFileSelected(false)
      setIsUrl(false)
      setFileImage(undefined)
      setImageUrl("")
    }

    return <form onSubmit={(e)=> handleSubmit(e, imageData)}>
    <h1>Paste an image's URL to find its most common color!</h1>
    <div>
      
      {
      //if a file is selected, show the cancel button, if not, show the text/url input
      isFileSelected ? <button onClick={handleCancel}>Cancel</button> : <input onChange={()=> setImageUrl(inputImage.current?.value)} className='form-url-input' ref={inputImage} placeholder='https://example.com/image.jpg' type='text'/>}
      <div className="form-url-buttons">
        {
          //if the user has not typed an url, show the file input. Else hide it.
        !isUrl && <input className="form-file-input" onChange={()=> setFileImage(inputFileImage.current?.files)} ref={inputFileImage} type="file" accept="image/*"></input>}
        <input className='form-button' type="submit" />
      </div>
    </div>
  </form>
}

export default ImageInputForm