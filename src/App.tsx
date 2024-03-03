import React, { useRef, useState } from 'react';
import './styles/App.scss';
import ImageContainer from './components/image';
import ImageInputForm from './components/image_input_form';

function App() {
  const [image, setImage] = useState<string>()
  const [isShowingColor, setIsShowingColor] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, imageURL: string): void =>{
    e.preventDefault()
    if(!imageURL) return
    console.log(imageURL)
    setImage(imageURL)
    setIsShowingColor(true)
  }

  return (
    <div className='App'>
    {image && <ImageContainer image={image} />}
    <section className="inputContainer">
      {!isShowingColor ? <ImageInputForm handleSubmit={handleSubmit}/> : <section className='colorResponseContainer'>
        <h1>The most common color in this image is:</h1>
        <span>#ffffff</span>
        <button onClick={()=> setIsShowingColor(false)}>Try another image</button>
      </section>
      }
    </section>
    </div>
  );
}

export default App;
