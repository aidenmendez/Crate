// Imports 
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports 
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => (
  <div>
    {/* SEO 
      The Helmet is what shows on the browser tab
    */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar 
      This is the top of the page - under the Header
    */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        {/* user's name */}
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
        {/* user's email address */}
        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
        {/* button to view subscriptions */}
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>
        {/* button to log out */}
        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
// check that whatever's being passed in as props is the correct type
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
// this could also be called mapStateToProps, which is what it does
// you can access state.user as simply user in this file now
function profileState(state) {
  return {
    user: state.user
  }
}
// connect allows you to use state, including methods like logout, in this file
export default connect(profileState, { logout })(Profile)
