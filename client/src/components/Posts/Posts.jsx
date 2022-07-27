import './Posts.css'
import Post from '../Post/Post';

const Posts = ( {posts} ) => {
    return(
        <div className='Posts'>
            { posts.map( p => (
                <Post post={p}></Post>
            ))}
        </div>
    );
}

export default Posts ;