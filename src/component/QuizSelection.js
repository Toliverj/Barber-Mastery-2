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
import { useRecoilValue } from 'recoil';
import { aUser, quiztopics } from '../atoms';
import {collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase';
import { ref } from 'firebase/storage'
import QuizGeneratorCard from './QuizGeneratorCard';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import LogoutIcon from '@mui/icons-material/Logout';



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
      const docRef = await doc(db, "Users1", auth.currentUser.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
      if (answer) {

        await signOut(auth)
       
      }
      
     
    }

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
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px 10px', borderRadius: '10px'}}>
          <HomeIcon onClick = {() => navigate('/dashboard')}/>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Written
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

           Interactive Study guides for each section and a mock exam section to further prepare you!

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button color='secondary' disabled = {noQuizAuth && noBundleAuth} onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button disabled = {noVideoAuth && noBundleAuth} onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              <Button   variant="contained"><LogoutIcon onClick={logout}/></Button>
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

{/* new grid system */}







 <Container sx={{ py: 8 }} maxWidth="md">


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