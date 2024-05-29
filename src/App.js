import logo from "./logo.svg";
import "./App.css";
import Carousel from "./components/carousel";
import { useEffect, useState } from "react";

/* Build highly scalablee carousel component in react js
 
  Requiremetns: 
    - create a carousel componetn which takes an array of images as input
    - Component should efficiently hadnlee a large number of images while maintaining
    scalability, performance optimizations, and extensibility
    - Provide callback functions for events like image click, enabling users to define
    custom behavior 
    Focus on accessibility
 */

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  // https://jsonplaceholder.typicode.com/photos?_limit=8

  const fetchImages = async (imageLimit) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${imageLimit}`
      );
      const data = await res.json();
      setImages(data.products);
    } catch (error) {
      console.error("Handling the error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, []);

  console.log(images);

  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={isLoading}
        imagesPerSlide={1}
        // imageLimit={}
        // customPreviousButton={}
        // customNextButton={}
      />
    </div>
  );
}

export default App;
