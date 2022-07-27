import './SideBar.css'
import { useState , useEffect} from "react"
import {Link} from "react-router-dom"
import axios from 'axios';

const SideBar = ()=>{
    const [cats,setCats] = useState([]);
    
    useEffect( ()=> {
        const getCats = async ()=> {
            const res = await axios.get("/categories") ;
            setCats(res.data) ;
        }
        getCats() ;
    } , []);
    return(
        <div className='SideBar'>
            <div className="SideBarItem">
                <span className="SideBarTitle">ABOUT ME</span>
                <img src='https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg' alt ='' /> 
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ullam laborum deleniti labore hic error
                    , quaerat aut suscipit aperiam</p>
            </div>

            <div className="SideBarItem">
                <span className="SideBarTitle">Categories</span>
                <ul className="SideBarList">
                    { cats.map( (c) => (
                        <Link to= {`/?cat=${c.name}`} className="link">
                        <li className="SideBarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="SideBarItem">
                <span className="SideBarTitle">FOLLOW US</span>
                <div className='SideBarSocial'>
                    <i className="SideBarIcon fa-brands fa-facebook-square"></i>
                    <i className="SideBarIcon fa-brands fa-twitter-square"></i>
                    <i className="SideBarIcon  fa-brands fa-instagram-square"></i>
                    <i className="SideBarIcon  fa-brands fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar ;