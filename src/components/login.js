import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect} = useAuth0();
  return (
    <div className='h-screen flex justify-center items-center'>
        <button className='flex justify-center bg-black w-40 p-3 rounded text-white' onClick={()=>loginWithRedirect()}>Login Now</button>
    </div>
  )
}

export default LoginButton