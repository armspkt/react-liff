import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const liff = window.liff

class App extends Component {
  state = {
    name: '',
    qrcode: ''
  }
  componentDidMount() {
    liff.init(
      { liffId: '1638080216-G7bd69Nk' },
      async data => {
        // Now you can call LIFF API
        const userId = data.context.userId
        console.log('userId: ', userId)
        this.setState({ name: userId })
        const profile = await liff.getProfile()
        console.log('profile: ', profile)
      },
      err => {
        console.log('err: ', err)
        // LIFF initialization failed
      }
    )
  }

  sendMessage = () => {
    liff
      .sendMessages([
        {
          type: 'text',
          text: 'Hello, World!'
        }
      ])
      .then(() => {
        console.log('message sent')
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  scanCode = () => {
    liff.scanCode().then(result => {
      // e.g. result = { value: "Hello LIFF app!" }
      const stringifiedResult = JSON.stringify(result);
      this.setState({ qrcode: stringifiedResult })
    }).catch(err => {
      this.setState({ qrcode: 'scanCode failed!' })
    });
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React 
          </a>
        </header> */}
        {this.state.name}
        {this.state.qrcode}
        <br />
        <button onClick={this.sendMessage}>Send Message</button>
        <button onClick={() => liff.closeWindow()}>Close</button>
        <button onClick={this.scanCode}>Scan QRCode</button>

      </div>
    )
  }
}

export default App

// https://developers.line.biz/en/docs/liff/developing-liff-apps/#sending-messages
