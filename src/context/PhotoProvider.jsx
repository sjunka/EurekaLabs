import React, { useState } from 'react';
import PhotoContext from './PhotoContext';

const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};

export default PhotoProvider;