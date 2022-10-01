import { Button, Container, Grid, IconButton, List, ListItem, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
import { collection, doc, getDoc, getDocFromCache, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDownloadURL,  ref } from 'firebase/storage';
import '../App.css'
import { AccountCircle, Home } from '@mui/icons-material';
import ReactPlayer from 'react-player';

const Video = () => {
   

    const array = ['Define Gravity',2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,]
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])

    
    const [videoURL, setVideoURL] = useState()

    const {id} = useParams()


    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)
    const [youtubeUrl, setYoutubeUrl] = useState('')

    const [arrCollection, setArrCollection] = useState([])
    
  

    useEffect(() => {


      console.log(id)

     if(id === '1. Manicure') {
        setYoutubeUrl('https://youtu.be/wr1qSmEDtf4?rel=0&modestbranding=1&showinfo=0&fs=0controls=1')
     }
     else if (id === '2. Professional Shave Service') {
      setYoutubeUrl('https://youtu.be/zonk2Vh2sMI?rel=0&modestbranding=1&showinfo=0&fs=0')
     }
     else if (id === '3. Blood Exposure') {
      setYoutubeUrl('https://youtu.be/9ZVRpmFzKYQ?rel=0&modestbranding=1&showinfo=0&fs=0')
     }
     else if (id === '4. Facial Service') {
      setYoutubeUrl('https://youtu.be/xLu-IcFYB5Q?rel=0&modestbranding=1&showinfo=0&fs=0')
     }

    }, [])

    useEffect(() => {

      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')


      

    getDoc(videoRef)
    .then((docu) => {


      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {

        setNoVideoAuth(true)
        if(noVideoAuth && noBundleAuth) {
          navigate('/dashboard')
        }
      }
     
      
    })

    getDoc(bundleRef)
    .then((docu) => {


      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {

        setNoBundleAuth(true)
       
      }
     
    })

    getDoc(quizRef)
    .then((docu) => {


      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {

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

    }, [noBundleAuth, noVideoAuth, noQuizAuth])


    // useEffect(() => {
    //   const getVideo = async() => {

    //     getDownloadURL(ref(storage, `videos/${id}.mov`))
    //     .then((url) => {
    //         setVideoURL(url)
    //     }, [])
        

    //   }

    //   getVideo()
    // }, [])

    const videoData = useRef([])

    useEffect(() => {

      const unsub = onSnapshot(doc(db, "Video", id), (doc) => {
        videoData.current = doc?.data()?.Info       
      })

      

    }, [])

    

   
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
           
            pt: 8,
            pb: 6,
          }}
        >


          
          <Container maxWidth="lg">
          <Card elevation={10} style = {{padding: '40px 10px', borderRadius: '10px'}}>
          <Box display={'flex'} justifyContent = 'flex-end' padding={'0 10px'}>
              <IconButton>

              <Home  onClick = {() => navigate('/dashboard')}/>

              </IconButton>
              <IconButton>

          <AccountCircle onClick = {() => navigate('/accountpage')}/>

              </IconButton>
            

            </Box>
          <CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={image}       
      />
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontWeight={'bold'}
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
              <Button onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button   onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>              
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

  <Grid item xs = {12}>


    

  {youtubeUrl ? ( 

<div className='video'>

<ReactPlayer  width={'100%'} height = {'500px'} controls url={youtubeUrl}/>


</div>




  
    ) : (<h2>No video at the moment...</h2>)}

  </Grid>

  <Grid item xs={3} sm = {6} md = {12}>

  
   
  </Grid>
  
</Grid> 

<Box
          sx={{
            
            pt: 8,
            pb: 6,
          }}
        >


          
          <Container maxWidth="lg">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          <Typography variant = 'h4'  fontWeight={900}> {id} ({videoData?.current.Time} min)</Typography>

         
          <List >

{videoData?.current.Steps && videoData?.current.Steps.map((data, i) => (
  <ListItem><Typography color = 'text.secondary' variant = 'h6'>{i + 1}. {data}</Typography> </ListItem>
))}
 
  
</List>
            

            </Card>
          </Container>
          
        </Box>


       

   



</Grid>


    
  )
}

export default Video