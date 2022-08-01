import { async } from '@firebase/util'
import { Box, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {Button} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../firebase'
import QuizGeneratorCard from './QuizGeneratorCard'
import QuizSelectionCard from './QuizSelectionCard'
import HomeIcon from '@mui/icons-material/Home';

const AdminInput = () => {

  const navigate = useNavigate()

  const {id} = useParams()

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [choice1, setChoice1] = useState('')
  const [choice2, setChoice2] = useState('')
  const [choice3, setChoice3] = useState('')
  const [choice4, setChoice4] = useState('')
  const [summary1, setSummary1] = useState('')
  const [summary2, setSummary2] = useState('')
  const [summary3, setSummary3] = useState('')

  useEffect(() => {
    const getDocuments = async() => {

      const docRef = doc(db, "Quizzes", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        
        
      } 

      

      

    }

    getDocuments()
  }, [])



  useEffect(() => {
    const adminRef = doc(db, 'Users', 'Admin')
   
      

      getDoc(adminRef)
      .then((docu) => {
        console.log(auth.currentUser.uid, 'current user')
        console.log(docu.data().id, 'admin field')

        if(auth.currentUser.uid !== docu.data().id)
        {
          navigate('/dashboard')
        }
      })
  }, [])

  const addQuestion = async() => {

    const docRef = doc(db, "Quizzes", id);

await updateDoc(docRef, {

  Questions: arrayUnion({
    Question: question,
    Choices: [choice1,choice2,choice3,choice4],
    Answer: {
      Answer: answer,
      Summary: [summary1, summary2, summary3]
    }
  })


 
});
  
      

console.log('Successful')
setQuestion('')
setAnswer('')
setChoice1('')
setChoice2('')
setChoice3('')
setChoice4('')
setSummary1('')
setSummary2('')
setSummary3('')



    
  }

  const array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,]
  const [clicked, setClicked] = useState(false)
  
  const [quizzes, setQuizzes] = useState([])




  const [noVideoAuth, setNoVideoAuth] = useState(false)
  const [noQuizAuth, setNoQuizAuth] = useState(false)
  const [noBundleAuth, setNoBundleAuth] = useState(false)




  useEffect(() => {


    const videoRef = doc(db, 'Users', 'Video Pack')
    const bundleRef = doc(db, 'Users', 'Bundle Pack')
    const quizRef = doc(db, 'Users', 'Quiz Pack')

    

  getDoc(videoRef)
  .then((docu) => {

    if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
      setNoVideoAuth(true)
    }

    
  })

  getDoc(bundleRef)
  .then((docu) => {

    if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
      
      setNoBundleAuth(true)
     
    }
   
  })

  getDoc(quizRef)
  .then((docu) => {

    if(!(docu.data().id.includes(auth?.currentUser?.uid))) {
      setNoQuizAuth(true)
      if(noQuizAuth && noBundleAuth) {
        navigate('/dashboard')
      }
      
    }
    

  })



    const monitorAuthState = async() => {

     

      onAuthStateChanged(auth, user => {
        if (!user) {
          navigate('/')
        }
      })
    }

    monitorAuthState()

  }, [noBundleAuth, noQuizAuth, noVideoAuth])


  


  const logout = async() => {
    const docRef = await doc(db, "Users1", auth.currentUser.uid);
      var answer = window.confirm(`Are you sure you want to sign out?`);
       if (answer) {

        setDoc(docRef, {Session: 0})
        await signOut(auth)
        
        
        
       }
  }

  useEffect(() => {

    const getDocuments = async() => {

      const docs = query(collection(db, 'Quizzes'))
      const snapshot = await getDocs(docs)
      const tempArr = []
      

      snapshot.forEach((doc) => {
        
      

        tempArr.push(doc.id)
        setQuizzes(tempArr)
        
      })

      

      

    }

    getDocuments()

  }, [])

  
  return (

    


    
    <div>


    {/* input */}

    <Grid item>
      

      <Box
          sx={{
           
            pt: 8,
           
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          <HomeIcon onClick = {() => navigate('/dashboard')}/>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Edit 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>

           {id}

             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              <Button  disabled = {noQuizAuth && noBundleAuth} onClick={() => navigate('/quizselection')} variant="outlined">Written</Button>
              <Button disabled = {noVideoAuth && noBundleAuth} onClick={() => navigate('/videoselection')} variant="outlined">Practical</Button>
              <Button onClick={logout} variant="contained">Sign Out</Button>
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

</Grid>

{/* Q & A */}


<Grid item>
      

      <Box
          sx={{
           
            pt: 6,
            
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Question & Answer 
            </Typography>
           
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >


<TextField
          required
          id="outlined-required"
          value={question}
          onChange = {(e) => setQuestion(e.target.value)}
          label="Question"
          
         
        />
        <TextField
          required
          id="outlined-required"
          value={answer}
          onChange = {(e) => setAnswer(e.target.value)}
          label="Answer"
          
          
        />

              
              
              
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

</Grid>

{/* Choices */}


<Grid item>
      

      <Box
          sx={{
           
            pt: 6,
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Answer Choices
            </Typography>

              <Typography variant="h6" align="center" color="text.secondary" paragraph>

                  Copy the answer from above & paste it in a random choice box

  
               </Typography>
           
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >


<TextField
          required
          id="outlined-required"
          label="Choice 1"
          value={choice1}
          onChange = {(e) => setChoice1(e.target.value)}
          
        />
        <TextField
          required
          id="outlined-required"
          label="Choice 2"
          value={choice2}
          onChange = {(e) => setChoice2(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Choice 3"
          value={choice3}
          onChange = {(e) => setChoice3(e.target.value)}
     
        />
        <TextField
          required
          id="outlined-required"
          label="Choice 4"
          value={choice4}
          onChange = {(e) => setChoice4(e.target.value)}
     
        />
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

</Grid>


{/* Summaries */}


<Grid item>
      

      <Box
          sx={{
           
           
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="md">
          <Card elevation={10} style = {{padding: '40px', borderRadius: '10px'}}>
          
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
                Summaries
            </Typography>

              <Typography variant="h6" align="center" color="text.secondary" paragraph>

                  Extra details about the answer

  
               </Typography>
           
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >


<TextField
          required
          id="outlined-required"
          label="Summary 1"
          value={summary1}
          onChange = {(e) => setSummary1(e.target.value)}
     
        />
        <TextField
          required
          id="outlined-required"
          label="Summary 2"
          value={summary2}
          onChange = {(e) => setSummary2(e.target.value)}
     
        />
        <TextField
          required
          id="outlined-required"
          label="Summary 3"
          value={summary3}
          onChange = {(e) => setSummary3(e.target.value)}
     
        />
              
            </Stack>
            </Card>
          </Container>
          
        </Box>

       

</Grid>

{/* Button */}
<Grid item>
      

      <Box
          sx={{
           
           
            pb: 6,
            
          }}
          
        >




          <Container maxWidth="md">
          
          
           
                
           
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

<Button variant='outlined' onClick={addQuestion}>Add Question</Button>

              
            </Stack>
          
          </Container>
          
        </Box>

       

</Grid>

<Container>
         
        </Container>

      
      
    </div>
  )
}

export default AdminInput