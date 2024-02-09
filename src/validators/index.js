import { getUser } from "../credentials";
import { createUser } from "../redux/user/UserActions";



export const emailValidator = (email) =>{
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
    
    return regex.test(email);
}

export const passwordValidator = (password) =>{
   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ;
   return regex.test(password);
}

export const passwordComparator = (email,password) =>{
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    const length = users.length;
     console.log(email,password);
    for(let i = 0 ; i < length ; i++){
      const user = getUser(users[i]);
    //   console.log(user,"**",email,"**",password);
      if(email === user.email && password === user.password){
        createUser(user);
        return true};
    }
  
    return false;
}

export const nameValidator = (name) =>{
    return name.length >= 3;
}

export const confirmPasswordComparator = (password,confirmPassword) =>{
    return password  === confirmPassword;
}

export const userExists = (email) =>{
  const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

  const length = users.length;
  console.log(users[0]); 
  for(let i = 0 ; i < length ; i++){
    const user = users[i];
    if(email === user.email){
        return true
    };
  }

  return false;
}