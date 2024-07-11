import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { imageData } from '../interface';
import {useSelector, useDispatch} from "react-redux"
import { getFrequentColorRequest } from './app/features/get_frequent_color/get_frequent_color';
import { getFrequentColorFileRequest } from './app/features/get_frequent_color/get_frequent_color_file';
import { AppDispatch, RootState } from './app/store';
import ImageContainer from './components/image';
import Loading from './components/loading/Loading';
import AppContent from './components/app_content';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageFile, setImageFile] = useState<FileList | null>()
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false)
  const [hslColor, setHslColor] = useState<string>("#111122")
  const [rgbColor, setRgbColor] = useState<string>("#111122")
  const [hexColor, setHexColor] = useState<string>("#111122")
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>(false)

  const frequentColorData = useSelector((state: RootState)=>{
    return state.getFrequentColor.value
  })

  const frequentColorStatus = useSelector((state: RootState)=>{
    return state.getFrequentColor.status
  })

  //handles loading
  useEffect(()=>{
    if(frequentColorStatus === "loading"){
      setIsLoading(true)
      return
    }

    setIsLoading(false)
  }, [frequentColorStatus])

  //handles dispatching
  useEffect(()=>{
    if(imageUrl && !imageFile){
      dispatch(getFrequentColorRequest(imageUrl))
    }
  },[imageUrl, imageFile])

  useEffect(()=>{
    if(imageFile){
      dispatch(getFrequentColorFileRequest(imageFile))
    }
  }, [imageFile])

  //handles response
  useEffect(()=>{
    if(!frequentColorData){
      // setIsError(true)
      return
    }

    if(frequentColorData.status !== 200  || !frequentColorData.data.hsl || !frequentColorData.data.rgb || !frequentColorData.data.hex){
      setIsError(true)
      return
    }
    
    setHslColor(`hsl(${frequentColorData.data?.hsl[0]}, ${frequentColorData.data?.hsl[1]}%, ${frequentColorData.data?.hsl[2]}%)`)
    setRgbColor(`rgb(${frequentColorData.data?.rgb[0]}, ${frequentColorData.data?.rgb[1]}, ${frequentColorData.data?.rgb[2]})`)
    setHexColor(frequentColorData.data.hex)

    if(imageFile){
      setImageUrl(URL.createObjectURL(imageFile[0]))
    }

  }, [frequentColorData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, imageData: imageData): void =>{
    e.preventDefault()

    if(imageData.isFile){
      setImageFile(imageData.imageFile)
      setIsShowingColor(true)
      return
    }

    
    setImageUrl(imageData.imageUrl)
    setIsShowingColor(true)
  }

  const reset = ()=>{
    setIsShowingColor(false)
    setIsError(false)
    setImageUrl("")
    setHslColor("#111122")
  }

  return (
    <div className='App' style={{background: hslColor}}>
      {!isLoading ? <>{(imageUrl && !isError) && <ImageContainer image={imageUrl} />}</> : null}
    <section className="inputContainer">
      {isLoading ? <Loading/> : 
      <AppContent handleSubmit={handleSubmit} colors={{hslColor, rgbColor, hexColor}} reset={reset} isError={isError} isShowingColor={isShowingColor} />
    }
    </section>
    </div>
  );
}

export default App;
