import {useState, useRef, useContext} from 'react';
import Authcontext from '../../store/auth-context';
import "./authform.scss";
import  { useNavigate } from 'react-router-dom'

const AuthFrom = () => {
    const navigate = useNavigate();
    const [isLogin , setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
   const[isLoding, setIsLoading]= useState(false);
  
   const authCtx =useContext(Authcontext)


    const swithAuthModeHandler =()=>{
        setIsLogin((prevState)=>!prevState)        
    }


    const submitHandler =(e)=>{
      e.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      // add validation

      setIsLoading(true)
      let url;
      if(isLogin){
        url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOCF5gTRTwBoMk-xEKE4F1plMyLH-fBa4'
      }
      else{
        url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOCF5gTRTwBoMk-xEKE4F1plMyLH-fBa4'       
      }
      fetch(url,{
          method:'POST',
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true }),
          headers:{
            'Content-Type':'application/json'}
        }).then((res) =>{
             setIsLoading(false)
            if(res.ok){
             return res.json()
          
            }
            else{
              return res.json().then((data) =>{
                console.log(data)
                let errorMessage = 'Authentication Failed'
                if(data && data.error && data.error.message){
                  errorMessage = data.error.message
                }
               
               throw new Error(errorMessage)
              })}
          })
          .then((data) =>{
              console.log(data)
              const expirationTime = new Date(new Date().getTime() + (+data.expiresIn*1000))
              authCtx.login(data.idToken,expirationTime.toISOString)
              navigate('/');
          }).catch((err)=>{
            alert(err.message)
          })
    }

 
  return (
    <div className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className='control'>
            <label htmlFor='email'>Your Email</label>
            <input 
              type="email" 
              id='email' 
              required
              ref={emailInputRef}
            />
        </div>
        <div className='control'>
            <label htmlFor='password'> Your Password</label>
            <input 
              type="password" 
              id="password" 
              required
              ref={passwordInputRef}
              />
        </div>
        <div className='actions'>
          {!isLoding && 
            <button>{isLogin ? 'Login' : 'Create Account'}</button> }
            
            {isLoding && <p>Sending the request...</p>}
          
            <button
                type="button"
                className='toggBtn'
                onClick={swithAuthModeHandler}
                >
                    {isLogin ? 'create a new account' : 'Login with existing account'}
                </button>
        </div>
      </form>
    </div>
  )
}

export default AuthFrom;
