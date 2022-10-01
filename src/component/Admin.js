import { Button, Card, Container, Grid, Stack, TextField } from '@mui/material'
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
import { aUser } from '../atoms';
import {addDoc, collection, doc, getDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import QuizGeneratorCard from './QuizGeneratorCard';
import AdminCardSelect from './AdminCardSelect';
import { Logout } from '@mui/icons-material';


const Admin = ({location}) => {
   

    const array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,]
    const [clicked, setClicked] = useState(false)
    
    const [quizzes, setQuizzes] = useState([])

    const navigate =  useNavigate()


    const [noVideoAuth, setNoVideoAuth] = useState(false)
    const [noQuizAuth, setNoQuizAuth] = useState(false)
    const [noBundleAuth, setNoBundleAuth] = useState(false)
    const [adminUser, setAdminUser] = useState('')

   



    useEffect(() => {


      const videoRef = doc(db, 'Users', 'Video Pack')
      const bundleRef = doc(db, 'Users', 'Bundle Pack')
      const quizRef = doc(db, 'Users', 'Quiz Pack')

      const adminRef = doc(db, 'Users', 'Admin')
      

      getDoc(adminRef)
      .then((docu) => {
        console.log(auth.currentUser.uid, 'current user')
        console.log(docu.data().id, 'admin field')

        if(auth.currentUser.uid !== docu.data().id)
        {
          navigate('/dashboard')
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
      const docRef = doc(db, "Users1", auth.currentUser.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
      if (answer) {
      
       await signOut(auth)
       setDoc(docRef, {Session: 0})
       localStorage.clear()
      
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

    }, [db])

    //upload new topic

    const [image, setImage] = useState(null)
    const [topicName, setTopicName] = useState('')
    const [url, setUrl] = useState(null)

    const handleImageChange = (e) => {
      if(e.target.files[0]) {
        setImage(e.target.files[0])
      }

    }



    
    const handleSubmit = async() => {

      const imageRef = ref(storage, `images/${topicName}`)
      uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
        .then((url) => setUrl(url))
      })
      .catch((error) => {
            console.log(error.message, 'errorasd')
      })
      .catch((error) => {
            console.log(error.message)
      })

      console.log('success')

      setImage(null)


      const docRef = doc(db, 'Quizzes', topicName)
      const payload = {Questions: ''}

      await setDoc(docRef, payload).then(() => {
        window.location.reload()
      })

     


    }
 

   

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
          <HomeIcon onClick = {() => navigate('/dashboard')}/>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              fontWeight='bold'
              gutterBottom
            >
                Admin
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

           This section allows the admin to add or remove sections from database as well as edit the contents inside

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button disabled = {noQuizAuth && noBundleAuth} onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button disabled = {noVideoAuth && noBundleAuth} onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              <Button onClick={logout} variant="contained"><Logout/></Button>
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

{/* new grid system */}

<Container sx={{ py: 8 }} maxWidth="lg">
  <Grid item sx={{py:2}} >
  <TextField value = {topicName} onChange = {(e) => setTopicName(e.target.value)}  fullWidth label = 'Enter new topic'/>
  </Grid>
  <Grid item sx={{py:2}} >
  <input type='file' fullWidth onChange={handleImageChange}/>
  </Grid>
 
  <Grid item sx={{py:2}} >
  <Typography>* File type: .png</Typography>
  </Grid>
  <Grid item sx={{py:2}} >
  <Button onClick={handleSubmit} variant='contained'>Add Quiz</Button>
  </Grid>
  
 

  

    <Grid container spacing={4}>
    {quizzes.map((card, i) => (

<AdminCardSelect key = {i} card = {card}/>

))}
    </Grid>
  </Container>
 
</Grid>

    
  )
}

export default Admin