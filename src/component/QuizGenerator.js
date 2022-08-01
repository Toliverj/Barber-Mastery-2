import { AppBar, Button, Container, Fab, Grid, IconButton, Stack, styled, Toolbar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {gridStyle, cardStyle} from './QuizSelectionCss'
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { useParams, useNavigate, Link } from 'react-router-dom';
import QuizCard from './QuizCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { aUser, clicks, quiztopics, score } from '../atoms';
import { collection, doc, getDoc, getDocFromCache, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {ref, getDownloadURL} from 'firebase/storage'
import {storage} from '../firebase'
import GeneratedQuizCard from './GeneratedQuizCard';
import { AccessTime, Lock, LockClock, Menu, PunchClock } from '@mui/icons-material';
import { ClockPicker } from '@mui/lab';
import '../App.css'
import Logout from '@mui/icons-material/Logout';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Typography> Contact: jhaelintoliver1@live.com</Typography>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        jTol_Cuts
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const QuizGenerator = () => {



    
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState('')

    const newInfo = useRef([])
    const questionsArr = useRef([])
    const docsRef = useRef([])

   

   
    

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
        if(noQuizAuth && noBundleAuth && noVideoAuth) {
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
        const reference = ref(storage, `images/Mock Exam.png`)
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

    const [getScore, setGetScore] = useRecoilState(score)
    const [getClicks, setGetClicks] = useRecoilState(clicks)
    const [getQuizzes, setGetQuizzes] = useRecoilState(quiztopics)
    const [finish, setFinish] = useState(false)


    

    useEffect(() => {

     

        const getDocuments = async() => {

          setGetScore(0)
          setGetClicks(0)
  
          const docs = query(collection(db, 'Quizzes'))
          const snapshot = await getDocs(docs)
          const tempArr = []
          
        

  
          snapshot.forEach((doc) => {
            

            doc.data().Questions.map((question) => {
              
              if (getQuizzes.includes(doc.id)) 
             
             
              tempArr.push({idp: doc.id ,Question: question.Question, Answer: question.Answer.Answer, Choices: shuffleArray(question.Choices), Summary: question.Answer.Summary
              })})

              

          
           
              

            questionsArr.current = shuffleArray(tempArr)

           newInfo.current = questionsArr.current.slice(0,50)

            

            
          })

          
  
        }
  
        getDocuments()

        
  
      }, [])


      

    const handleLogout = async() => {
      
      const docRef = await doc(db, "Users1", auth?.currentUser?.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {

        await signOut(auth)
        
       }
      
    }

    // timer

    let [timer, setTimer] = useState(85)

    useEffect(() => {
        const interval = setInterval(() => {
          if(timer >= 0) {
            setTimer(timer--)
          }
        }, 30000)

        return () => {
          clearInterval(interval)
        }

        interval()
    }, [timer])


    const StyledFab = styled(Fab)({
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    });

   

   

   

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
          <Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>
          <HomeIcon onClick = {() => navigate('/dashboard')}/>

          <CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={image}       
      />

            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
            Mock Exam
            </Typography>

           


            <Typography variant="h5" align="center" color="text.secondary" paragraph>
             This section is to break you away from seeing the flashcards in the same order. Which gives you a more test like feeling for what the exam will be like
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => navigate('/selectquiz')} variant="outlined">Go Back</Button>
              <Button onClick={handleLogout} variant="contained"><Logout/></Button>
              
            </Stack>
            </Card>
          </Container>
          
        </Box>




{/* new grid system */}


{!newInfo.current.length && 

<Container maxWidth = 'sm'>



<Card
    

elevation={10}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
  style = {{ cursor:'pointer'}}
  
>
  
 
 <CardContent sx={{ flexGrow: 1 }}>

  <Typography paddingTop={7}  align='center' color = 'text.secondary'>

  <Lock sx={{fontSize:'80px'}} />
  
  </Typography>


    
    
    <Typography  color= 'text.secondary' variant='h3' align = 'center' paddingBottom={10}>

      
   
  Preparing Exam...
   
    </Typography>
   
  </CardContent>
 
 
 
</Card>

</Container>

}

{(timer != 0 && !finish) && <Container sx={{ py: 8 }} maxWidth="md">
 
  <Container style = {{display: 'flex', justifyContent: 'flex-end'}}>

  <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, display: 'flex', justifyContent: 'flex-end', width: '200px', marginRight: '10px', marginBottom: '10px',paddingTop: '5px', borderRadius: '25px' }}>

   

    <Typography align='center'  variant = 'h6' gutterBottom><AccessTime style = {{fontSize: '40px'}}/><span className='blink_me'>:</span> {timer} min</Typography>
    
         
        
      </AppBar>


  </Container>

    <Grid container spacing={4}>
      
     
    {newInfo?.current?.map((question, i) => (

<GeneratedQuizCard key={i} number = {i + 1} question = {question?.Question} answer = {question?.Answer} choices = {question?.Choices}  summary = {question?.Summary} id  = {question?.idp}/>

))}
<Container  style = {{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>

<Button onClick = {() => setFinish(true)} variant = 'contained' disabled = {getClicks < newInfo.current.length}>Finish</Button>
</Container>
    </Grid>
  </Container>
}


{/* Old grid system */}
   
{ finish &&

<Container maxWidth = 'sm'>



<Card
    

elevation={10}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
  style = {{height: '300px', cursor:'pointer'}}
  
>
  
 
 <CardContent sx={{ flexGrow: 1 }}>
    
    <Typography gutterBottom paddingBottom = '50px' variant="body1" component="h4" align='center' justifyContent = 'center' style={{color: '#5885AF'}}>{timer === 0 && 'No more time remaining'} {getClicks === newInfo.current.length &&'Test Results Below'}</Typography>
    
    <Typography  color= 'text.secondary' variant='h3' align = 'center' paddingBottom={10}>
   
    Score: {Math.round((getScore/newInfo.current.length) * 100)}%
    
   
    </Typography>
    <Container align = 'center'>

    <Button variant='outlined' onClick={() => navigate('/selectquiz')}>Select different topics</Button>


    </Container>
  </CardContent>
 
 
 
</Card>

</Container>

}



</Grid>


    
  )
}

export default QuizGenerator