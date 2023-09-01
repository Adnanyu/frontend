import ViewFooter from './viewFooter';
import ImageSlider from './imageSlider/imageSlider';
const ViewImage = () => {
  return (
    <div className='view-images-container'>
      <ImageSlider />
      <ViewFooter/>
    </div>
  );
};
export default ViewImage;
