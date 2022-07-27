import axios from 'axios';
import { useEffect , useState , useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom"
import './SinglePost.css'
import { Context } from "../../context/Context";

const SinglePost = ()=> {

    const location = useLocation() ;
    const path = location.pathname.split("/")[2] ;
    const [post,setPost] = useState({}) ;
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    const PF = "http://localhost:9000/Images/" ;

    useEffect( () => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data) ;
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost() ;
    } , [path] );

    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
    };

    return(
        <div className="SinglePost">
            <div className="SinglePostWrapper">
                {post.photo && (
                     <img className="SinglePostImage" 
                     src={PF + post.photo}
                     alt=''
                     />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="SinglePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    ) : (
                    <h1 className="SinglePostTitle">
                        {title}
                        {post.username === user?.username && (
                        <div className="SinglePostEdit">
                            <i
                            className="SinglePostIcon far fa-edit"
                            onClick={() => setUpdateMode(true)}
                            ></i>
                            <i
                            className="SinglePostIcon far fa-trash-alt"
                            onClick={handleDelete}
                            ></i>
                        </div>
                        )}
                    </h1>
                    )}

                <div className="SinglePostInfo">
                    <span className="SinglePostAuthor">
                    Author :
                        <Link to= {`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                        </Link> 
                    </span>
                    <span className="SinglePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className="SinglePostDescriptionInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    ) : (
                    <p className="SinglePostDescription">{desc}</p>
                    )}
                    {updateMode && (
                    <button className="SinglePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}

export default SinglePost ;