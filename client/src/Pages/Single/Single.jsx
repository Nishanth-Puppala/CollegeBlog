import './Single.css' ;
import SideBar from '../../components/SideBar/SideBar';
import SinglePost from '../../components/SinglePost/SinglePost';

const Single = () => {
    return (
        <div className='Single'>
            <SinglePost></SinglePost>
            <SideBar></SideBar>
        </div>
    ) ;
}

export default Single ;