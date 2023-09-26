import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { getPost } from "../../store/postSlice";
import { toast } from "react-toastify";

export const useView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const { post, isLoading} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPost(id))
  }, []);

  const deleteHandler = () => {
    const backEndLink = import.meta.env.BACKEND_URL || 'http://localhost:8000'
    setIsDeleting(true)
    try {
      axios
        .delete(`${backEndLink}/posts/${id}`, { withCredentials: true })
        .then((res) => {
          navigate('/posts');
          setIsDeleting(false)
          console.log(res)
          toast.success(res.data)
        });
    } catch (error) {
      console.error('Axios error:', error);
      setIsDeleting(false)
      toast.error(error.response.data.message)
    }
  };
    
    return {
        deleteHandler,
        id,
        post,
      isLoading,
      isDeleting,
        navigate
    }
};
