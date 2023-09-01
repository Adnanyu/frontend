import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/userSlice';
import { toast } from 'react-toastify';

export const useLoginHook = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    
    try {
      await axios
        .post(
          `${backEndLink}/users/login`,
          { ...formData },
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(Login(res.data.user))
          // alert(res.data.message)
          toast.success(res.data.message)
        });
      navigate('/posts')
    } catch (err) {
      // alert(err.response.data);
      toast.error(err.response.data);
      setIsLoading(false)
    }

    console.log(formData);
  };
    return {
        handleSubmit,
        handleChange,
        formData,
      isLoading,
        navigate
    }
}