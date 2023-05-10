import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import dnd from '../assets/img/dnd.jpg';
import gotg from '../assets/img/gotg.jpg';
import smb from '../assets/img/smb.jpg';

const MainCarousel = () => {
  const images = [dnd, gotg, smb];

  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      {images.map((image, index) => {
        return (
          <div>
            <img className="object-cover rounded-lg h-[400px]" src={image} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainCarousel;
