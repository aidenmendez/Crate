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
import ImageTile from '../../ui/image/Tile'
import { level3 } from '../../ui/common/shadows'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

const userImage = `https://media.newyorker.com/photos/5e49bf473399bf0008132231/1:1/w_2539,h_2539,c_limit/Kenseth-CatProfile.jpg`

// Component
const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    {/* User information */}
    <Grid justifyCenter={true} alignCenter={true}>
      <GridCell style={{
          marginLeft: '2em',
          padding: '2em',
          textAlign: 'center',
          objectFit: 'contain',
          maxWidth: 250,
          maxHeight: 250
        }}>
        <ImageTile height={250} width={250} image={userImage} shadow={level3}/>
      </GridCell>

      <GridCell>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>User Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>Email Address: {props.user.details.email}</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>Shipping Address: 123 Main Street, Denver, CO 80602</p>


      </GridCell>
    </Grid>

    {/* Buttons */}
    <Grid>
      <GridCell style={{ flex: '' , textAlign: 'center', marginBottom: '2em' }}>
        <Button theme="primary" onClick={() => console.log('wow!')} style={{ marginRight: '1em' }}>Update Profile</Button>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>

    {/* Bottom title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My orders</H3>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
