import { useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import './styles.css';

const Slider = ({ url, limit = 10, page = 1 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async urlAd => {
    try {
      setLoading(true);
      let response = await fetch(`${urlAd}?page=${page}&limit=${limit}`);
      let data = await response.json();

      setImages(data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url, limit, page]);

  //error, loading rendering
  if (loading) {
    return <div>Loading... Please wait!</div>;
  }

  if (errorMsg !== null) {
    return <div> `Error occured: ${errorMsg} `</div>;
  }
  //

  console.log('images', images);

  const handleLeft = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleRight = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  console.log('currentSlide', currentSlide);

  return (
    <div className="container">
      <BsArrowLeftSquareFill onClick={() => handleLeft()} className="arrow arrow-left" />
      {images && images.length
        ? images.map((image, idx) => (
            <img
              key={image.id}
              src={image.download_url}
              alt="Image"
              className={
                currentSlide === idx ? 'current-image' : 'current-image hide-current-image'
              }
              //style={{ width: '500px', height: '500px' }}
            />
          ))
        : null}
      <BsArrowRightSquareFill onClick={() => handleRight()} className="arrow arrow-right" />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, idx) => (
              <button
                key={idx}
                className={
                  currentSlide === idx
                    ? 'current-indicator'
                    : 'current-indicator  inactive-indicator'
                }
                onClick={() => setCurrentSlide(idx)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
};

export default Slider;
