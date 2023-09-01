import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../store/userSlice";
import axios from "axios";
import { toast } from 'react-toastify';

export const useAuth = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    lastname: '',
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    setIsLoading(true)
    try {
      const response = await axios
        .post(
          `${backEndLink}/users`,
          { ...formData },
          { withCredentials: true }
      )
        dispatch(Login(response.data.user))
        navigate('/posts')
      // alert(response.data.message)
      toast.success(response.data.message);
    } catch (err) {
      // alert(err.response.data.message);
      toast.error(err.response.data.message);
      setIsLoading(false)
    }
  };
    
    return {
        handleSubmit,
        handleChange,
        formData,
        isLoading,
        navigate
    }
}