import React, { useEffect, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, Grid, CardMedia, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'

const QuizSelectionCard = ({card, number}) => {
    const [clicked, setClicked] = useState(false)

    const navigate = useNavigate()

    //images

    const [image, setImage] = useState('')
   

    useEffect(() => {
      const addImage = async() => {
        const reference = ref(storage, `images/${card}.png`)
        await getDownloadURL(reference).then((x) => {
          setImage(x)
        })

      }
      addImage()
    },[])

   

  return (

<Grid item key={number} xs={12} sm={6} md={4} className='shrink-on-hover'>
                <Card

               key={number}
                
                onClick={() => navigate(`/quiz/${card}`)}
                elevation={10}
                  sx={{ height: '300px', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}
                >
                  

<CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', marginTop: '40px'}}
        image={image}
        
        
      />

                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" fontWeight='bold' component="h2" align='center'>
                      {card}
                    </Typography>
                   
                  </CardContent>
                </Card>
  </Grid>
   
          










    
  )
}

export default QuizSelectionCard