// This is the basic generated flashcard for the studying section not the random quiz card which is called GeneratedQuizCard

import React, { useEffect, useRef, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, CardMedia, Grid, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { useRecoilState } from 'recoil'
import {clicks, score} from '../atoms'
import { Check, Clear } from '@mui/icons-material'
import '../App.css'
import ClearIcon from '@mui/icons-material/Clear';
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'


const GeneratedQuizCard = ({id, question, answer, choices, summary, picture, number}) => {
    const [clicked, setClicked] = useState(false)
    const [getClicks, setGetClicks] = useRecoilState(clicks)
    const [clickedChoice,setClickedChoice] = useState('')
    const isCorrect = useRef(0)

     //images

     const [image, setImage] = useState('')
   

     useEffect(() => {
       const addImage = async() => {
         const reference = ref(storage, `images/${id}.png`)
         await getDownloadURL(reference).then((x) => {
           setImage(x)
         })
 
       }
       addImage()
      
     },[])

   

    const navigate = useNavigate()

   

    const checkAnswer = (ans) => {

        
       
        if (ans === answer)
        isCorrect.current++
        console.log(isCorrect.current)
    }

    //setScore

    const [quizScore, setQuizScore] = useRecoilState(score)
    const [success, setSuccess] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const [selected, setSelected] = useState('')


    const chosenAnswer = (choice) => {

        if(selected === '') {
          setSelected(choice)
        }
        else if(selected === choice) {

          setSelected('')
        }

        else if(selected) {

       

          setSelected(choice)

        }

    }
   

    const scoreFunction = (choice) => {
     // e.preventDefault()
     setGetClicks(getClicks + 1)
      
      if(choice == answer) {
          setQuizScore(quizScore+1)

          setSuccess(true)

      }
      if(choice !== answer) {
        setSuccess(false)
      }
    }

  return (

    // new grid
    

     <Grid key={question} item  xs={12} sm={6} md={4}>
     
      {success === null && 
    <Card
    
    onClick={() => setClicked(!clicked)}
    elevation={10}
      sx={{height: '460px', cursor:'pointer', display: 'flex', flexDirection: 'column', borderRadius: '10px', position: 'relative' }}
     
      
    >

      
      
     
     <CardContent sx={{ flexGrow: 1 }}>

  
     <Container style = {{paddingBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
     <Typography fontWeight={'bold'}>{number}.</Typography>
     {image && <img
            
            src={image}
            width = '30px'
            /> }

         

            

      {picture && <img
            
            src={picture}
            width = '30px'
            />}
            
            

</Container>
            
        
        <Typography fontSize = '18px' gutterBottom fontWeight={'bold'} paddingBottom = '5px'  component="h4" align='center' justifyContent = 'center' style={{color: '#5885AF'}}>{question}</Typography>
        
        
        { choices.map((choice, i) => (
           <Box className = 'clicked' style = {{padding: '5px', backgroundColor: selected === choice && '#FFB6C1' }}  onClick = {() => chosenAnswer(choice) } key={i} m = {1}> <Typography fontSize={'18px'}>{String.fromCharCode(i + 65)}) {choice.length > 0 && choice}</Typography> </Box>
         ))

        }
       
        

        <Box sx = {{position: 'absolute',bottom: 0, right: 0, padding: '0 10px 10px 0'}}>

        <Button disabled = {!selected} onClick = {() => scoreFunction(selected)} variant='contained'>Check</Button>

        </Box>

        
      </CardContent>
     
     
     
    </Card>
}

{success === false &&  

<Card
    

elevation={10}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
  style = {{height: '460px', cursor:'pointer'}}
  
>
  
 
 <CardContent sx={{ flexGrow: 1 }}>

 <Container style = {{paddingBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
     <Typography>{number}.</Typography>
     <Clear sx = {{color: 'red'}}/>
     {image && <img
            
            src={image}
            width = '30px'
            /> }

         

            

      {picture && <img
            
            src={picture}
            width = '30px'
            />}
            

</Container>
    
<Typography fontWeight={'bold'} gutterBottom paddingBottom = '5px' variant="body1" component="h4" align='center' fontSize = '18px' justifyContent = 'center' style={{color: '#5885AF'}}>Answer: {answer}</Typography>
    
   
    {summary.map((sum, i) => (
      <Box key={i} m = {1}><Typography align='center' fontSize={'18px'}>{sum}</Typography> </Box>
      ))}
    
   
    
  </CardContent>
 
 
 
</Card>

}
{success === true &&  

<Card
    

elevation={10}
  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
  style = {{height: '460px', cursor:'pointer'}}
  
>


 <CardContent sx={{ flexGrow: 1 }}>

  <Container style = {{paddingBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
     <Typography fontWeight={'bold'}>{number}.</Typography>

     <Check sx = {{color: 'green'}}/>
     {image && <img
            
            src={image}
            width = '30px'
            /> }

         

            

      {picture && <img
            
            src={picture}
            width = '30px'
            />}
            

</Container>
    
    <Typography fontWeight={'bold'} gutterBottom paddingBottom = '5px' variant="body1" component="h4" align='center' fontSize = '18px' justifyContent = 'center' style={{color: '#5885AF'}}>Answer: {answer}</Typography>
    

    {summary.map((sum,i) => (
      <Box key={i} m = {1}> <Typography align = 'center' fontSize={'18px'}>{sum}</Typography></Box>
    ))}
   

  </CardContent>
 
 
 
</Card>

}



    
</Grid>

    
  )
}

export default GeneratedQuizCard