import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import {useSelector, useDispatch} from "react-redux"
import { getFrequentColorRequest } from './app/features/get_frequent_color/get_frequent_color';
import { AppDispatch, RootState } from './app/store';
import ImageInputForm from './components/image_input_form';
import ImageContainer from './components/image';
import Loading from './components/loading/Loading';
import SuccessMessage from './components/success/success_message';
import ErrorMessage from './components/error/error_message';
import { ColorResponse } from '../interface';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>()
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false)
  const [color, setColor] = useState<string>()
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

    if(frequentColorData.status !== 200  || !frequentColorData.data.rgb){
      setIsError(true)
      return
    }
    
    setColor(`rgb(${frequentColorData.data?.rgb[0]}, ${frequentColorData.data?.rgb[1]}, ${frequentColorData.data?.rgb[2]})`)

  }, [frequentColorData])

  // console.log(color)


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
    setColor("#111122")
  }

  return (
    <div className='App' style={{background: color ? color : "#111122"}}>
      {!isLoading ? <>{(image && !isError) && <ImageContainer image={image} />}</> : null}
    <section className="inputContainer">
      {isLoading ? <Loading/> : 
      <>{isError ? <ErrorMessage reset={reset}/> : <>{!isShowingColor ? <ImageInputForm handleSubmit={handleSubmit}/> : <SuccessMessage color={color} reset={reset} />
      }</>}</>
    }
    </section>
    </div>
  );
}

export default App;
