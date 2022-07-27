import {Link} from "react-router-dom"

import './Post.css'

const Post = ( {post} )=> {

    const PF = "http://localhost:9000/Images/" ;

    console.log(PF + post.photo)
    return (
        <div className='Post'>
            { post.photo && (
            <img 
            className = "PostImage" 
            src = {PF + post.photo}
            alt = "" />
            )}
            <div className="PostInfo">
                <div className="PostCats">
                    {post.categories.map( c => {
                        <span className='PostCat'>{c.name}</span>
                    })}   
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="PostTitle">{post.title}</span>
                </Link>
                <hr/>
                <span className='PostDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='PostDescription'>
                {post.desc}
            </p>

        </div>

    );
}

export default Post ;