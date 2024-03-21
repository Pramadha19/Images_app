import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return; // Don't fetch if search query is empty
      
      const accessKey = "AiVqwSLLPbggtp7wpbF2YoVPmrPzTymOj0iHgiR35EU"; // Replace "YOUR_ACCESS_KEY" with your actual Unsplash access key
      const url = `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Client-ID ${accessKey}`
          }
        });
        const data = await response.json();
        setImages(data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Image Generator app</h1>
        <form>
          <input type='search' placeholder='Enter Text....' value={searchQuery} onChange={handleSearchChange}></input>
        </form>
      </div>
      <div className="image-container">
        {images.map((image) => (
          <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
}

export default App;