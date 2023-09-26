import { useNavigate } from 'react-router-dom';
import './home.css';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      <div className='homepage-container'>
        <h1>Welcome to Setup-Spot</h1>
        <p>
          A place where you can post and see all your setups from your favorite
          streamers, podcasts, youtubers and gamers
        </p>
        <div className='buttons'>
          <button className='home-buttons' onClick={() => navigate('/posts')}>
            Browse
          </button>
          <button
            className='home-buttons'
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
