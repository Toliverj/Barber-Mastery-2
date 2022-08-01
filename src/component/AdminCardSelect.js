import React, { useEffect, useState } from 'react'
import { cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card, Grid, CardMedia, TextField, Button, Stack, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import { db, storage } from '../firebase'

import { Delete, DeleteForever } from '@mui/icons-material'
import Badge from '@mui/material/Badge'
import { deleteDoc, doc } from 'firebase/firestore'


const AdminCardSelect = ({card}) => {
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

    

    const removeDoc = async() => {

       // alert('Are you sure?')

       var answer = window.confirm(`Remove ${card}?`);
       if (answer) {
        await deleteDoc(doc(db, 'Quizzes', card))
        window.location.reload()
       }
       else {
           //some code
       }
            
           
    }

   

  return (

<Grid item key={card} xs={12} sm={6} md={4} className='shrink-on-hover'>

 
    
                <Card

               key={card}
                
                
                elevation={10}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <Badge onClick = {removeDoc}  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}>

    
                <Delete />
                            
                        </Badge>

<CardMedia
        component="img"
        height="140"
        style={{objectFit: 'contain', paddingTop: '30px'}}
        image={image}
        onClick={() => navigate(`/admin/${card}`)}
        
      />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" align='center'>
                      {card}
                    </Typography>
                   
                  </CardContent>
                </Card>
  </Grid>
    
  )
}

export default AdminCardSelect