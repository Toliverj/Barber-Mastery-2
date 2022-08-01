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
import { Stack } from '@mui/material';

import { Paper } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage';
import { ArrowDownward, ArrowDownwardOutlined, ArrowDownwardRounded, ArrowDownwardSharp, ArrowDownwardTwoTone } from '@mui/icons-material';
import {Element, Link as ScrollLink} from 'react-scroll'










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






  const setPrice = (pack) => {
    navigate(`signup/${pack}`)
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




  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
     
      {/* Hero unit */}
      <Box
          sx={{
            bgcolor: '#faf9f6',
            pt: 8,
            pb: 6,
          }}
        >



          <Container  maxWidth="md">

           
<Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>

            <img style = {{display:'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} width={400} src='/images/transparent logo.png'/>
            
        
            <Typography  variant="h5" align="center" color="text.secondary" paragraph>

            A complete study kit to help student barbers excel!
             
            </Typography>
            <Typography  variant="h5" align="center" color="text.secondary" paragraph>

           Get Started Today! <ScrollLink to = 'signup_section'><ArrowDownward style = {{border: '1px solid gray', borderRadius: '25px' }} className='shrink-on-hover'/></ScrollLink>

             
            </Typography>
            <Container
        maxWidth="md"
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
         
          <Container sx={{ py: 8 }} maxWidth="md">
          <Card elevation={10} style = {{padding: '20px 10px', borderRadius: '10px'}}>
    <Grid container
  spacing={0}
  direction="row"
  alignItems="center"
  justifyContent="center"
  >
     
<Grid  item  xs={12} sm={6} md={6}  >        
<Typography variant="h4" align="center" color="text.secondary" paragraph>Study Guide</Typography>
                 
               <Typography variant = 'h5' align = 'center' color ='text.secondary'>Sign up and gain access to 20 interactive study guides and videos to help you pass all barbering prerequisites! </Typography>
    
                    
  </Grid>
<Container style = {{ display: 'grid', placeItems: 'center'}} margin='auto' justifyItems = 'center' alignContent='center'  key={''} xs={12} sm={6} md={6}  >        


                 
                 <video   width={300} autoPlay playsInline loop muted src='/images/My Movie 49.mov'/>
                 

                    
  </Container>

    </Grid>
    </Card>
  </Container>
  
 
        </Box>
      {/* End hero unit */}
      <Element name='signup_section'>
      <Container maxWidth="md" component="main">
      <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
      <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              
              style={{paddingBottom: '10px'}}
            >
               Sign Up
            </Typography>
            <Typography align='center' gutterbottom variant = 'h6' color = 'red' paddingBottom='20px' className='blink_me'>*Do not sign up in incognito/private mode*</Typography>
        <Grid container spacing={5} alignItems="flex-end">
          
          {data.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.id}
              xs={12}
              sm={tier.id === 'Bundle Pack' ? 12 : 6}
              md={4}
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
                      ${tier.info.Price/100}
                    </Typography>
                  
                  </Box>
                  <ul>
                    {tier.info.Info.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        • {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick={() =>setPrice(tier.id) } fullWidth >
                    Sign Up Here!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Card>
      </Container>
      </Element>
      {/* Footer */}
      <Box
          sx={{
            bgcolor: 'FAF9F6',
            pt: 8,
            pb: 6,
          }}
        >


          <Container maxWidth="md" style={{backgroundColor: 'FAF9F6'}}>
          <Card elevation={10} style = {{padding: '20px', borderRadius: '10px'}}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              
            >
               Exam Topics
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>

            <ul>
      <li style={{paddingBottom: '20px'}}>• Licensing and Regulation (8% of questions)</li>
      <li style={{paddingBottom: '20px'}}>• Sanitation, Disinfection, Sterilization, and Safety (29% of questions)</li>
      <li style={{paddingBottom: '20px'}}>• Hair and Scalp Care (5% of questions)</li>
      <li style={{paddingBottom: '20px'}}>• Haircutting and Hairstyling (14% of questions)</li>
      <li style={{paddingBottom: '20px'}}>• Hair coloring (8% questions)</li>
      <li style={{paddingBottom: '20px'}}>• Chemical Texture Services (12% questions)</li>
      </ul>
   
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              
            </Stack>
            </Card>
          </Container>
          
        </Box>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
       
      </Container>
      {/* End footer */}
    </>
  );
}

export default function Home() {
  return <PricingContent />;
}