import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Modal, Stack, styled } from '@mui/material';

import { Paper } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage';
import { ArrowDownward, ArrowDownwardOutlined, ArrowDownwardRounded, ArrowDownwardSharp, ArrowDownwardTwoTone } from '@mui/icons-material';
import {Element as ScrollTo, Link as ScrollLink} from 'react-scroll'
import GeneratedQuizCard from './GeneratedQuizCard';
import QuizCard from './QuizCard';



const fakeQuestions = [
  {
    id: 'hello',
    question: `The study of hair is called _`,
    answer: 'Trichology',
    choices: [
      'Trichology','Histology', 'Osteology', 'Numerology'
    ],
    summary:
    [ 'Trich in greek meaks hair.' , 'Ology means the study of.',  'Trich + ology = The study of hair',],
    picture: '/images/Logo.png',
    number: 1
  }
  
 
]
const fakeFlashCard = [
  {
    id: 'hello',
    question: `The study of hair is called _  (Click to flip)`,
    answer: 'Trichology',
    choices: [
      'Choice 1','Choice 2', 'Choice 3', 'Choice 4'
    ],
    summary:
    [ 'Trich in greek meaks hair.' , 'Ology means the study of.',  'Trich + ology = The study of hair',],
    picture: '/images/Logo.png',
    number: 1
  },

  
 
]






function PricingContent() {

  const navigate = useNavigate()


const [data, setData] = useState([])


useEffect(() => {
    

  const monitorAuthState = async() => {

   

    onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/dashboard')
      }
    })
  }

  monitorAuthState()

}, [])





  useEffect(() => {

    const getDocuments = async() => {
  
      const docs = query(collection(db, 'Packages'))
      const snapshot = await getDocs(docs)
      const tempArr = []
      
      snapshot.docs.forEach(doc => tempArr.push({id: doc.id, info: doc.data().Details}))

      setData(tempArr)


  
    }
  
    getDocuments()
  
  }, [])






  const setPrice = () => {
    navigate(`signup/Bundle Pack`)
  }

  //add video

  const [image, setImage] = useState('')

useEffect(() => {
  const addImage = async() => {
    const reference = ref(storage, `images/Demo 2.png`)
    await getDownloadURL(reference).then((x) => {
     
      setImage(x)
    })

  }
  addImage()
},[])

const [modalOpen, setModalOpen] = React.useState(false)

const StyledModal = styled(Modal) ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px'
})




  return (
    <>
     <StyledModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Card sx = {{width: 450, height: 220, padding: 2}}   bgcolor={'background.default'} color = {'text.primary'} p = {3} >
    <Typography   pb={2} id="modal-modal-title" align='center' variant="h4" component="h2">
   Before signing up... 

    </Typography>
    <Typography  pb={2} id="modal-modal-title" align = 'center'  variant="h6" component="h2">
    <ul>
      <li>• Do not sign up in incognito/private mode</li>
      <li>• There is only one device per account</li>
    </ul>

    </Typography>
   
    <Box  display = 'flex' flexDirection= 'row' alignItems= 'center' justifyContent={'center'} >
    <Button sx = {{marginRight: 3}} onClick = {setPrice}  variant = 'contained'>Sign Up</Button>
    <Button sx = {{ backgroundColor: '#FF4D4D', "&:hover": { backgroundColor: "#FF4D4D" }}} onClick={() => setModalOpen(false)} variant = 'contained'>Cancel</Button>
  
    </Box>

   
   
    
  </Card>
</StyledModal>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
     
      {/* Hero unit */}
      <Box
          sx={{
           
            pt: 8,
            pb: 6,
          }}
        >



          <Container  maxWidth="lg">

           
<Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>

            <img style = {{display:'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} width={400} src='/images/transparent logo.png'/>
            
        
            <Typography  variant="h5" align="center" color="text.secondary" fontWeight={'bold'} paragraph>

            A complete study kit to help student barbers excel!
             
            </Typography>
            <ScrollLink to = 'signup_section'>
            <Typography className='shrink-on-hover' fontWeight={'bold'}  variant="h5" align="center" color="text.secondary" paragraph>

           Click here to get started <ArrowDownward style = {{border: '1px solid gray', borderRadius: '25px' }} />

             
            </Typography>
            </ScrollLink>
            <Container
        maxWidth="lg"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 2,
          py: [1, 2],
        }}
      />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              
            >

              <Button onClick={() => navigate('/signin')} variant="outlined">Login</Button>


              
              
              
              
            </Stack>



  
            </Card>
          </Container>
         
          <Container sx={{ py: 8 }} maxWidth="lg">
          <Card elevation={10} style = {{padding: '20px 10px', borderRadius: '10px'}}>

  
    <Grid container spacing={4} alignItems = 'center' justifyContent={'center'} display = 'flex' flexDirection={'row'}>
  <Grid item xs={12}>
  <Typography variant="h4" fontWeight={'bold'} align="center"  paragraph>Video Demo</Typography>
                 
                 <Typography variant = 'h5' align = 'center' fontWeight={'bold'} color ='text.secondary'>Sign up and gain access to 20 interactive study guides and videos to help you pass all barbering prerequisites! </Typography>
      
  </Grid>

  

  <video className='demoVideo' loop autoPlay playsInline muted src='/demovid.mov'/>



  
</Grid>

    </Card>
  </Container>

  <Box
        
        >


          <Container maxWidth="lg" >
          <Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontWeight={'bold'}
              gutterBottom
              
            >
               Key Features
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>

            <ul>
      <li style={{paddingBottom: '20px'}}>• Grading system to keep track of your scores</li>
      <li style={{paddingBottom: '20px'}}>• Flash cards to study before taking mock exams</li>
      <li style={{paddingBottom: '20px'}}>• Customizable mock exams that generate random quizzes</li>
      <li style={{paddingBottom: '20px'}}>• Practical tutorial videos with steps from PSI</li>
      <li style={{paddingBottom: '20px'}}>• Text to speech for auditory learning</li>
      <li style={{paddingBottom: '20px'}}>• Sign up to view more... </li>
      </ul>
   
            </Typography>
           
            </Card>
          </Container>
          
        </Box>
          <Container sx={{ py: 8 }} maxWidth="lg">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
   
    <Grid container spacing={4} alignItems = 'center' justifyContent={'center'}>
 
  
 
  
</Grid>
    <Grid container spacing={4} alignItems = 'center' justifyContent={'center'}>
  <Grid item xs={12}>
  <Typography variant="h4" fontWeight={'bold'} align="center"  paragraph>Demo</Typography>
                 
                 <Typography variant = 'h5' align = 'center' fontWeight={'bold'} color ='text.secondary'>Sign up and gain access to 20 interactive study guides and videos to help you pass all barbering prerequisites! </Typography>
      
  </Grid>
  {fakeFlashCard.map((question, i) => (
    <QuizCard question = {question.question} answer = {question.answer} choices = {question.choices} summary = {question.summary} number = {i + 1}/>
  ))}    

  

  
  {fakeQuestions.map((question, i) => (
    <GeneratedQuizCard key={i} number = {i + 1} question = {question?.question} answer = {question?.answer} choices = {question?.choices}  summary = {question?.summary} id  = {question?.id} picture = {question.picture} />
  ))}    
 
  
 
  
</Grid>

    </Card>
  </Container>
  
 
        </Box>
      {/* End hero unit */}
      <ScrollTo name='signup_section'>
      <Container maxWidth="lg" component="main">
      <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
      <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontWeight={'bold'}
              
              style={{paddingBottom: '10px'}}
            >
               Get Started Here!
            </Typography>
        <Grid container spacing={5} >
          
          {data.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.id}
              xs={12}
              sm={tier.id === 'Bundle Pack' ? 12 : 6}
              md={12}
            >
              
              <Card>
                <CardHeader
                  title={tier.id}
                  subheader={tier.info.Subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.id === 'Bundle Pack' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                      
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.info.Price/100}<span style = {{fontSize: '18px'}}>/month</span>
                    </Typography>
                  
                  </Box>
                  <ul>
                    {tier.info.Info.map((line) => (
                      <Typography
                        component="li"
                        variant="h5"
                        align="center"
                        key={line}
                        gutterBottom
                      >
                        • {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick={() =>setModalOpen(true) } fullWidth >
                    Sign Up Here!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Card>
      </Container>
      </ScrollTo>
      {/* Footer */}
    
     
      {/* End footer */}
    </>
  );
}

export default function Home() {
  return <PricingContent />;
}