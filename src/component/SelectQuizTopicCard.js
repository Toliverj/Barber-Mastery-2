import React, { useEffect, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, Grid, CardMedia, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { useRecoilState } from 'recoil'
import { quiztopics } from '../atoms'
import '../App.css'
import { Check } from '@mui/icons-material'

const SelectQuizTopicCard = ({card}) => {
    const [clicked, setClicked] = useState(false)

    const navigate = useNavigate()

    //images

    const [image, setImage] = useState('')
    let [selectQuiz, setSelectQuiz] = useRecoilState(quiztopics)
   

    useEffect(() => {
      const addImage = async() => {
        const reference = ref(storage, `images/${card}.png`)
        await getDownloadURL(reference).then((x) => {
          setImage(x)
        })

      }
      addImage()
    },[])

    

    const addQuiz = () => {
        if(!selectQuiz.includes(card)) {
            setSelectQuiz([...selectQuiz, card])
        }
        else if(selectQuiz.includes(card)) {
            const index = selectQuiz.findIndex((topic) => topic === card)

            
                 setSelectQuiz( prev => prev.filter(topic => topic !== card))
            
        }
    }

   

  return (

<Grid item key={card} xs={12} sm={6} md={4} className='shrink-on-hover'>
                <Card

                style={ selectQuiz.includes(card) ? {backgroundColor: '#FFB6C1'} : null}


               key={card}
                
                onClick={addQuiz}
                elevation={10}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
                >
                  <Box display={'flex'} justifyContent = 'flex-end' alignItems={'center'} padding={'5px 10px 0 0'} borderRadius={'10px'}>
                    <Typography color={localStorage.getItem(card) >= 90 && 'green' || localStorage.getItem(card) < 90 && localStorage.getItem(card) > 60 && '#ffba01' || localStorage.getItem(card) < 70 && 'red' }  variant = 'h3'>•</Typography>
                  <Typography padding={'20px'}   align = 'right'>{localStorage.getItem(card)} %</Typography>
                  </Box>

<CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', marginTop: '40px'}}
        image={image}
        
        
      />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                  
                    <Typography gutterBottom variant="h5" fontWeight={'bold'} component="h2" align='center'>
                      {card}
                    </Typography>

                    
                   
                  </CardContent>
                </Card>
  </Grid>
   
          










    
  )
}

export default SelectQuizTopicCard