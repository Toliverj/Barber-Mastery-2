import { Button, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {gridStyle, cardStyle} from './QuizSelectionCss'
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { useParams, useNavigate } from 'react-router-dom';
import QuizCard from './QuizCard';
import { useRecoilValue } from 'recoil';
import { aUser } from '../atoms';
import { collection, doc, getDoc, getDocFromCache, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDownloadURL,  ref } from 'firebase/storage';
import LogoutIcon from '@mui/icons-material/Logout';

const Video = () => {
   

    const array = ['Define Gravity',2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,]
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])

    
    const [videoURL, setVideoURL] = useState()

    const {id} = useParams()


    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)

    const [arrCollection, setArrCollection] = useState([])

    useEffect(() => {

      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')

      

    getDoc(videoRef)
    .then((docu) => {
      console.log(docu.data().id)
      console.log(auth.currentUser.uid)

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        console.log('no video auth')
        setNoVideoAuth(true)
        if(noVideoAuth && noBundleAuth) {
          navigate('/dashboard')
        }
      }
      else {
        console.log('yes video auth')
      }
      
    })

    getDoc(bundleRef)
    .then((docu) => {
      console.log(docu.data().id)
      console.log(auth.currentUser.uid)

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        console.log('no bundle auth')
        setNoBundleAuth(true)
       
      }
      else {
        console.log('yes bundle auth')
      }
    })

    getDoc(quizRef)
    .then((docu) => {
      console.log(docu.data().id)
      console.log(auth.currentUser.uid)

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
        console.log('no quiz auth')
        setNoQuizAuth(true)
       
        
      }
      else {
        console.log('yes quiz auth')
      }

    })

      const monitorAuthState = async() => {
        onAuthStateChanged(auth, user => {
          if (!user) {
           // console.log(user.email, 'asd')
            navigate('/')
          }
        })

        console.log(id, 'asd;fj')

      }

      monitorAuthState()

    }, [noBundleAuth, noVideoAuth, noQuizAuth])


    useEffect(() => {
      const getVideo = async() => {

        getDownloadURL(ref(storage, `videos/${id}.mov`))
        .then((url) => {
            setVideoURL(url)
            console.log(videoURL, 'urlrlrlrl')
        }, [])
        

      }

      getVideo()
    }, [])

    

    const handleLogout = async() => {
      const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {

   
        await signOut(auth)
  
        
       }

       
      
    }

    const [image, setImage] = useState('')

    useEffect(() => {
      const addImage = async() => {
        const reference = ref(storage, `images/${id}.png`)
        await getDownloadURL(reference).then((x) => {
          setImage(x)
        })

      }
      addImage()
    },[])

  return (

    <Grid>

<Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >


          
          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          <HomeIcon onClick = {() => navigate('/dashboard')}/>
          <CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={image}       
      />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
               {id}
            </Typography>
            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => navigate('/videoselection')} variant="outlined">Go Back</Button>
              <Button onClick={handleLogout} variant="contained"><LogoutIcon/></Button>
              
            </Stack>
            </Card>
          </Container>
          
        </Box>




{/* new grid system */}

<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
 
>

  <Grid item xs={3} sm = {6} md = {12}>

  {videoURL ? ( <video
    width={'800px'}
    preload
    controls
        src={videoURL}
    />) : (<h2>No video at the moment...</h2>)}
   
  </Grid>   
   
</Grid> 


       
{/* Old grid system */}
   



</Grid>


    
  )
}

export default Video