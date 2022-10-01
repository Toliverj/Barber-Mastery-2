import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './component/Home'
import QuizSelection from './component/QuizSelection'
import Signin from './component/Signin'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Quiz from './component/Quiz'
import Admin from './component/Admin'
import VideoSelection from './component/VideoSelection'
import Video from './component/Video'
import UpdatedSignIn from './component/UpdatedSignin'

import Signup from './component/SignUp'
import Dashboard from './component/Dashboard'
import QuizGenerator from './component/QuizGenerator'
import AdminInput from './component/AdminInput'
import SelectQuizTopic from './component/SelectQuizTopic'
import { Container, createTheme, ThemeProvider, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useBeforeunload } from 'react-beforeunload'
import CircularStatic from './component/TestingScreen'

import TestingScreen from './component/TestingScreen'
import AccountPage from './component/AccountPage'



const App = () => {

  
   
  function Copyright(props) {
   
    return (
     
      <Typography variant="body2" color="white" align="center"  {...props}>
        <Typography> Contact: jhaelintoliver1@live.com</Typography>
        {'Copyright © '}
        
          Barber Mastery 
        
        {` ${new Date().getFullYear()}`}
        {'.'}
      </Typography>
   
    );
  }
  const [mode, setMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })



 
 

  return (
    <ThemeProvider theme = {darkTheme}>

    <div className='app' onContextMenu = {(e) => e.preventDefault() }>
      
    

      <Router>

        <Routes>
  
            
            <Route exact path='/' element = {<Home/>}/>
            <Route exact path='/signin' element = {<Signin/>}/>
            <Route path='/quizselection' element = {<QuizSelection/>}/>
            <Route path='/quiz/:id' element = {<Quiz/>}/>
            <Route path='/video/:id' element = {<Video/>}/>
            <Route path='/admin' element = {<Admin/>}/>
            <Route path='/videoselection' element = {<VideoSelection/>}/>
            <Route path='/signup/:pack' element = {<Signup/>}/>
            <Route path='/dashboard' element = {<Dashboard/>}/>
            <Route path='/quizgenerator' element = {<QuizGenerator/>}/>
            <Route path='/admin/:id' element = {<AdminInput/>}/>
            <Route path='*' element = {<div>Page not found</div>}/>
            <Route path='/selectquiz' element = {<SelectQuizTopic/>}/>
            <Route path='/accountpage' element = {<AccountPage/>}/>


            {/* <Route path='/' exact element = {<TestingScreen/> }/>   */}

        
            
         

        </Routes>


      </Router>

      {/* <CircularStatic/> */}

      <Copyright/>


      

    </div>

    </ThemeProvider>
   
  )
}

export default App