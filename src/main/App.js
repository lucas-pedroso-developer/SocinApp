import React from 'react';
import Routes from './routes'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../views/custom.css'
import Navbar from '../components/navbar'
import 'toastr/build/toastr.min.js'
import 'toastr/build/toastr.css'

class App extends React.Component {
  render() {
    return(
      <>
      <Navbar />
      <div className="container">
          <Routes />
      </div>
      </>
    )
  }
}

export default App;
