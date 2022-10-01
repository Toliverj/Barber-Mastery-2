import { Avatar, Button, Card, Container, CssBaseline, Grid, IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';


import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

import {collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db } from '../firebase';
import VideoSelectionCard from './VideoSelectionCard'
import { AccountCircle, Home, Lock} from '@mui/icons-material';


const VideoSelection = () => {
   




    const [quizzes, setQuizzes] = useState([])

    

    const navigate = useNavigate()

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
        if(noVideoAuth && noBundleAuth) {
          navigate('/dashboard')
        }
        
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
        
      }
     

    })



   

      const monitorAuthState = async() => {
        onAuthStateChanged(auth, user => {
          if (!user && noVideoAuth && noBundleAuth) {
         
            navigate('/')
          }
        })
      }

      monitorAuthState()

    }, [noQuizAuth, noVideoAuth, noBundleAuth,navigate])

 
   


    

    useEffect(() => {

      const getDocuments = async() => {

        const docs = query(collection(db, 'Video'))
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
              Practical Exam Practice
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Video tutorials of the practical broken down in sections so it is easier to digest
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button disabled = {noQuizAuth && noBundleAuth} onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button color = 'secondary' disabled = {noVideoAuth && noBundleAuth} onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              
              
              
              
            </Stack>
            </Card>
          </Container>
         
        </Box>

{/* new grid system */}





<Container sx={{ py: 8 }} maxWidth="lg">
    <Grid container spacing={4}>
    {quizzes.map((card) => (

<VideoSelectionCard card = {card}/>

))}
    </Grid>
  </Container>

</Grid>





    
  )
}

export default VideoSelection