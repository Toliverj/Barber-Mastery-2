// This is the basic generated flashcard for the studying section not the random quiz card which is called GeneratedQuizCard

import React, { useEffect, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, CardMedia, Grid, Container, IconButton, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Delete, Edit } from '@mui/icons-material'
import { arrayRemove } from 'firebase/firestore'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useSpeechSynthesis } from 'react-speech-kit'
import '../App'
import ReactCardFlip from 'react-card-flip'

const QuizCard = ({question, answer, choices, summary, number, admin, image}) => {
    const [clicked, setClicked] = useState(false)
   

    const navigate = useNavigate()
    const {speak, voices} = useSpeechSynthesis()


    useEffect(() => {
        console.log(voices)
    },[])
    


  

   
  

    const useVoice = () => {
  
      if(clicked == false) {
        speak({text: question, voice: voices[18]})
          
      }

      
    
      if(clicked == true) {
        speak({text: `The answer is, ${answer}.`, voice: voices[18]})
        speak({text: summary, voice: voices[18]})
      }
      
    }

   



  

 

  return (

    // new grid
    

    <Grid item  xs={12} sm={6} md={4}>
     <ReactCardFlip isFlipped = {clicked} flipDirection = {number % 2 == 0 ? 'horizontal' : 'vertical'}>
    <Card
   
    elevation={10}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      style = {{ height: '350px', cursor:'pointer', borderRadius: '10px'}}
      className = 'flip'
    >
      


      <Container>


  
      {/* {clicked == true && <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>} */}
      {clicked == false &&  <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>}

      </Container>

      

     
        
       
      
      <CardContent sx={{ flexGrow: 1 }} onClick={() => setClicked(!clicked)}>

      

     
  
        
        
        {clicked == false && (<Typography gutterBottom  variant="body1" component="h4" align='center' justifyContent = 'center' style={{color: '#5885AF', display: 'grid', placeItems: 'center', height: '100%'}}>{question}</Typography>) }
        
        
       
       
      </CardContent>
    </Card>
    <Card
   
    elevation={10}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      style = {{ height: '350px', cursor:'pointer', borderRadius: '10px'}}
      className = 'flip'
    >
      


      
  
      <Container>


  
      {clicked == true && <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>}
      {/* {clicked == false &&  <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>} */}

      </Container>


      
      

     
        
       
      
      <CardContent sx={{ flexGrow: 1 }} onClick={() => setClicked(!clicked)}>

      

     
  
        
        
        {clicked == true &&  (<><Typography  gutterBottom paddingBottom = '5px' variant="body1" component="h4" align='center' justifyContent = 'center'><span style={{color: '#76B947'}}>Answer: </span>{answer}</Typography></>)}
        
        
        <Typography color= 'text.secondary' variant='body2' align='center'>

        {clicked == true && 
        (summary.map((ans, i) => (
          <Box key={i} m = {1}> {ans}</Box>
        )))
        }

        </Typography>
       
      </CardContent>
    </Card>
    </ReactCardFlip>
</Grid>



    
  )
}

export default QuizCard