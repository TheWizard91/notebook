import React, {useState,useEffect,useRef} from 'react'
import {useAuth, logout} from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import {Card,Icon,Image,Button,Grid,Segment} from "semantic-ui-react"
import realtimeDB from '../firebase/realtimeDatabase';
import UpdateProfile from "./UpdateProfile"

function Dashboard() {

  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()
  const [password,setPassword] = useState()
  const [profileImage,setProfileImage] = useState()
  const [email,setEmail] = useState()
  const [error,setError]=useState("")
  const [dataFromRealTimeDatabase,setDataFromRealTimeDatabase] = useState({dataFromRealTimeDatabase:[]}) 
  const {currentUser, logout} = useAuth()
  const [currentUserUID,] = useState(currentUser.uid)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    realtimeDB.ref(currentUserUID)
    .get()
    .then((snapshot) => {
      if(snapshot.exists()) {
        let firstname = snapshot.val().firstName
        let lastname = snapshot.val().lastName
        let password = snapshot.val().password
        let profileImage = snapshot.val().profileImage
        let email = snapshot.val().email
        setFirstname(firstname)
        setLastname(lastname)
        setPassword(password)
        setProfileImage(profileImage)
        setEmail(email)
      } else {
        console.log("No data available")
      }
    }).catch((error) => {
      console.error(error)
    })
  })

  async function handleLogOut () {
    setError("")
    setLoading(true)
    try{
      navigate("/update-profile")
    } catch {
      setError("failed to log oumint")
    }
    setLoading(false)
  }

  return (
    <div id="dashboard" style={{height:"800px",paddingTop:"5%"}}>
      <center>
        <Card color="blue" style={{width:"firContent",height:"fitContent"}}>
          <Image 
            className = "ui circular big centered image"
            floated = "center"
            size = "big"
            src = {profileImage}
            wrapped ui = {false}/>
          <Card.Content>
            <Grid.Column>
              <Grid.Row style={{display:"block"}}><strong>Firstname: </strong> {firstname}</Grid.Row> 
              <Grid.Row style={{display:"block"}}><strong>Lastname: </strong> {lastname}</Grid.Row>
              <Grid.Row style={{display:"block"}}><strong>Email: </strong> {email}</Grid.Row> 
              <Grid.Row style={{display:"block"}}><strong>Password: </strong> {password}</Grid.Row>
            </Grid.Column>
          </Card.Content>
          <Card.Content extra>
            <Button 
              variant = "link" 
              className = "ui blue button"
              onClick = { handleLogOut }
              data-tooltip = "Update to database." 
              data-position = "top center"
              style = {{width:"fitContent"}}
              color = "blue"
              >
                Update Profile
              </Button>
          </Card.Content>
        </Card>
      </center>
    </div>
  )
}

export default Dashboard