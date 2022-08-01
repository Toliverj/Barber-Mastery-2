import { Avatar, Button, Card, Container, CssBaseline, Grid, Stack } from '@mui/material'
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
import { Lock} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';


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


      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
       
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
 

      if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
       
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

 
   


    const logout = async() => {
      const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {

        await signOut(auth)

        
       }

       
      
    }

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
              Practical
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
              <Button onClick={logout} variant="contained"> <LogoutIcon/> </Button>
              
              
              
            </Stack>
            </Card>
          </Container>
         
        </Box>

{/* new grid system */}





<Container sx={{ py: 8 }} maxWidth="md">
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