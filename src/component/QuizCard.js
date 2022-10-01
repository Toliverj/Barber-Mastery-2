// This is the basic generated flashcard for the studying section not the random quiz card which is called GeneratedQuizCard

import React, { useEffect, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, CardMedia, Grid, Container, IconButton, Button, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Bookmark, BookmarkBorder, Delete, Edit } from '@mui/icons-material'
import { arrayRemove } from 'firebase/firestore'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useSpeechSynthesis } from 'react-speech-kit'
import '../App'
import ReactCardFlip from 'react-card-flip'

const QuizCard = ({question, answer, choices, summary, number, admin, image}) => {
    const [clicked, setClicked] = useState(false)
   

    const navigate = useNavigate()
    const {speak, voices} = useSpeechSynthesis()


    
    


  

   console.log(question.replace('_', ',what'))
  

    const useVoice = () => {
  
      if(clicked == false) {
        speak({text: question.replace('_', 'blank,'), voice: voices[10]})
          
      }

      
    
      if(clicked == true) {
        speak({text: `The answer is, ${answer}.`, voice: voices[10]})
        speak({text: summary, voice: voices[10]})
      }
      
    }

    
 

  return (

    // new grid
    

    <Grid item  xs={12} sm={6} md={4}>
     <ReactCardFlip isFlipped = {clicked} flipDirection = {number % 2 == 0 ? 'horizontal' : 'vertical'}>
    <Card
   
    elevation={10}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      style = {{ height: '450px', cursor:'pointer', borderRadius: '10px'}}
      className = 'flip'
    >
      


      <Container>




  
      {/* {clicked == true && <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>} */}
      {clicked == false && <Container style = {{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  marginTop: '10px'}}> <Typography fontWeight='bold'>{number}.</Typography> <RecordVoiceOverIcon  onClick = {useVoice}/>  </Container>}

      </Container>

      

     
        
       
      
      <CardContent sx={{ flexGrow: 1 }} onClick={() => setClicked(!clicked)}>

      

     
  
        
        
        {clicked == false && (<Typography fontSize = '18px' gutterBottom  variant="body1" component="h4" align='center' fontWeight='bold' justifyContent = 'center' style={{color: '#5885AF', display: 'grid', placeItems: 'center', height: '100%'}}>{question}</Typography>) }
        
        
       
       
      </CardContent>
    </Card>
    <Card
   
    elevation={10}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      style = {{ height: '450px', cursor:'pointer', borderRadius: '10px'}}
      className = 'flip'
    >
      


      
  
      <Container>


  
      {clicked == true && <Container style = {{display: 'flex', alignItems: 'center', justifyContent: 'space-between',  marginTop: '10px'}}> <Typography fontWeight={'bold'}>{number}.</Typography> <RecordVoiceOverIcon  onClick = {useVoice}/>  </Container>}
      {/* {clicked == false &&  <RecordVoiceOverIcon style = {{color: '#bebebe', marginTop: '10px'}} onClick = {useVoice}/>} */}

      </Container>


      
      

     
        
       
      
      <CardContent sx={{ flexGrow: 1 }} onClick={() => setClicked(!clicked)}>

      

     
  
        

        {clicked == true &&  (<><Typography fontSize={'20px'}  gutterBottom fontWeight='bold' paddingBottom = '5px' variant="body1" component="h4" align='center' justifyContent = 'center'><span style={{color: '#76B947'}}>Answer: </span>{answer}</Typography></>)}
        
        
        

        {clicked == true && 
        (summary.map((ans, i) => (
          <Box key={i} m = {1}> <Typography align='center' fontSize={'18px'}>{ans}</Typography></Box>
        )))
        }

        

        
       
      </CardContent>
    </Card>
    </ReactCardFlip>
</Grid>



    
  )
}

export default QuizCard