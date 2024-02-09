import React,{useState,useEffect} from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import './styles.css'
import { emailValidator, passwordComparator,userExists} from '../../validators';
import Error from '../../components/Error';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from '../../redux/auth/authActions';
import eye from '../../images/eye.png';
import { setAsyncError, unSetError } from '../../redux/error/errorActions';

const Login = () => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    // const[error,setError]  = useState('');
    const[showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isError = useSelector((state)=>state.error.isError);
    const error = useSelector((state)=>state.error.error);

    const emailHandler = (val) =>{
        setEmail(val);
        console.log(val);
    }

    const passwordHandler = (val) =>{
        setPassword(val);
        console.log(val);
    }

    const loginHandler = (e) =>{
        e.preventDefault();
        //validate email
        if(!emailValidator(email)){
            dispatch(setAsyncError(['Enter a valid email address']));
        }
        else if(!userExists(email)){
            dispatch(setAsyncError(["User does not exists"]));  
        }
        else if(!passwordComparator(email,password)){
            dispatch(setAsyncError(["Password is wrong"]));
        }

        else{
            dispatch(unSetError());
            localStorage.setItem('token',JSON.stringify(123456789));
            dispatch(authorizeUser());
            navigate('/',{replace : true});
            
        }

        console.log('form submitted');
    }

    return (
        <div className='formOuterContainer'>
        <div className='formContainer1'>
            <h2 style={{marginBottom:'15px'}}>Log in</h2>
            <form>
        
                <Label title={'E-mail'}/>
                <Input type='email' placeholder='E-mail' onChange = {emailHandler}/>

                
                <Label title={'Password'}/>
                <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showPassword ? 'text' : 'password'} onChange = {passwordHandler}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setShowPassword((prev) => !prev)}/>
                  </div>
                  </div>

                
                <SubmitButton title='Log in' onClick = {(e)=>loginHandler(e)}/>
                
                <div className='toggleSignup' onClick={()=>navigate('/signup')}>
                    <p>New user ?</p>
                    <p>Create account</p>
                </div>
            </form>
        </div>

        {isError && <Error error={error}/>}
        </div>
    );
}
 
export default Login;