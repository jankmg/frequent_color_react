import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import {useSelector, useDispatch} from "react-redux"
import { getFrequentColorRequest } from './app/features/get_frequent_color/get_frequent_color';
import { AppDispatch, RootState } from './app/store';
import ImageInputForm from './components/image_input_form';
import ImageContainer from './components/image';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>()
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false)
  const [color, setColor] = useState<string>()

  const frequentColorData = useSelector((state: RootState)=>{
    return state.getFrequentColor.value
  })

  useEffect(()=>{
    if(image){
      dispatch(getFrequentColorRequest(image))
    }
  },[image])

  useEffect(()=>{
    console.log(frequentColorData)
    if(frequentColorData){
      setColor(`rgb(${frequentColorData.data.rgb[0]}, ${frequentColorData.data.rgb[1]}, ${frequentColorData.data.rgb[2]})`)
    }
  }, [frequentColorData])

  // useEffect(()=>{
  //   console.log(color)
  // }, [color])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, imageURL: string): void =>{
    e.preventDefault()
    if(!imageURL) return
    setImage(imageURL)
    setIsShowingColor(true)
  }

  return (
    <div className='App' style={{background: color ? color : "#111122"}}>
    {image && <ImageContainer image={image} />}
    <section className="inputContainer">
      {!isShowingColor ? <ImageInputForm handleSubmit={handleSubmit}/> : <section className='colorResponseContainer'>
        <h1>The most common color in this image is:</h1>
        <span>{color}</span>
        <button onClick={()=> setIsShowingColor(false)}>Try another image</button>
      </section>
      }
    </section>
    </div>
  );
}

export default App;
