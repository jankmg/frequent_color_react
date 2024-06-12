import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import {useSelector, useDispatch} from "react-redux"
import { getFrequentColorRequest } from './app/features/get_frequent_color/get_frequent_color';
import { AppDispatch, RootState } from './app/store';
import ImageContainer from './components/image';
import Loading from './components/loading/Loading';
import AppContent from './components/app_content';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>()
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
    if(image){
      dispatch(getFrequentColorRequest(image))
    }
  },[image])

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

  }, [frequentColorData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, imageURL: string): void =>{
    e.preventDefault()
    if(!imageURL) return
    setImage(imageURL)
    setIsShowingColor(true)
  }

  const reset = ()=>{
    setIsShowingColor(false)
    setIsError(false)
    setImage("")
    setHslColor("#111122")
  }

  return (
    <div className='App' style={{background: hslColor}}>
      {!isLoading ? <>{(image && !isError) && <ImageContainer image={image} />}</> : null}
    <section className="inputContainer">
      {isLoading ? <Loading/> : 
      <AppContent handleSubmit={handleSubmit} colors={{hslColor, rgbColor, hexColor}} reset={reset} isError={isError} isShowingColor={isShowingColor} />
    }
    </section>
    </div>
  );
}

export default App;
