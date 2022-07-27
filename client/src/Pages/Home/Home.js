import { useEffect , useState } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/SideBar/SideBar";
import axios from 'axios'
import { useLocation } from "react-router-dom";

import "./Home.css"

const Home = () => {

    const [posts,setPosts] = useState([]) ;
    const { search } = useLocation();

    useEffect( ()=>{
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search) ;
            setPosts(res.data);
        }
        fetchPosts();
    },[search])
    return (
        <div>
            <Header></Header>
            <div className="Home">
                <Posts posts={posts}></Posts>
                <SideBar></SideBar>
            </div>
        </div>
    )

}

export default Home ;