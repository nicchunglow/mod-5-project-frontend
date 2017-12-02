import React, { Component } from 'react'
import { Form, Button, Dropdown, Icon } from 'semantic-ui-react'
import { addSponseeReview } from '../../actions/reviewActions'
import { connect } from 'react-redux'
import { getCurrentSponsee, removeCurrentSponsee } from '../../actions/sponseeActions'

class SponseeReview extends Component {

  state = {
    rating: 1,
    body: "",
    facility_id: ""
  }

  componentDidMount = () => {
    debugger
    const username = localStorage.getItem("username")
    this.props.getCurrentSponsee(username)
  }

  handleOnChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleDropChange = (event) => {
    debugger
    //debugger
    this.setState({
      rating: parseInt(event.target.innerText)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const sponseeReview = {sponsee_id: this.props.currentSponsee.id, rating: this.state.rating, body: this.state.body, facility_id: this.props.facilityId}
    this.props.addSponseeReview(sponseeReview)
    this.props.reviewClicked()
    this.props.showReviews()
    this.props.submittedModal()
  }

  changeStarColor = (event) => {
    debugger
    console.log(console.log(event.target.style.color))
    if (event.target.style.color === "gold"){
      debugger
      event.target.style.color = "white"
    } else if (event.target.style.color === "white"){
      debugger
      event.target.style.color = "gold"
    }
    this.countYellowStars()
  }

  countYellowStars = () => {
    debugger
    const arr = []
    let stars = document.getElementsByClassName("star")
    for (let i = 0; i < stars.length; i++){
      arr.push(stars[i].style.color)
    }
    let yellowStars = arr.filter((color)=>{
      return color === "gold"
    })
    console.log(yellowStars)

    this.setState({
      rating: yellowStars.length
    })
  }

  render(){

    return(

      <div className="sponsorReview">

        <Form className="sponsorReviewForm" onSubmit={this.handleSubmit}>
          <Icon className="close" size="large" style={{color: 'red', marginLeft: '95%'}}onClick={this.props.reviewClicked}/>
        <h3>{localStorage.getItem("username")}'s Review</h3>
        <div>
        rating: <span className="star" id="star1" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onClick={this.changeStarColor}>&#9733;</span>
        <span className="star" id="star2" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onClick={this.changeStarColor}>&#9733;</span><span className="star" id="star3" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onClick={this.changeStarColor}>&#9733;</span><span className="star" id="star3" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onClick={this.changeStarColor}>&#9733;</span><span className="star" id="star3" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onClick={this.changeStarColor}>&#9733;</span>
      </div>

      <Form.TextArea className="reviewTextArea" placeholder="write a review" name="body" type="text" value={this.state.body} onChange={this.handleOnChange} required>
        </Form.TextArea>
        <Button className="submitButton" type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, { addSponseeReview, getCurrentSponsee, removeCurrentSponsee })(SponseeReview)
