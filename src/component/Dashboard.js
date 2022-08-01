import { Button, Card, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import QuizSelectionCard from './QuizSelectionCard'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {gridStyle, cardStyle} from './QuizSelectionCss'
import { Box } from '@mui/system';
import { Grid4x4Outlined } from '@mui/icons-material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { aUser, authUser } from '../atoms';
import {collection, doc, getDocs, query, getDoc, updateDoc, arrayUnion, setDoc, increment, onSnapshot} from 'firebase/firestore'
import { db, storage, auth } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage'
import {  Lock } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


const QuizSelection = () => {
   

    
    const [clicked, setClicked] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [quizImage, setQuizImage] = useState('')
    const [videoImage, setVideoImage] = useState('')
    const [aUser, setUser] = useState('')

    const navigate =  useNavigate()



  
   


    
    useEffect(() => {

  
      const addImage = async() => {
        const reference = ref(storage, `images/quizzes.png`)
        await getDownloadURL(reference).then((x) => {
          setQuizImage(x)
        })

      }
      addImage()
    },[])

    

    useEffect(() => {
      const addImage = async() => {
        const reference = ref(storage, `images/videos.png`)
        await getDownloadURL(reference).then((x) => {
          setVideoImage(x)
        })

      }
      addImage()
    },[])

    //

    

 

 
  

    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)

    const [adminUser, setAdminUser] = useState(false)
    

    

    const [success, setSuccess] = useState(false)
   const stripe = useStripe()
   const elements = useElements()
   const [error, setError] = useState('')
   const [successMessage, setSuccessMessage] = useState('')
   const [signUpEmail, setSignUpEmail] = useState('')
   const [signUpPassword, setSignUpPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {


      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')

      const adminRef = doc(db, 'Users', 'Admin')

      
      

      getDoc(adminRef)
      .then((docu) => {

        if(auth?.currentUser?.uid === docu.data().id)
        {
          setAdminUser(true)
        }
      })

      

    getDoc(videoRef)
    .then((docu) => {

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        setNoVideoAuth(true)
      }
     
      
    })

    getDoc(bundleRef)
    .then((docu) => {
      
      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        
        setNoBundleAuth(true)
      }
    
    })

    getDoc(quizRef)
    .then((docu) => {

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        setNoQuizAuth(true)
      }
    

    })




      const monitorAuthState = async() => {



        onAuthStateChanged(auth, user => {
          if (!user) {
            navigate('/')
          }
          
         
        })
      }

      monitorAuthState()

    }, [noVideoAuth, noQuizAuth, noBundleAuth, auth ])

    //new

   
   
   

    //


    //unlock package

    const [price, setPrice] = useState(0)
    const [pack, setPack] = useState('')

    

    useEffect(() => {


      
        const videoRef = doc(db, 'Packages', 'Video Pack')
        const quizRef = doc(db, 'Packages', 'Quiz Pack')

        if(noVideoAuth && noBundleAuth) {

          getDoc(videoRef)
        .then((res) => {
         
          setPrice(res?.data()?.Details?.Price)
          setPack(videoRef.id)
        })


        }

        
      

      if(noQuizAuth && noBundleAuth) {
        

        getDoc(quizRef)
        .then((res) => {
         
          setPrice(res?.data()?.Details?.Price)
          setPack(quizRef.id)
        })
      }

  
  
     

     //setDoc(docRef, {Session: 1})
      
    
     
    
    }, [noBundleAuth, noVideoAuth, noQuizAuth])



    const logout = async() => {
      const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {
        await signOut(auth)
       
        
       }

       
      
    }


    // purchase

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
              amount: price,
              id
          })

          if (response.data.success) {
              
              console.log('Successful payment')
              setSuccessMessage('Successful! Please Log In')
              
              setSuccess(true)
              setSignUpEmail('')
              setSignUpPassword('')

              

            await updateDoc(doc(db, 'Users', pack ), {
                id: arrayUnion(auth.currentUser.uid)
                
            })

            window.location.reload()

             
          }

          
          

      } catch (error) {
          console.log('error', error)
      }
  }

  

  else{
      console.log(error.message)
      setError(error.message)
  }

  setIsLoading(false)
  

}

  
  
   

  return (

    <Grid style = {{height: '100vh'}}>

      
      {/*  */}

<Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px 0', borderRadius: '10px'}}>

           
            <Typography
              component="h1"
              variant="h2"
              align="center"
              justifyContent= 'center'
              color="text.primary"
              gutterBottom
            >
                Dashboard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

            Signed in as: {auth?.currentUser?.email}

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >


<Button hidden = {!adminUser}  onClick={() => navigate('/admin')} variant="outlined">Admin</Button>
              
              <Button onClick={logout} variant="contained"><LogoutIcon/></Button>
              
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

      {/*  */}
      

      

{/* new grid system */}






  {/* new */}

  {/* {(noBundleAuth && noVideoAuth && noQuizAuth) &&
  'Loading'
  } */}

  {/*  */}


 {!isLoading && <Container sx={{ py: 8 }} maxWidth="md">

    
    <Grid container spacing={4}>

  
     
<Grid  item key={''} xs={12} sm={6} md={6} >
                <Card
               key={''}
                elevation={10}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
                >

<CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={quizImage}
        
        
      />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" align='center'>
                    <Button hidden = {noQuizAuth && noBundleAuth} onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
                    </Typography>

                  
                    {(noQuizAuth && noBundleAuth) && <Typography align='center'><CardElement/><Button onClick={handleSignUp} style = {{marginTop: '20px'}} variant='outlined'>{ `Purchase Written: $${((price/100).toFixed(2))}`}</Button></Typography>}

                   
                   
                  </CardContent>
                  
                </Card>
  </Grid>
<Grid item key={''} xs={12} sm={6} md={6}>
                <Card

               key={''}
                
                
                elevation={10}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
                >

<CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={videoImage}
        
        
      />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" align='center' >
                      <Button hidden = {noVideoAuth && noBundleAuth} onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
                    </Typography>

                    

                    {(noVideoAuth && noBundleAuth) && <Typography align='center'><CardElement/><Button onClick={handleSignUp} style = {{marginTop: '20px'}} variant='outlined'>Purchase Practical:  ${((price/100).toFixed(2))}</Button></Typography>}


                   

                   
                  </CardContent>
                </Card>
  </Grid>
    </Grid>
  </Container>

  }

  {isLoading &&
  
  <Container maxWidth = 'sm'>



<Card
    

elevation={10}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
  style = {{ cursor:'pointer'}}
  
>
  
 
 <CardContent sx={{ flexGrow: 1 }}>

  <Typography paddingTop={7}  align='center' color = 'text.secondary'>

  <Lock sx={{fontSize:'80px'}} />
  
  </Typography>


    
    
    <Typography  color= 'text.secondary' variant='h3' align = 'center' paddingBottom={10}>

      
   
  Unlocking {pack}...
   
    </Typography>
   
  </CardContent>
 
 
 
</Card>

</Container>
  
  }
 
</Grid>
    
  )
}

export default QuizSelection