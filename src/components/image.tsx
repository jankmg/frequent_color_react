import React from "react"

const ImageContainer = ({image}: {image: string})=>{
    return <section className="imageContainer"><img className="image" src={image} alt="submited by user"/></section>
}

export default ImageContainer