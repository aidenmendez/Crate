// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import { level3 } from '../../ui/common/shadows'
import { white, black, grey, grey2 } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { logout } from "./api/actions"
import { getListByUser } from '../subscription/api/actions'
import { updateUser, toggleForm } from '../user/api/actions'
import { messageShow, messageHide } from "../common/api/actions"
import { routeImage } from "../../setup/routes"
import Button from '../../ui/button'
import Card from '../../ui/card/Card'
import EmptyMessage from "../common/EmptyMessage"
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import Textarea from '../../ui/input/Textarea'

const mockProductHistory = [
  {
    id:8,
    name:"T-Shirt for Men - Grey",
    slug:"t-shirt-for-men-grey",
    description:"A very nice grey t-shirt for men.",
    image:"/images/stock/t-shirt-male-2.jpg",
    createdAt:"1616449062163",
    updatedAt:"1616449062163",
    kept: true
  },
  {
    id:4,
    name:"Watch for Men",
    slug:"watch-for-men",
    description:"A very nice watch for men.",
    image:"/images/stock/watch-male.jpg",
    createdAt:"1616449062163",
    updatedAt:"1616449062163",
    kept: false
  }
]

// Component
class Profile extends PureComponent {

  constructor() {
    super()
    this.state = {
      currentUser: {
        id: 0,
        name: '',
        email: '',
        description: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: 0,
        image: ''
      }
    }
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getListByUser())
  }

  // Update controlled form
  handleChange = (event) => {
    // if (event.target.name === 'id' || event.target.name === 'zipcode') {
    //   this.setState({
    //     currentUser: {
    //       ...this.state.currentUser,
    //       [event.target.name]: Number(event.target.value)
    //     }
    //   })
    // }

    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [event.target.name]: event.target.value
      }
    })
  }

  // Submit controlled form data
  handleSubmit = () => {
    // passed in currentUser (user details in actions should equal a user object with all keys on currentUser) REMOVE THIS LATER
    console.log(this.state.currentUser)
    this.props.updateUser(this.state.currentUser)
    this.props.toggleForm()
    this.props.messageShow('Profile updated successfully.')
    window.setTimeout(() => {
      this.props.messageHide()
    }, 5000)
  }

  // Runs on client only
  componentDidMount() {
    this.props.getListByUser()
    const userImage = `https://media.newyorker.com/photos/5e49bf473399bf0008132231/1:1/w_2539,h_2539,c_limit/Kenseth-CatProfile.jpg`

    this.setState({
      currentUser: {
        ...this.props.user.details,
        image: userImage
      }
    })
  }

  render() {
    const products = mockProductHistory.map((product, i) => {
      return (
        <GridCell key={i}>
          <Card style={{ width: '18em', backgroundColor: white, margin: 'auto' }}>
            <p style={{ padding: '2em 3em 0 3em' }}>
              <img src={routeImage + product.image} alt={product.slug} style={{ width: '100%' }}/>
            </p>

            <div style={{ padding: '1em 1.2em' }}>
              <H4 font="secondary" style={{ color: black }}>{ product.name }</H4>
              <p>Description: {product.description}</p>
              <p>Order Number: {product.createdAt}</p>
              <p>Product Status: {product.kept ? "Kept" : "Returned"}</p>
            </div>
          </Card>
        </GridCell>
      )
    })

    const subs = this.props.subscriptions.map((sub, i) => {
      return (
        <GridCell key={i}>
          <Card
            style={{ width: "18em", backgroundColor: white, margin: "auto" }}
          >
            <p style={{ padding: "2em 3em 0 3em" }}>
              <img
                src={`${APP_URL}/images/crate.png`}
                alt={sub.crate.name}
                style={{ width: "100%" }}
              />
            </p>

            <div style={{ padding: "1em 1.2em" }}>
              <H4 font="secondary" style={{ color: black }}>
                {sub.crate.name}
              </H4>

              <p>Order Number: {sub.createdAt}</p>
              {/* shipping address confirmed if user.shippingAddress has value */}
              <p>Shipping Address: Confirmed</p>
              <p>Items in Crate: 3</p>
              <p>Delivery Date: </p>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "1.5em",
                  marginBottom: "1em",
                }}
              >
                <Button
                  theme="secondary"
                  onClick={() => console.log("Update date", sub.createdAt)}
                  type="button"
                >
                  Update Shipping Date
                </Button>
              </p>
            </div>
          </Card>
        </GridCell>
      )
    })

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>My Profile - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H3 font="secondary">My profile</H3>
          </GridCell>
        </Grid>

        {/* User information */}
        <Grid justifyCenter={true} alignCenter={true}>
          <GridCell
            style={{
              marginLeft: "2em",
              padding: "2em",
              textAlign: "center",
              maxWidth: 250,
              maxHeight: 250,
            }}
          >
            <ImageTile
              style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              height={250}
              width={250}
              image={this.state.currentUser.image || ""}
              shadow={level3}
            />
          </GridCell>

          {this.props.user.showForm ? (
            <GridCell>
              <H4 style={{ marginBottom: "0.5em", padding: "1rem" }}>
                {this.props.user.details.name}
              </H4>
              <Grid style={{ margin: '1rem'}}>
                <GridCell>
                  <label htmlFor="user-description">User Description:</label>
                  <br />
                  <Textarea
                    id="user-description"
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.currentUser.description || ''}
                  ></Textarea>
                  <br />

                  <label htmlFor="user-email">User Email:</label>
                  <Input
                    id="user-email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.currentUser.email || ''}
                    type="text"
                  ></Input>
                  <br />

                  <label htmlFor="user-address1">User Address Line 1:</label>
                  <Input
                    id="user-address1"
                    name="addressLine1"
                    onChange={this.handleChange}
                    value={this.state.currentUser.addressLine1 || ''}
                    type="text"
                  ></Input>
                  <br />

                  <label htmlFor="user-address2">User Address Line 2:</label>
                  <Input
                    id="user-address2"
                    name="addressLine2"
                    onChange={this.handleChange}
                    value={this.state.currentUser.addressLine2 || ''}
                    type="text"
                  ></Input>
                </GridCell>
                <GridCell>
                  <label htmlFor="user-city">City:</label>
                  <Input
                    id="user-city"
                    name="city"
                    onChange={this.handleChange}
                    value={this.state.currentUser.city || ''}
                    type="text"
                  ></Input>

                  <label htmlFor="user-state">State:</label>
                  <Input
                    id="user-state"
                    name="state"
                    onChange={this.handleChange}
                    value={this.state.currentUser.state || ''}
                    type="text"
                  ></Input>

                  <label htmlFor="user-zipcode">Zip Code:</label>
                  <Input
                    id="user-zipcode"
                    name="zipcode"
                    onChange={this.handleChange}
                    value={this.state.currentUser.zipcode || ''}
                    type="text"
                  ></Input>

                  <label htmlFor="user-image">Image:</label>
                  <Input
                    id="user-image"
                    name="image"
                    onChange={this.handleChange}
                    value={this.state.currentUser.image || ''}
                    type="text"
                  ></Input>
                </GridCell>
              </Grid>
            </GridCell>
          ) : (
            <GridCell>
              <H4 style={{ marginBottom: "0.5em" }}>
                {this.state.currentUser.name}
              </H4>

              <p style={{ color: grey2, marginBottom: "2em" }}>
                User Description: {this.state.currentUser.description}
              </p>
              <p style={{ color: grey2, marginBottom: "2em" }}>
                Email Address: {this.state.currentUser.email}
              </p>
              <p style={{ color: grey2, marginBottom: "2em" }}>
                Shipping Address: {this.state.currentUser.addressLine1}{" "}
                {this.state.currentUser.addressLine2},{" "}
                {this.state.currentUser.city}, {this.state.currentUser.state}{" "}
                {this.state.currentUser.zipcode}
              </p>
            </GridCell>
          )}
        </Grid>

        {/* Buttons */}
        <Grid>
          <GridCell
            style={{ flex: "", textAlign: "center", marginBottom: "2em" }}
          >
            {this.props.showForm ? (
              <Button
                theme="secondary"
                onClick={this.handleSubmit}
                style={{ marginRight: "1em" }}
              >
                Save Profile
              </Button>
            ) : (
              <Button
                theme="secondary"
                onClick={this.props.toggleForm}
                style={{ marginRight: "1em" }}
              >
                Update Profile
              </Button>
            )}

            <Link to={userRoutes.subscriptions.path}>
              <Button theme="primary">Subscriptions</Button>
            </Link>

            <Button
              theme="secondary"
              onClick={this.props.logout}
              style={{ marginLeft: "1em" }}
            >
              Logout
            </Button>
          </GridCell>
        </Grid>

        {/* Bottom title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H3 font="secondary">My orders</H3>
          </GridCell>
        </Grid>

        {/* Current orders */}
        <Grid>
          <GridCell>
            {/* Card for each subscription crate - map through each in list array */}
            <H4 font="primary" style={{ margin: "2rem" }}>
              Current Orders
            </H4>
            {this.props.subscriptions.length !== 0 ? (
              <Grid>{subs}</Grid>
            ) : (
              <Grid>
                <EmptyMessage message="You are not subscribed to any crates yet." />
              </Grid>
            )}
            <H4 font='primary' style={{ margin: '2rem' }}>Current Orders</H4>
              {this.props.subscriptions &&
                <Grid>
                  {subs}
                </Grid>
              }
          </GridCell>
        </Grid>

        {/* Past Orders */}
        <Grid>
          <GridCell>
            <H4 font="primary" style={{ margin: "2rem" }}>
              Past Orders
            </H4>
            <Grid>{products}</Grid>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  subscriptions: PropTypes.array,
  showForm: PropTypes.bool,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user,
    subscriptions: state.subscriptionsByUser.list,
    showForm: state.user.showForm,
  }
}

export default connect(profileState, { getListByUser, toggleForm, logout, messageShow, messageHide, updateUser })(Profile)
