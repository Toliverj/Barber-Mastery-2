import { Box, Button, Card, CircularProgress, Container, Grid, IconButton, Modal, Stack, styled, Typography } from '@mui/material'
import { deleteUser, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import LogoutIcon from '@mui/icons-material/Logout';
import { AccountCircle, Home } from '@mui/icons-material'
import { collection, getDocs, query } from 'firebase/firestore'
import { useState } from 'react'


const AccountPage = () => {

    const navigate = useNavigate()

    const logout = async() => {
     
      await signOut(auth) 

    
  }


    useEffect(() => {  
  
        const monitorAuthState = async() => {
  
  
  
          onAuthStateChanged(auth, user => {
            if (!user) {
              navigate('/')
            }
            
           
          })
        }
  
        monitorAuthState()
  
      }, [auth ])

      const [isLoading, setIsLoading] = useState(false)

      const removeAccount = async() => {
      

        try {

          setIsLoading(true)

            //add firebase deleteUser()

            const response = await fetch('https://barber-mastery-subscription.herokuapp.com/delete', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
               id: localStorage.getItem('barberMasterycustomerID')
              }),
            })

            if (!response) return alert('Cancellation failed')
            localStorage.removeItem('barberMasterycustomerID')
            localStorage.removeItem('email')
            localStorage.removeItem('password')
            
            const docs = query(collection(db, 'Quizzes'))
        const snapshot = await getDocs(docs)
        const tempArr = []
        

        snapshot.forEach((doc) => {

            localStorage.removeItem(doc.id)
          
        })
        
            deleteUser(auth.currentUser).then(() => console.log('user deleted'))
            
            
            //navigate('/')
            
           
          } catch (err) {
            console.error(err);
            alert("Payment failed! " + err.message);
          }

    setIsLoading(false)
       
      }

      const [modalOpen, setModalOpen] = React.useState(false)
      const [modalOpen2, setModalOpen2] = React.useState(false)

const StyledModal = styled(Modal) ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

    
  return (
    <Container maxWidth="lg" sx = {{marginTop: 20}}>
       
       <StyledModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Card sx = {{width: 400, height: 150, padding: 2}}   bgcolor={'background.default'} color = {'text.primary'} p = {3} borderRadius = {5} >
    <Typography color={'Gray'} pb={2} id="modal-modal-title" align='center' variant="h6" component="h2">
        Are you sure you want to sign out?
    </Typography>
   
    <Box  display = 'flex' flexDirection= 'row' alignItems= 'center' justifyContent={'center'} >
    <Button sx = {{marginRight: 3, backgroundColor: 'red'}} onClick={logout} variant = 'contained'>Sign Out</Button>
    <Button onClick={() => setModalOpen(false)} variant = 'contained'>Cancel</Button>
  
    </Box>

   
   
    
  </Card>
</StyledModal>
       <StyledModal
  open={modalOpen2}
  onClose={() => setModalOpen2(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Card sx = {{width: 400, height: 175, padding: 2}}   bgcolor={'background.default'} color = {'text.primary'} p = {3} borderRadius = {5} >
    
      {!isLoading ? <Typography color={'Gray'} pb={2} id="modal-modal-title" align='center' variant="h6" component="h2">Are you sure you want to cancel your subscription? <b style = {{color: 'black'}}>THIS ACTION CANNOT BE UNDONE.</b>
    </Typography> : <CircularProgress/> }
        
   
    <Box  display = 'flex' flexDirection= 'row' alignItems= 'center' justifyContent={'center'} >
    <Button sx = {{marginRight: 3, backgroundColor: '#FF4D4D'}} onClick={removeAccount} variant = 'contained'>Cancel Subscription</Button>
    <Button onClick={() => setModalOpen2(false)} variant = 'contained'>Cancel</Button>
  
    </Box>

   
   
    
  </Card>
</StyledModal>

        
    <Card elevation={10} style = {{padding:'40px 0', borderRadius: '10px'}}>

    <Box display={'flex'} justifyContent = 'flex-end' padding={'0 10px'}>
              <IconButton>

              <Home  onClick = {() => navigate('/dashboard')}/>

              </IconButton>
              <IconButton>

          <AccountCircle onClick = {() => navigate('/accountpage')}/>

              </IconButton>
              <IconButton>

         

              </IconButton>
            

            </Box>
    

     
      <Typography
        component="h1"
        variant="h2"
        align="center"
        justifyContent= 'center'
        color="text.primary"
        fontWeight='bold'
        gutterBottom
      >
          Manage Subscription
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" fontWeight='500' paragraph>

      Signed in as: {auth?.currentUser?.email}

       
      </Typography>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >



        
        <Button onClick = {() =>setModalOpen(true)} variant="contained"> Sign out</Button>
        <Button onClick = {() => setModalOpen2(true)} variant="contained" sx = {{backgroundColor:'#FF4D4D', "&:hover": { backgroundColor: "#FF4D4D" }}}  >Cancel Subscription</Button>
        
        
        
        
      </Stack>
      </Card>
    
      
    </Container>
    
  
  )
}

export default AccountPage