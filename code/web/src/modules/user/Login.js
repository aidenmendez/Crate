// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Input from '../../ui/input/Input'
import H3 from '../../ui/typography/H3'
import Icon from '../../ui/icon'
import { level1 } from '../../ui/common/shadows'
import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { login } from './api/actions'
import AuthCheck from '../auth/AuthCheck'

// Component
class Login extends Component {

  constructor(props) {
    super(props)
    // set initial state within this component 
    this.state = {
      user: {
        email: '',
        password: '',
      }
    }

    // Function bindings
  }
  // when the user types in these fields, that data is put into state
  // and then displayed in the fields
  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value

    this.setState({
      user
    })
  }
  // when the button is clicked
  onSubmit = (event) => {
    event.preventDefault()
    // show this message 
    this.props.messageShow('Logging in, please wait...')
    // run the login method, passing in the current user's object
    this.props.login(this.state.user)
      .then(response => {
        // if there's an error returned from login
        if (this.props.user.error && this.props.user.error.length > 0) {
          // show that error
          this.props.messageShow(this.props.user.error)
          // then hide that message after 5 seconds
          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
          // otherwise just hide the logging in message
        } else {
          this.props.messageHide()
        }
      })
      // if an error is caught here
      .catch(error => {
        // show the error message
        this.props.messageShow(this.props.user.error)
        // then hide it after 5 seconds
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }

  render() {
    // destructure this.props.user so we can access isLoading and error
    const { isLoading, error } = this.props.user

    return (
      <Grid gutter={true} alignCenter={true} style={{ padding: "2em" }}>
        {/* SEO 
          The Helmet is what shows on the browser tab
        */}
        <Helmet>
          <title>Login to your account - Crate</title>
        </Helmet>

        {/* Left Content - Image Collage 
          Show these images on the left 
        */}
        <GridCell>
          <Grid gutter={true} alignCenter={true}>
            <GridCell justifyCenter={true}>
              <ImageTile
                width={300}
                height={530}
                shadow={level1}
                image={`${APP_URL}/images/stock/women/1.jpg`}
              />
            </GridCell>

            <GridCell>
              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile
                    width={170}
                    height={250}
                    shadow={level1}
                    image={`${APP_URL}/images/stock/men/2.jpg`}
                  />
                </GridCell>
              </Grid>

              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile
                    width={170}
                    height={250}
                    shadow={level1}
                    image={`${APP_URL}/images/stock/men/3.jpg`}
                    style={{ marginTop: "1.9em" }}
                  />
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
        </GridCell>

        {/* Right Content 
          Show this on the right side of the page
        */}
        <GridCell style={{ textAlign: "center" }}>
          <H3 font="secondary" style={{ marginBottom: "1em" }}>
            Login to your account
          </H3>

          {/* Login Form
            This styles the login form - email and password fields
          */}
          <form onSubmit={this.onSubmit}>
            <div style={{ width: "25em", margin: "0 auto" }}>
              {/* Email */}
              <Input
                type="email"
                fullWidth={true}
                placeholder="Email"
                required="required"
                name="email"
                value={this.state.user.email}
                onChange={this.onChange}
                style={{ marginTop: "1em" }}
              />

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
                onChange={this.onChange}
                style={{ marginTop: "1em" }}
              />
            </div>

            <div style={{ marginTop: "2em" }}>
              {/* Signup link 
                This button navigates to the signup page
              */}
              <Link to={userRoutes.signup.path}>
                <Button type="button" style={{ marginRight: "0.5em" }}>
                  Signup
                </Button>
              </Link>

              {/* Form submit 
                This button submits the form
              */}
              <Button type="submit" theme="secondary" disabled={isLoading}>
                Login
                <Icon size={1.2} style={{ color: white }}>
                  navigate_next
                </Icon>
              </Button>
            </div>
          </form>
        </GridCell>

        {/* Auth Check 
          This is how the user's email/password are authenticated
        */}
        <AuthCheck />
      </Grid>
    )
  }
}

// Component Properties
// check that whatever's being passed in as props is the correct type
Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
// this could also be called mapStateToProps, which is what it does
// you can access state.user as simply user in this file now
function loginState(state) {
  return {
    user: state.user
  }
}

// connect allows you to use state, including methods like login, messageShow, and messageHide, in this file
export default connect(loginState, { login, messageShow, messageHide })(withRouter(Login))
