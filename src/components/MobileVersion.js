import {Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-react';
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from "../components/SignUp"
import Dashboard from "../components/Dashboard"
import LogIn from "../components/LogIn"
import PrivateRoute from '../components/PrivateRoute'
import ForgotPassword from "../components/ForgotPassword"
import UpdateProfile from "../components/UpdateProfile"
import NotificationsPage from "../components/NotificationsPage"
import Images from "../components/Images"
import ImageUploader from "../components/ImageUploader"
import Note from "../components/Note"
import MainPage from "../components/MainPage"
import New from "../components/New"
import StartAppNav from "../components/StartAppNav"

function MobileVersion () {
    return (
        <Grid 
          columns = {1}
          stackable 
          centered
          vertical
          id = "AppId">
            <div>
              <Router>
                {/* <StartAppNav /> */}
                <AuthProvider>
                  <Routes>
                    <Route path = "/login" element = {<Dashboard/>} />
                    <Route path = '/' element = {<PrivateRoute/>} >
                      <Route exact = {true} path = '/' element = {<MainPage/>} />
                    </Route>
                    <Route path = '/update-profile' element = {<UpdateProfile/>} />
                    <Route path = "/signup" element = {<SignUp/> } />
                    <Route path = "/login"element = {<LogIn/>} />
                    <Route path = "/forgot-password" element = {<ForgotPassword/>} />
                    <Route path = "/note" element = {<Note/>} />
                    <Route path = "/mainpage" element = {<MainPage/>} />
                    <Route path = "/new" element = {<New/>}/>
                    <Route path = "/update-profile" element = {<UpdateProfile/>} />
                    <Route path = "/notifications-page" element = {<NotificationsPage/>} />
                    <Route path = "/images" element = {<Images/>} />
                    <Route path = "/image-uploader" element = {<ImageUploader/>} />
                  </Routes>
                </AuthProvider>
              </Router>
            </div>
        </Grid>
    )
}

export default MobileVersion;
