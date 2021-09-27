import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'

// Importing toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
    // }, 2000)
  }

  render () {
    return (
      this.state.loading
        ? <div>Loading</div>
        : <div>
          <ToastContainer />
          <Router>
            <Routes />
          </Router>
        </div>
    )
  }
}

export default App
