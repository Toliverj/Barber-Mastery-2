import { Avatar, Button, Card, CircularProgress, Container, CssBaseline, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import QuizSelectionCard from './QuizSelectionCard'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {gridStyle, cardStyle} from './QuizSelectionCss'
import { Box } from '@mui/system';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import HomeIcon from '@mui/icons-material/Home';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { aUser, quiztopics } from '../atoms';
import {collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase';
import { ref } from 'firebase/storage'
import QuizGeneratorCard from './QuizGeneratorCard';
import { AccountCircle, Home, Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';



const QuizSelection = () => {
   

    const array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,]
    const [clicked, setClicked] = useState(false)
    
    const [quizzes, setQuizzes] = useState([])

    const navigate =  useNavigate()


    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)




    useEffect(() => {



      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')

      

    getDoc(videoRef)
    .then((docu) => {

      if(!(docu.data()?.id.includes(auth?.currentUser?.uid))) {
        setNoVideoAuth(true)
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
        if(noBundleAuth ) {
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

      const getDocuments = async() => {

        

        const docs = query(collection(db, 'Quizzes'))
        const snapshot = await getDocs(docs)
        const tempArr = []
        

        snapshot.forEach((doc) => {
          
        

          tempArr.push(doc.id)
          setQuizzes(tempArr)
          
        })

        

        

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
          <Card elevation={10} style = {{padding: '40px 10px', borderRadius: '10px'}}>
          <Box display={'flex'} justifyContent = 'flex-end' padding={'0 10px'}>
              <IconButton>

              <Home  onClick = {() => navigate('/dashboard')}/>

              </IconButton>
              <IconButton>

          <AccountCircle onClick = {() => navigate('/accountpage')}/>

              </IconButton>
            

            </Box>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              fontWeight='bold'
              gutterBottom
            >
                Written Exam Practice
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

Study the sections according to your state board!
             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button  color='secondary'  onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button  onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

{/* new grid system */}







 <Container  maxWidth="lg">

 

    <Grid container spacing={4}>
   
      <QuizGeneratorCard card = 'Mock Exam'/>
    {quizzes.map((card, i) => (

<QuizSelectionCard key = {i} number = {i} card = {card}/>

))}
    </Grid>

  </Container>


 
</Grid>





    
  )
}

export default QuizSelection