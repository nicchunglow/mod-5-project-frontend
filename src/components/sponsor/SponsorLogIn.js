import React, { Component } from 'react'
import SponsorSignUp from './SponsorSignUp'
import { connect } from 'react-redux';
import { loginSponsor } from '../../actions/sponsorActions'
import { Button, Checkbox, Form} from 'semantic-ui-react'

class SponsorLogIn extends Component {

  state = {
    username: "",
    password: "",
    local: false,
    clicked: false,
    error: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clicked = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("jwt")
    let sponsor = {username: this.state.username, password: this.state.password}
    this.props.loginSponsor(sponsor)
    this.afterSubmit(sponsor)
  }

  afterSubmit = (sponsor) => {
    this.setLocalStorage(sponsor)
  }

  setLocalStorage = (data) => {

    localStorage.setItem('jwt', data.jwt)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', "sponsor")
    this.setStateAfterLocal()
  }

  setStateAfterLocal = () => {

    this.setState({
      username: '',
      password: ''
    }, () => {this.sendState()})
  }


  sendState = () => {
    this.setState({
      local: true
    }, () => {this.props.submit(this.state.local)})
  }

  setClicked = (data) => {
    this.setState({
      clicked: data
    })
  }

  render(){
    return(
      <div>
      <br/>
    <br/>
  <br/>
    <br/>
  <br/>
<h3> Please Login Sponsor </h3>
      <Form onSubmit={this.handleSubmit}>
        {this.state.error === true
          ? <h4>Sponsee not found</h4>
          : null
        }
  <Form.Field>
    <label>Username</label>
  <input placeholder='Username' name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required/>
  </Form.Field>
  <Form.Field>
    <label>Password</label>
  <input placeholder='Password' name="password" type="password" value={this.state.password} onChange={this.handleOnChange} required/>
  </Form.Field>
  <Button type='submit'>Submit</Button>
</Form>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
    { this.state.clicked === true
      ? <div><h3 className="backH3">Bla</h3>
      <Button onClick={this.clicked}>back</Button></div>
      : <div><h3> Don't have an account?</h3>
      <Button onClick={this.clicked}>Sign Up</Button>
      </div>
    }
      { this.state.clicked === true
        ? <SponsorSignUp submit={this.props.submit} clicked={this.setClicked}/>
        : null
      }
      </div>
    )
  }
}



export default connect(null, {loginSponsor})(SponsorLogIn)
