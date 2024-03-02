import React, { useRef, useState } from 'react';
import './styles/App.scss';
import ImageContainer from './components/image';

function App() {
  const [image, setImage] = useState<string>()
  const inputImage = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setImage(inputImage.current?.value)
  }

  return (
    <div className='App'>
    {image && <ImageContainer image={image} />}
    <section className="inputContainer">
      <form onSubmit={(e)=> handleSubmit(e)}>
        <h1>Paste an image's URL to find its most common color!</h1>
        <div>
          <input className='form-url-input' ref={inputImage} placeholder='https://example.com/image.jpg' type='text'/>
          <input className='form-button' type="submit" />
        </div>
      </form>
    </section>
    </div>
  );
}

export default App;
