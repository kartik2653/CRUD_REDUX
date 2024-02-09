import React,{useEffect, useState}from 'react';
import './styles.css';
import profileBg from '../../images/profile_bg.jpg';
import userProfile from '../../images/user_profile.jpg';
import FooterItem from '../../components/FooterItem';
import EditProfileModal from '../../modals/EditProfileModal';
import { getUser } from '../../credentials';
import { useSelector,useDispatch } from 'react-redux';
import { createUser } from '../../redux/user/UserActions';
import { authorizeUser } from '../../redux/auth/authActions';
import { unauthoriseUser } from '../../redux/auth/authActions';
import { Navigate } from 'react-router-dom';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
const Profile = () => {

    const[showModal , setShowModal] = useState(false);
     const userData = useSelector((state)=>state.user);
     const user = getUser(userData);
     const isAuthorized = useSelector((state)=>state.auth.isAuthorized);
    const dispatch = useDispatch();
    const hideModal = () =>{
        setShowModal(false);
    }
     
    const isLoading = useSelector((state)=>state.loader.isLoading);
    const{isError,error} = useSelector((state)=>state.error);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('users'))[0];
            dispatch(createUser(user));
            dispatch(authorizeUser());
        }else{
            dispatch(unauthoriseUser());
        }
        
    },[isAuthorized]);
    
    return (
        <>
        {
            !isAuthorized ? <Navigate to={'/login'} replace/> :
            <div className='profileOuterContainer' style={{overflow: showModal?'hidden':'visible'}}>
            <div className='profileBgContainer'>
              <img src={profileBg} alt='profileBg' className='profileBg'/>
            </div>

            <div className='userDetailsContainer'>
                <div className='ppContainer'>
                   <img src={userProfile} alt='user profile' className='profilePic'/>
                </div>

                <div className='userDataContainer'>
                   <h3>{user && user.firstName && user.lastName ? user.firstName + " " + user.lastName:''}</h3>
                   <p>{user && user.email ? user.email :''}</p>
                   
                </div>

                <div className='editButtonContainer' onClick={()=>setShowModal(true)}>
                <button className='editButton'>Edit profile</button>
                </div>
            </div>

            <div className='profileFooterContainer'>
                <FooterItem text = 'Organize your chaos, one task at a time. Let us be your guide' color = '#2196F3'/>
                <FooterItem text = 'Maximize your potential with us. Manage tasks effortlessly, achieve greatness effortlessly' color = '#4CAF50'/> 
                <FooterItem text = 'Empower your productivity journey with us. Seamlessly manage tasks and conquer your goals' color = '#FF5252'/>  
            </div>
           {isLoading && <Loader/>}
           { showModal && <EditProfileModal hideModal = {hideModal}/>}
           {isError && <div className='errorHandler'>
                <p style={{color :'#fff',
                 padding:'20px 15px',
                 textAlign:'center',
                 backgroundColor:'#FF5252',
                 borderRadius: '7px',
                 width:'fit-content',
                 margin:'auto',
                  }}>
                {error[0]} 
                </p>
               
            </div>
            }
           <div></div> 
        </div>
        }
        </>
    );
}
 
export default Profile;