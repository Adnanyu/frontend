import ViewImage from '../../components/viewImage';
import axios from 'axios';
import ViewBody from '../../components/viewBody';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import Spinner from '../../components/spinner/spinner';

import './view.css';
import { useView } from './useView';


const ViewPost = () => {
  const {
    deleteHandler,
    post,
    isLoading,
    isDeleting,
    navigate
} = useView()

  dayjs.extend(relativeTime);
  if (isLoading) return <Spinner/>;
  return (
    <main className='view-container'>
      <section className='section-container'>
        <div className='header-container'>
          <h4 className='post-author'>
            Posted By: <span className='author' onClick={()=> navigate(`/users/${post.author._id}`)}>{post.author.username}</span>{' '}
          </h4>
          <span className='posted-date'>{dayjs(post.createdAt).fromNow()}</span>
        </div>
        <ViewImage />
        <ViewBody deleteHandler={ deleteHandler } isDeleting={ isDeleting} />
        
      </section>
    </main>
  );
};
export default ViewPost;
