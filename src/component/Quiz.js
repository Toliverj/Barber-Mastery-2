import { Avatar, Button, CircularProgress, Container, CssBaseline, Grid, IconButton, Stack } from '@mui/material'
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
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {ref, getDownloadURL} from 'firebase/storage'
import {storage} from '../firebase'
import { AccountCircle, Home, Lock } from '@mui/icons-material';
import QuizGeneratorCard from './QuizGeneratorCard';


const Quiz = () => {
   

    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState('')
    

    const {id} = useParams()

 

    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)

    const [arrCollection, setArrCollection] = useState([])

    useEffect(() => {

      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')

      const adminRef = doc(db, 'Users', 'Admin')

      getDoc(adminRef)
      .then((docu) => {

        if(auth?.currentUser?.uid === docu.data()?.id)
        {
          setIsAdmin(true)
        }
      })

      

    getDoc(videoRef)
    .then((docu) => {


      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {
        
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

      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {
        setNoQuizAuth(true)
        if(noQuizAuth && noBundleAuth) {
          navigate('/dashboard')
        }
       
        
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

    }, [noBundleAuth, noQuizAuth, noVideoAuth])


     useEffect(() => {
      const addImage = async() => {
        const reference = ref(storage, `images/${id}.png`)
        await getDownloadURL(reference).then((x) => {
          setImage(x)
        })

      }
      addImage()
    },[])

    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array
    }


    useEffect(() => {
      const getDocuments = async() => {

        const docRef = doc(db, "Quizzes", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          docSnap.data().Questions.forEach((question) => {
          })
         
          setQuestions(docSnap.data().Questions)
          setSummary(docSnap.data().Summary)
          
        } 

        

        

      }

      getDocuments()
    }, [])


    

   

  return (

    <Grid>

<Box
          sx={{
       
            pt: 8,
            pb: 6,
          }}
        >


          <Container maxWidth="lg">
          <Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>

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
        style={{objectFit: 'contain', marginTop: '30px'}}
        image={image}       
      />

            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              fontWeight='bold'
              gutterBottom
            >
               {id}
            </Typography>

           


            <Typography variant="h5" align="center" color="text.secondary" paragraph>
             {summary}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button    onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button  onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              
            </Stack>
            </Card>
          </Container>
          
        </Box>




{/* new grid system */}

{!questions.length && 
      
      <Grid container spacing={0}direction="column" alignItems="center" justifyContent="center" component="main" >
      <CssBaseline />
      
    
      <Container sx={{ py: 8 }} maxWidth="sm">
    
      <Grid item xs={12} sm={8} md={12} margin = 'auto'>
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
          
           <CircularProgress/>
         
          <Typography component="h1" variant="h5" align='center' width= '20vw'>
           Loading...
           
          </Typography>
         </Box>
      </Grid>
      </Container>
    </Grid>
      
      }

{/*  */}

{questions.length &&
<Container sx={{ py: 8 }} >
    <Grid container spacing={4}>
    {questions.map((question, i) => (

<QuizCard admin = {isAdmin} key = {i} number = {i +1} question = {question.Question} answer = {question.Answer.Answer} choices = {question.Choices} picture = {question.Answer.Picture} summary = {question.Answer.Summary} image = {image}/>

))}
    </Grid>
  </Container>

    }

    



{/* Old grid system */}
   

</Grid>


    
  )
}

export default Quiz