import React,{useState, useEffect, useCallback} from 'react'


let logoutTimer;

 const Authcontext =React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{

    },
    logout:()=>{

    }
})

const calculateRemainingTime =(expirationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration =adjExpirationTime -currentTime;

    return remainingDuration
}


const retrieveStoredToken =()=>{
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('experationTime')

  const remainingTime = calculateRemainingTime(storedExpirationDate)  


  if(remainingTime <= 60000-3600)
  {
    localStorage.removeItem('token')
    localStorage.removeItem('experationTime')
    return null 
  }
  return {
    token:storedToken,
    duraton:remainingTime
  }
}





export const AuthcontextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initalToken;
  if(tokenData)
  {
    initalToken=tokenData.token
  }
  // const initalToken = localStorage.getItem('token')
  const [token , setToken] = useState(initalToken)

    // const [token, setToken] = useState(null);

    const userIsLoggedIn =!!token; 

    const logoutHandler=useCallback(()=>{
      setToken(null)
      localStorage.removeItem('token')   
      localStorage.removeItem('expirationTime')
      if(logoutTimer)
      {
        clearTimeout(logoutTimer)
      }
  },[])


    const loginHandler =(token, expirationTime)=>{
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime)
        const remainingTime = calculateRemainingTime(expirationTime)

        logoutTimer=setTimeout(loginHandler,  remainingTime )

    }

    useEffect(()=>{
      if(tokenData)
      {
        console.log(tokenData.duraton)
        logoutTimer = setTimeout(logoutHandler, tokenData.duraton)
      }
    },[tokenData,logoutHandler])
   

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }


  return (
    <Authcontext.Provider value={contextValue}>
      {props.children}
    </Authcontext.Provider>
  )
}

export default Authcontext
