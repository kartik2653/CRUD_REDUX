import React,{useState} from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import './styles.css'
import { confirmPasswordComparator, emailValidator, nameValidator, passwordValidator } from '../../validators';
import Error from '../../components/Error';
import { createUserAsync } from '../../redux/user/UserActions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import eye from '../../images/eye.png';
import Loader from '../../components/Loader';
import { setLoading, unsetLoading } from '../../redux/loader/loaderActions';
import { setAsyncError, setError, unSetError } from '../../redux/error/errorActions';
import { generateError } from '../../helper';
const Signup = () => {

    const[showPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setshowConfirmPasssword] = useState(false);
    const[firstName,setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email,setEmail]  = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    // const[error,setError] = useState('');
    const isError = useSelector((state)=>state.error.isError);
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loader.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputHandler = (value , key) =>{
      switch(key){
        case 1:{
            setFirstName(value);
            break;
        }

        case 2:{
            setLastName(value);
            break;
        }

        case 3:{
            setEmail(value);
            break;
        }
        case 4:{
            setPassword(value);
            break;
        }
        case 5:{
            setConfirmPassword(value);
            break;
        }
        default:{}
      }
    }

    const signupHandler = (e) =>{

       e.preventDefault();
       
       
       if(!nameValidator(firstName)){
        console.log("jii");
        dispatch(setAsyncError(["First name length must be at least 3"]));
       }
       else if(!nameValidator(lastName)){
        dispatch(setAsyncError(["Last name length must be at least 3"]));
      }
      else if(!emailValidator(email)){
        dispatch(setAsyncError(["Enter a valid email address"]));
      }
      else if(!passwordValidator(password)){
        dispatch( setAsyncError(["Password must be strong",
        "Must be eight characters or longer",
        "Must contain at least one special character",
        "Must contain at least 1 numeric character",
        "Must contain at least 1 uppercase alphabetical character",
        "Must contain at least 1 lowercase alphabetical character",
       ]));
      }
      else if(!confirmPasswordComparator(password,confirmPassword)){
        dispatch(setAsyncError(["Passwords are not same"]));
      }
      else{
        dispatch(unSetError);

        const user = {
         name : firstName + "*" +lastName +"&"+password,
         email: email,
         gender:'male',
         status:'active',
        };

        try {
          dispatch(setLoading());
          dispatch(createUserAsync(user));
          navigate('/login',{replace:true});
        } catch (msg) {
          dispatch(setAsyncError([msg]));
        }finally{
          dispatch(unsetLoading());
        }
      }
    }

    return (
        isLoading ? <Loader/> :
        <div className='formOuterContainer'>
        <div className='signupFormContainer'>
            <h2 style={{marginBottom:'15px'}}>Sign up</h2>
            <form>
                <Label title={'First name'}/>
                <Input type='text' placeholder='First name' onChange={(val)=>inputHandler(val,1)}/>

                <Label title={'Last name'}/>
                <Input type='text' placeholder='Last name' onChange={(val)=>inputHandler(val,2)}/>
                
                <Label title={'E-mail'}/>
                <Input type='email' placeholder='E-mail' onChange={(val)=>inputHandler(val,3)}/>

                <Label title={'Password'}/>
                <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showPassword ? 'text' : 'password'} onChange={(val)=>inputHandler(val,4)}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setShowPassword((prev) => !prev)}/>
                  </div>
                  </div>

                <Label title={'Confirm Password'} />

                 <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showConfirmPassword ? 'text' : 'password'} onChange={(val)=>inputHandler(val,5)}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setshowConfirmPasssword((prev) => !prev)}/>
                  </div>
                  </div>
                

                <SubmitButton title='Create Account' onClick={(e)=>signupHandler(e)}/>
                
                <div className='toggleSignup' onClick={()=>navigate('/login')}>
                    <p>Already a member ?</p>
                    <p>Sign in</p>
                </div>
            </form>
        </div>
        {
            isError && <Error error = {error}/>
        }
        </div>
    );
}
 
export default Signup;