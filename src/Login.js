import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import { auth, provider } from './firebase'

function Login() {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login_logo">
              <img 
                 src="https://bubbleplan.net/blog/wp-content/uploads/2018/01/logo-discord.jpg"
                 alt="discord_logo"

                 />
            </div>
            <Button onClick={signIn}>SignIn</Button>
        </div>
    )
}

export default Login
 