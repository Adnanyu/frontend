import Card from './card.component/card';
import Spinner from './spinner/spinner';

const PostContainer = ({ posts, isLoading, isUser = false }) => {
  
  return (
    <main className='post-container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isUser && posts && posts.length > 0  ? <h2 style={{textTransform: 'capitalize'}}>{posts[0].author.username}'s posts</h2>: ''}
          {posts &&
            posts.map((post) => {
              return <Card key={post._id} post={post} />;
            })}
        </>
      )}
    </main>
  );
};
export default PostContainer;

//if(userPosts)  <h2>posted by { posts[0].author.username }</h2>
