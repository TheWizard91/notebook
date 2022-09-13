import React, {useState} from 'react'
import {Card, Button, Alert} from "react-bootstrap"
import {useAuth, logout} from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"

function Dashboard() {

  const [error,setError]=useState("")
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()

  async function handleLogOut () {
    setError("")

    try{
      navigate("/login")
      await logout()
      // navigate("/login")
      alert("Email: "+currentUser.email+" logged out")
    } catch {
      setError("failed to log out")
    }
  }
  return (
    <div>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>Log Out</Button>
      </div>
    </div>
  )
}

export default Dashboard