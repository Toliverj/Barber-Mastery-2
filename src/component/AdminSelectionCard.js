import React, { useState } from 'react'
import { adminCardStyle, cardStyle } from './QuizSelectionCss'
import { CardActionArea, CardContent, Typography, Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AdminSelectionCard = ({card}) => {
    const [clicked, setClicked] = useState(false)

    const navigate = useNavigate()

  return (
    
        <Card style = {adminCardStyle} sx={{ maxWidth: 345 }} elevation = {10}>
<CardActionArea>
  {/* <CardMedia
    component="img"
    height="140"
    image="/static/images/cards/contemplative-reptile.jpg"
    alt="green iguana"
  /> */}
  <CardContent >
    <Typography align='center' gutterBottom variant="h2" component="div">
      Quiz
    </Typography>
    <Typography align = 'center' variant="h3" color="text.secondary">
    {card}
    </Typography>
  </CardContent>
</CardActionArea>
</Card>
    
  )
}

export default AdminSelectionCard