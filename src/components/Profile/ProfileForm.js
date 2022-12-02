import {useRef, useContext} from 'react'
import Authcontext from '../../store/auth-context';
import './profile.scss';
import { useNavigation } from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordInputRef = useRef()
  const authCtx =useContext(Authcontext)
  const navigate = useNavigation();

  const submitHandler =(e)=>{
    e.prevent.default()

    const enterNewPassword = newPasswordInputRef.current.value

    // add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAOCF5gTRTwBoMk-xEKE4F1plMyLH-fBa4',{
    method:'POST',
    body:JSON.stringify({
      idToken:authCtx.token,
      password:enterNewPassword,
      returnSecureToken:false
    }),
    headers:{
      'Content-Type':'application/json',
      // 'Authorization' :'Bearer abcasadad' 
    }
  }).then((res)=>{
      navigate("/")
  })
  }


  return (
    <div className='profile'>
      <form className='profileform' onSubmit ={submitHandler}>
        <div className='control'>
            <label htmlFor='new-password'>New Password</label>
            <input 
               type="Password"
               ref={newPasswordInputRef}
              minLength="8"
               id="new-password"/>
        </div>
        <div className='action'>
            <button>Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
