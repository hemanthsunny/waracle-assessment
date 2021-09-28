import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'

// Importing toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  render () {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Routes />
        </Router>
      </div>
    )
  }
}

export default App
