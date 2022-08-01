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
import { arrayUnion, collection, doc, getDoc, increment, query, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Card, CardContent, CardHeader, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ArrowBack } from '@mui/icons-material';





const theme = createTheme();

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const {pack} = useParams()

 

  const [data, setData] = useState()
  const navigate = useNavigate()

  //Create doc ref to check for authorized users

const [joke, setJoke] = useState('')


  // useEffect(() => {

  //   const monitorAuthState = async() => {
  //     onAuthStateChanged(auth, user => {
  //       if (user) {
  //        // check to see what package the user has and redirect them to that page
  //         navigate('/dashboard')
  //       }
  //     })
  //   }

  //   monitorAuthState()

  // }, [])




//get package document
  useEffect(() => {

    const getDocuments = async() => {

        const docRef = doc(db, "Packages", pack);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
         
          setData(docSnap.data().Details)         
         
          
        } else {
          // doc.data() will be undefined in this case
          navigate('/')
        }


        axios.get('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data.joke)
          setJoke(res.data.joke)
        })
    }

    
    getDocuments()

  }, [])

  
useEffect(() => {

  var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  if (!fs) {
    console.log("check failed?");
  } else {
    fs(window.TEMPORARY,
       100,
       console.log.bind(console, "not in incognito mode"),
       console.log.bind(console, "incognito mode"));
  }



}, [])





   const [success, setSuccess] = useState(false)
   const stripe = useStripe()
   const elements = useElements()
   const [error, setError] = useState('')
   const [successMessage, setSuccessMessage] = useState('')
   const [signUpEmail, setSignUpEmail] = useState('')
   const [signUpPassword, setSignUpPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async(e) => {

      e.preventDefault()

      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)
      })

  

  if (!error) {
      try {


        setIsLoading(true)

          //setError('')
          //change local host to server on heroku
          const {id} = paymentMethod
          const response = await axios.post('https://barber-mastery.herokuapp.com/payment', {
              amount: data.Price,
              id
          })

          if (response.data.success) {

            localStorage.setItem('email', signUpEmail)
            localStorage.setItem('password', signUpPassword)
              
              console.log('Successful payment')
              setSuccessMessage('Successful! Please Log In')
              setSuccess(true)
              setSignUpEmail('')
              setSignUpPassword('')

              const user = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)

            // working
            await updateDoc(doc(db, 'Users', pack), {
                id: arrayUnion(auth?.currentUser?.uid)
                
            })

            localStorage.setItem('uid', auth.currentUser.uid)
             // 

             const docRef = doc(db, "Users1", auth.currentUser.uid);

             getDoc(docRef)
               .then((docu) => {
         
         
                 // setDoc(docRef, {Grade: 0})
      
           
                 
               })
     
                 // 

            navigate('/dashboard')

             
          }
          

      } catch (error) {
          console.log('error', error)
      }
  }

  else{
      console.log(error.message)
      setError(error.message)
  }

}

  return (
    
    <ThemeProvider theme={theme}>
      {isLoading && 
      
      <Grid container spacing={0}direction="column" alignItems="center" justifyContent="center" component="main" sx={{ height: '100vh' }}>
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
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
         
          <Typography component="h1" variant="h5" align='center'>
          Loading...
           
          </Typography>
          <Typography component="h3" variant="h5" align='center'>
          {joke}
           
          </Typography>
         </Box>
      </Grid>
    </Grid>
      
      }
      {!isLoading &&
    <Grid container spacing={0}direction="column" alignItems="center" justifyContent="center" component="main" sx={{ height: '100vh' }}>
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
            padding = {5}
            borderRadius = {10}
          >
             <Container>
           
           <ArrowBack onClick = {() => navigate('/')}/>

       </Container>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
             
            </Typography>
            <Typography className='blink_me' component="h1" variant="body1" gutterBottom color = 'red'>
              *Only one account per device*
             
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
                value={signUpEmail}
                onChange = {(e) => setSignUpEmail(e.target.value)}
                
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
                value={signUpPassword}
                onChange = {(e) => setSignUpPassword(e.target.value)}
              />
              <CardElement/>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {handleSignUp}
                disabled = {!signUpEmail.length || !signUpPassword.length}
              >
                Sign Up / {pack} ${((data?.Price/100).toFixed(2))}
              </Button>

              {isLoading && <div>Please Wait...</div>}
             
             
            </Box>
          </Box>
          
        </Grid>
        
      </Grid>
}

    </ThemeProvider>
  );
}

