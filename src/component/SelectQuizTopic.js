import { Avatar, Button, Card, Container, CssBaseline, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { aUser, quiztopics } from '../atoms';
import {collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase';
import { ref } from 'firebase/storage'
import QuizGeneratorCard from './QuizGeneratorCard';
import { AccountCircle, ArrowDownward, Home, Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import SelectQuizTopicCard from './SelectQuizTopicCard';
import BackToTop from './BackToTop';



const SelectQuizTopic = () => {
   


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
      setGetSelectedQuiz([])

      const getDocuments = async() => {

        const docs = query(collection(db, 'Quizzes'))
        const snapshot = await getDocs(docs)
        const tempArr = []
        

        snapshot.forEach((doc) => {

          if (localStorage.getItem(doc.id) === null) {

            localStorage.setItem(doc.id, 0)

          }

          
          
        

          tempArr.push(doc.id)
          setQuizzes(tempArr)
          
        })

        

        

      }

      getDocuments()

    }, [])

    //  
    const [getSelectedQuiz, setGetSelectedQuiz] = useRecoilState(quiztopics)


    
    const bottomRef = useRef()

    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
     if(getSelectedQuiz.length > 0) {
      setIsHidden(false)
     }
     else {
      setIsHidden(true)
     }
  },[getSelectedQuiz])

   

  return (

    

    <Grid>
      

      <Box
          sx={{
            pt: 8,
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="lg">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
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
              gutterBottom
              fontWeight={'bold'}
            >
                Exam Selection
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

          Choose topics you wish to be tested on. We recommend taking each section at least 5 times for best accuracy!

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

<Button color='secondary' onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button   onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>                            
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

{/* new grid system */}







 <Container sx={{ py: 8 }} maxWidth="lg">

 

    <Grid container spacing={4}>

   
     
    
    {quizzes.map((card, i) => (

<SelectQuizTopicCard key = {i} card = {card}/>

))}
    </Grid>
    <Container  style = {{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>

    <Button onClick={() => navigate('/quizgenerator')} variant = 'contained' disabled = {!getSelectedQuiz.length}>Generate Exam</Button>
    </Container>

    {/* <button style={{position: 'fixed', bottom: '20px', right: '20px'}} onClick={scrollToBottom}><ArrowDownward/></button> */}
    <Tooltip  onClick={scrollToBottom} title="View Info" sx={{position: 'fixed', bottom: 20, right: 20, visibility: isHidden && 'hidden' }}>

    <Fab color='info'>
  <ArrowDownward  />
</Fab>

  </Tooltip>

    <div style={{height: 0}} ref={bottomRef}/>

  </Container>


 
</Grid>





    
  )
}

export default SelectQuizTopic