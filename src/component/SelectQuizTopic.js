import { Avatar, Button, Card, Container, CssBaseline, Grid, Stack } from '@mui/material'
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { aUser, quiztopics } from '../atoms';
import {collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase';
import { ref } from 'firebase/storage'
import QuizGeneratorCard from './QuizGeneratorCard';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import SelectQuizTopicCard from './SelectQuizTopicCard';
import LogoutIcon from '@mui/icons-material/Logout';



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

  
    
   

    const logout = async() => {
      const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {

       // setDoc(docRef, {Session: 0})
        await signOut(auth)
        //window.location.reload()
        
       }

       
      
    }

    useEffect(() => {
      setGetSelectedQuiz([])

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

    //  
    const [getSelectedQuiz, setGetSelectedQuiz] = useRecoilState(quiztopics)

    

   

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
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Exam Selection
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

          Choose topics you wish to be tested on

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button onClick={() => navigate('/quizselection')} variant="outlined">Go Back</Button>
              <Button onClick={logout} variant="contained"><LogoutIcon/></Button>
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

{/* new grid system */}







 <Container sx={{ py: 8 }} maxWidth="md">

 


    <Grid container spacing={4}>

     
    
    {quizzes.map((card, i) => (

<SelectQuizTopicCard key = {i} card = {card}/>

))}
    </Grid>
    <Container  style = {{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>

    <Button onClick={() => navigate('/quizgenerator')} variant = 'contained' disabled = {!getSelectedQuiz.length}>Generate Exam</Button>
    </Container>

    

  </Container>


 
</Grid>





    
  )
}

export default SelectQuizTopic