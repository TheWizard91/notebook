import React, { useRef } from 'react';
// import logo from './logo.svg';
// import ReactDOM from 'react-dom'
import { Segment, Container } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect'
import DesktopVersion from "./components/DesktopVersion"
import MobileVersion from "./components/MobileVersion" 

function App () {
  // https://www.color-hex.com/color-palette/36287

  /**TODO: Fix sizes for mobile (i.e. Iphone Pro 12 and responsive are different!) */
  // const width_of_page = useRef(window.innerWidth);
  // const height_of_page = useRef(window.innerHeight);

  // If it is a mobile screen (width < height), then there is need to have a Grid and a column.  
  if (isMobile) { // (width_of_page.current + 400) < height_of_page.current
    return (
      <Segment style = {{ height:"100%" }}>
        <Container>
          <MobileVersion />
        </Container>
      </Segment>
    )
  } else {
    return (
      <Segment style = {{ height:"100%" }}>
        <Container>
          <DesktopVersion />
        </Container>
      </Segment>
    )
  }
}

export default App;
