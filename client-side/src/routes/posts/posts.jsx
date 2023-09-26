import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card.component/card';
import Spinner from '../../components/spinner/spinner';
import PostContainer from '../../components/postContainer';
import { getAllPosts } from '../../store/postsSlice';

import './posts.css'
const Posts = () => {
  const { posts,isLoading } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch]);
  
  
  return (
    <PostContainer posts={ posts } isLoading={ isLoading} />
  );
};

export default Posts;
