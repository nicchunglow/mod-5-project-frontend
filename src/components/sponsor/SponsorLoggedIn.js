import React, { Component } from 'react'
import SponseeCard from '../sponsee/SponseeCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponseesRequest, fetchSponseesRequestResolved } from '../../actions/sponseeActions'
import { removeSponsorLogin, deleteSponsorAccount, editSponsor } from '../../actions/sponsorActions'
import { Button, Form } from 'semantic-ui-react'
import SponsorConfirmDelete from './SponsorConfirmDelete'
import SponsorEdit from './SponsorEdit'
import SponseeModal from '../sponsee/SponseeModal'

class SponsorLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    genderSearch: "",
    ageSearch: "",
    sponsees: [],
    showWindow: false,
    confirmDelete: false,
    confirm: false,
    edit: false,
    currentSponsor: "",
    modal: false,
    modalSponsee: ""
  }


  removeLogin = () => {
    this.props.removeSponsorLogin("")
  }

  filterOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterBySearchTerms())
  }

  filterBySearchTerms = () => {
    let sponsees = this.props.sponsees.filter((sponsee) => {
      return sponsee.gender.toLowerCase() === this.state.genderSearch.toLowerCase()
    })
    let ageFilteredSponsees;
    let sponseesData = sponsees.length > 0 ? sponsees:this.props.sponsees
      ageFilteredSponsees = sponseesData.filter((sponsee) => {
        return sponsee.age == this.state.ageSearch
      })
      this.setState({
        sponsees: ageFilteredSponsees.length > 0 ? ageFilteredSponsees : sponsees
      })
  }

  confirmWindow = () => {
    this.setState({
      showWindow: !this.state.showWindow
    })
  }

  confirmDelete = () => {
    var result = window.confirm("Are you sure you want to delete your account?");
    if (result) {
      this.deleteAccount()
    }
  }

  handleEdit = () => {
    let currentSponsor = localStorage.getItem('username')
    let editSponsor = this.props.sponsors.find((sponsor)=>{
      return sponsor.username === currentSponsor
    })
    this.setState({
      currentSponsor: editSponsor,
      edit: !this.state.edit
    })
  }

  deleteAccount = () => {
    let currentSponsor = localStorage.getItem("username")
    let deleteSponsor = this.props.sponsors.find((sponsor)=>{
      debugger
      return sponsor.username === currentSponsor
    })
      this.props.deleteSponsorAccount(deleteSponsor)
  }

  openModal = (data) => {

    console.log(data)
    this.setState({
      modal: !this.state.modal,
      modalSponsee: data
    })
  }


  render(){
    let sponsees = this.state.sponsees.length > 0 ? (this.state.sponsees) : (this.props.sponsees)
    const sponseesData = sponsees.map((sponsee, index) => {
      return(
        <SponseeCard openModal={this.openModal} key={index} sponsee={sponsee} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
      )
    })
    return(
      <div>
        {this.state.modal === true
          ? <SponseeModal openModal={this.openModal} sponsee={this.state.modalSponsee}/>
          : null
        }
        <br/>
        <br/>
      <h3> Welcome Sponsor {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
      <Button className="deleteButton" onClick={this.confirmDelete}>Delete Account</Button>
      <Button className="editButton" onClick={this.handleEdit}>Edit</Button>
        <br/>
      {this.state.showWindow === true
        ? <SponsorConfirmDelete confirmDelete={this.confirmDelete}/>
        : null
      }
      {this.state.edit === false
        ? null
        : <SponsorEdit sponsor={this.state.currentSponsor} className="sponseeEdit" handleEdit={this.handleEdit}/>
      }
        <Form className="sort">
          <Form.Field>
              <label>
                gender:
                <input
                name="genderSearch"
                style={{marginLeft: 10 + "px"}}
                type="text"
                onChange={this.filterOnChange}

                value={this.state.genderSearch}
              />
              </label>
        </Form.Field>
        <Form.Field>
              <label>
                age:
                <input
                name="ageSearch"
                style={{marginLeft: 10 + "px"}}
                type="text"
                onChange={this.filterOnChange}
                value={this.state.ageSearch}
              />
              </label>
        </Form.Field>
      </Form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="sponseeDiv">
        {sponseesData}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sponsors: state.sponsorsReducer.sponsors,
    sponsees: state.sponseesReducer.sponsees,
    currentSponsee: state.sponseesReducer.sponsee,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, {fetchSponseesRequest, fetchSponseesRequestResolved, removeSponsorLogin, deleteSponsorAccount, editSponsor})(SponsorLoggedIn)
