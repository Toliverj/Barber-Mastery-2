import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { collection, doc, getDoc, increment, onSnapshot, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Card, CardContent, CardHeader, Container, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ArrowBack } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { authUser } from '../atoms';
import { useRef } from 'react';




const theme = createTheme();
//const docRef = doc(db, "Users1", auth.currentUser.uid);

export default function Signin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const {pack} = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const exit = async() => {

      await signOut(auth)

  }


  
//new
const [updatedUsers, setUpdateUsers] = useState(0)
//const [aUser, setUser] = useRecoilState(authUser)



  
  const handleLogin = async() => {
    
    try {
      setLoginError('')
      setIsLoading(true)
        const user = await signInWithEmailAndPassword(auth, signInEmail, signInPassword)

        //localStorage.setItem('email', signInEmail)
        //localStorage.setItem('password', signInPassword)
 
        const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
        //localStorage.setItem('aUser', auth)

        if(!(signInEmail === 'admin@admin.com')) {
          

        if (!localStorage.getItem('uid')) {
          alert('Please create your own account')
          signOut(auth)
        }

        else if (localStorage.getItem('uid') !== auth.currentUser.uid) {
           signOut(auth)
           alert('User only has access to account on one device')
         }

        }

        
        

    //     getDoc(docRef)
    //       .then((docu) => {
    
            
        
    //         if(docu.data().Session == 0) {
    
    //          setDoc(docRef, {Session: 1})

    //          navigate('/dashboard')

       
    //         }

    //       else if (!docu.data().Session == 0) {
    //         exit()
    //         navigate('/')
    //         alert('You can only be logged in on one device at a time.')
    //         window.location.reload()

    //       }

            
    //       })

          

       
        
     }
    catch(error) {
        console.log(error)
        setLoginError(error.message)
    }
    
  }
  


 

  const [data, setData] = useState()
  const navigate = useNavigate()

  //Create doc ref to check for authorized users




  useEffect(() => {

    const monitorAuthState = async() => {
      onAuthStateChanged(auth, user => {
        if ((user) ) {
          
         // check to see what package the user has and redirect them to that page
          navigate('/dashboard')
        }
      })
    }

    monitorAuthState()

  }, [])




//get package document
  useEffect(() => {

    const getDocuments = async() => {

        const docRef = doc(db, "Packages", pack);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().Details);
          setData(docSnap.data().Details)
        //   docSnap.data().Questions.forEach((question) => {
        //     console.log(question.Answer.Answer)
        //   })
         
         
          
        } else {
          // doc.data() will be undefined in this case
          navigate('/')
        }
    }

    
    getDocuments()

  }, [])


   //sign Up functionality



   const [success, setSuccess] = useState(false)
   const stripe = useStripe()
   const elements = useElements()
   const [error, setError] = useState('')
   const [successMessage, setSuccessMessage] = useState('')
   const [signInEmail, setSignInEmail] = useState('')
   const [signInPassword, setSignInPassword] = useState('')
   const [loginError, setLoginError] = useState('')

   const getEmail = localStorage.getItem('email')
   const getPassword = localStorage.getItem('password')
   

   const forgotPassword = () => {
    sendPasswordResetEmail(auth, signInEmail)
  .then(() => {
    console.log('password reset sent')
    setLoginError('Reset link sent to your email')
    setSignInEmail('')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode)
    if(error){
      setLoginError('Email does not exist.')
    }
    
  });
   }


  

  return (
    <ThemeProvider theme={theme}>
      <Grid spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center" container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        


        <Grid item xs={12} sm={8} md={12}>
          
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            component = {Card}
            elevation = {10}
            padding = {'20px 20px'}
            borderRadius = {10}
          >

           <Container>
           
                <ArrowBack onClick = {() => navigate('/')}/>
    
            </Container>
           
            <Avatar sx={{ m: 1, bgcolor: 'secondary.primary' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
             
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signInEmail}
                placeholder = {getEmail}
                onChange = {(e) => setSignInEmail(e.target.value)}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signInPassword}
                placeholder = {getPassword}
                onChange = {(e) => setSignInPassword(e.target.value)}
              />
        
              
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {() => handleLogin()}
                disabled = {!signInEmail.length || !signInPassword.length}
              >
                Sign In
              </Button>
              <Grid item xs>
                  <Button disabled = {!signInEmail.length} variant = 'text' href="#" onClick={forgotPassword}>
                    Forgot password?
                  </Button>
                </Grid>
              
            </Box>
            <div style={{color: 'red'}}>{loginError}</div>
            {isLoading && <div>Please Wait...</div>}
          </Box>
          
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

