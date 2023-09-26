import './App.css';
import Nav from './routes/nav/nav';
import { Routes, Route } from 'react-router-dom';
import Home from './routes//home/home';
import Posts from './routes/posts/posts';
import Auth from './routes/register/register';
import Login from './routes/login/login';
import NewPost from './routes/new/newPost';
import ViewPost from './routes/view/view';
import EditPost from './routes/edit/edit';
import PrivateRoutes from './routes/private';
import User from './routes/user/user';
import { useEffect } from 'react';
import { checkAuthentication } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { Footer } from './components/footer/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Nav />}>
          <Route path='/posts' element={<Posts />} />
          <Route path='/register' element={<Auth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts/:id' element={<ViewPost />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/posts/:id/edit' element={<EditPost />} />
            <Route path='/posts/new' element={<NewPost />} />
          </Route>
          <Route path='/users/:id' element={<User />} />
        </Route>
      </Routes>

      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default App;
