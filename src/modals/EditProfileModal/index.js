import React ,{useState,useEffect}from 'react';
import ModalOutbox from '../ModalOutbox';
import { nameValidator,emailValidator,passwordValidator, confirmPasswordComparator } from '../../validators';
import Label from '../../components/Label';
import SubmitButton from '../../components/SubmitButton';
import Input from '../../components/Input';
import Error from '../../components/Error';
import './styles.css'
import { getUser } from '../../credentials';
import { updateUserAsync } from '../../redux/user/UserActions';
import { useDispatch ,useSelector} from 'react-redux';
import eye from '../../images/eye.png';
import { setLoading, unsetLoading } from '../../redux/loader/loaderActions';


const EditProfileModal = ({hideModal}) => {
  const[showPassword,setShowPassword] = useState(false);
  const[showConfirmPassword,setshowConfirmPasssword] = useState(false);
    const[firstName,setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email,setEmail]  = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[error,setError] = useState('');
    const[id,setId] = useState(-1);
    const userDetails = useSelector((state)=>state.user);
    const dispatch = useDispatch();
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
        setError(["First name length must be at least 3"]);
       }
       else if(!nameValidator(lastName)){
        setError(["Last name length must be at least 3"]);
      }
      else if(!emailValidator(email)){
        setError(["Enter a valid email address"]);
      }
      else if(!passwordValidator(password)){
        setError(["Password must be strong",
                  "Must be eight characters or longer",
                  "Must contain at least one special character",
                  "Must contain at least 1 numeric character",
                  "Must contain at least 1 uppercase alphabetical character",
                  "Must contain at least 1 lowercase alphabetical character",
                 ]);
      }
      else if(!confirmPasswordComparator(password,confirmPassword)){
        setError(["Passwords are not same"]);
      }
      else{
        setError([]);
        hideModal();
        
        
        const updatedUser = {
          name : firstName + "*" +lastName +"&"+password,
          email : email,
          status :'active',
          gender :'male',
          id,
        };
        try{
          
          dispatch(updateUserAsync(updatedUser,id));
        }catch(err){
         alert(err);
        }finally{
          
        }
        
        
      }
    }

    const modalHandler = (e) =>{
        console.log(e.target.className);
        if(e.target.className === 'modalFormOuterContainer'){
            hideModal();
        }
    }

    const setDefaultValues = () =>{
      const user = getUser(userDetails);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPassword(user.password);
      setConfirmPassword(user.password);
      setEmail(user.email);
      setId(user.id);
    }


    useEffect(()=>{
      
      setDefaultValues();
    },[]);
   
    return (
        <>
        <ModalOutbox />
        <div className='modalFormOuterContainer' onClick={(e)=>modalHandler(e)}>
        <div className='formContainer'>
            <h2 style={{marginBottom:'15px'}}>Change profile</h2>
            <form>
                <Label title={'First name'}/>
                <Input type='text' placeholder='First name' onChange={(val)=>inputHandler(val,1)} defaultValue = {firstName}/>

                <Label title={'Last name'}/>
                <Input type='text' placeholder='Last name' onChange={(val)=>inputHandler(val,2)} defaultValue = {lastName}/>
                
                <Label title={'E-mail'}/>
                <Input type='email' placeholder='E-mail' onChange={(val)=>inputHandler(val,3)} defaultValue = {email}/>

                <Label title={'Password'}/>
                <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showPassword ? 'text' : 'password'} onChange={(val)=>inputHandler(val,4)} defaultValue={password}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setShowPassword((prev) => !prev)}/>
                  </div>
                  </div>

                <Label title={'Confirm Password'} />

                 <div className='passwordContainer'>
                 <Input placeholder = 'Password' type = {showConfirmPassword ? 'text' : 'password'} onChange={(val)=>inputHandler(val,5)} defaultValue={confirmPassword}/>
                  <div className='eyeContainer'>
                     <img className='eye' src={eye} alt='Show password' onClick={()=> setshowConfirmPasssword((prev) => !prev)}/>
                  </div>
                  </div>

                <SubmitButton title='Save changes' onClick={(e)=>signupHandler(e)}/>
                
            </form>
        </div>
        {
            error && <Error error = {error}/>
        }
        </div>
        </>
    );
}
 
export default EditProfileModal;