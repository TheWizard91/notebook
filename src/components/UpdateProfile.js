
import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import db from "../firebase/firestore"

export default function UpdateProfile() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  const [ usersData, setUsersData ] = useState([]);
  const [ dataIdToBeUpdated, setDataIdToBeUpdated ] = useState("");

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    // db.collection("Users").doc(dataIdToBeUpdated).update({
    //   firstName: firstNameRef.current.value,
    //   lastName: lastNameRef.current.value,
    //   email: emailRef.current.value,
    //   password: currentUser.password
    // })
    // setDataIdToBeUpdated("");

    Promise.all(promises)
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })

    // setDataIdToBeUpdated("");

  }

  // const handleChange = (e) => {
  //   e.preventDefault()
  //   db.collection("Users").add({
  //     firstName: firstNameRef.current.value,
  //     lastName: lastNameRef.current.value
  //   })
  // }

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          console.log(doc.is, " => ", doc.data());
          data.push(doc.data());
        })
        setUsersData(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [])

  // const updateData = (e) => {
  //   e.preventDefault()
  //   db.collection("Users").doc(dataIdToBeUpdated).update({
  //     firstName: firstNameRef.current.value,
  //     lastName: lastNameRef.current.value,
  //     email: emailRef.current.value,
  //     password: currentUser.password
  //   })
  // }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control  type = "text"
                id =  "user-first-name"
                // onChange = { handleChange } 
                ref = { firstNameRef } 
                required 
              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type = "text" 
                ref = { lastNameRef } 
                required 
                id =  "user-first-name"
                // onChange = { handleChange } 
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type = "email" 
                ref = { emailRef } 
                defaultValue = { currentUser.email }
                required 
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                placeholder = "Leave blank to keep the same" 
                type = "password" 
                ref = { passwordRef }
              />
            </Form.Group>
            <Form.Group id = "password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control 
                placeholder = "Leave blank to keep the same" 
                type = "password" 
                ref = { passwordConfirmRef } 
              />
            </Form.Group>
            <Button 
              disabled = { loading } 
              // onClick = { handleSubmit } 
              className = "w-100" 
              type = "submit"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}

    {/* // <div>
    //     <Card>
    //         <Card.Body >
    //           <h2 className = "text-center mb-4">Notebook</h2>
              
    //           <div>
    //             <input className = "ui segment"/>
    //           </div>
    //           <Button 
    //             basic name="cloud"
    //             color = "pink"
    //             size = "big" ><i class="cloud icon"></i></Button>
              
    //         </Card.Body>
    //     </Card>
    // </div> */}