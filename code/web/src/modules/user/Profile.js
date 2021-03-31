// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import Card from '../../ui/card/Card'
import { level3 } from '../../ui/common/shadows'
import { white, black, grey, grey2 } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'
import { getListByUser } from '../subscription/api/actions'
import { updateUser, toggleForm } from '../user/api/actions'
import { routeImage } from '../../setup/routes'

const userImage = `https://media.newyorker.com/photos/5e49bf473399bf0008132231/1:1/w_2539,h_2539,c_limit/Kenseth-CatProfile.jpg`

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
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getListByUser())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getListByUser()
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

    return (
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
            <H4 style={{ marginBottom: '0.5em' }}>{this.props.user.details.name}</H4>

            <p style={{ color: grey2, marginBottom: '2em' }}>User Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio</p>
            <p style={{ color: grey2, marginBottom: '2em' }}>Email Address: {this.props.user.details.email}</p>
            <p style={{ color: grey2, marginBottom: '2em' }}>Shipping Address: 123 Main Street, Denver, CO 80602</p>

          </GridCell>
        </Grid>

        {/* Buttons */}
        <Grid>
          <GridCell style={{ flex: '' , textAlign: 'center', marginBottom: '2em' }}>
            <Button theme="secondary" onClick={this.props.toggleForm} style={{ marginRight: '1em' }}>Update Profile</Button>

            <Link to={userRoutes.subscriptions.path}>
              <Button theme="primary">Subscriptions</Button>
            </Link>

            <Button theme="secondary" onClick={this.props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
          </GridCell>
        </Grid>

        {/* Bottom title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">My orders</H3>
          </GridCell>
        </Grid>

        {/* Current orders */}
        <Grid>
          <GridCell>
            {/* Card for each subscription crate - map through each in list array */}
            <H4 font='primary' style={{ margin: '2rem' }}>Current Orders</H4>
            <Grid>
              <GridCell>
                {this.props.subscriptions &&
                  <Card style={{ width: '18em', backgroundColor: white, margin: 'auto' }}>
                    <p style={{ padding: '2em 3em 0 3em' }}>
                      <img src={`${ APP_URL }/images/crate.png`} alt={ this.props.subscriptions.crate.name } style={{ width: '100%' }}/>
                    </p>

                    <div style={{ padding: '1em 1.2em' }}>
                      <H4 font="secondary" style={{ color: black }}>{ this.props.subscriptions.crate.name }</H4>

                      <p>Order Number: {this.props.subscriptions.createdAt}</p>
                      {/* shipping address confirmed if user.shippingAddress has value */}
                      <p>Shipping Address: Confirmed</p>
                      <p>Items in Crate: 3</p>
                      <p>Delivery Date: </p>

                      <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
                        <Button
                          theme="secondary"
                          onClick={() => console.log('Update date')}
                          type="button"
                          >
                          Update Shipping Date
                        </Button>
                      </p>
                    </div>
                  </Card>
                }
              </GridCell>
              <GridCell>
                {this.props.subscriptions &&
                  <Card style={{ width: '18em', backgroundColor: white, margin: 'auto' }}>
                    <p style={{ padding: '2em 3em 0 3em' }}>
                      <img src={`${ APP_URL }/images/crate.png`} alt={ this.props.subscriptions.crate.name } style={{ width: '100%' }}/>
                    </p>

                    <div style={{ padding: '1em 1.2em' }}>
                      <H4 font="secondary" style={{ color: black }}>{ this.props.subscriptions.crate.name }</H4>

                      <p>Order Number: {this.props.subscriptions.createdAt}</p>
                      {/* shipping address confirmed if user.shippingAddress has value */}
                      <p>Shipping Address: Confirmed</p>
                      <p>Items in Crate: 3</p>
                      <p>Delivery Date: </p>

                      <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
                        <Button
                          theme="secondary"
                          onClick={() => console.log('Update date')}
                          type="button"
                          >
                          Update Shipping Date
                        </Button>
                      </p>
                    </div>
                  </Card>
                }
              </GridCell>
            </Grid>
          </GridCell>
        </Grid>

        {/* Past Orders */}
        <Grid>
          <GridCell>
            <H4 font='primary' style={{ margin: '2rem' }}>Past Orders</H4>
            <Grid>
              {products}
            </Grid>
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
  subscriptions: PropTypes.object
}

// Component State
function profileState(state) {
  return {
    user: state.user,
    subscriptions: state.subscriptionsByUser.list[0]
  }
}

export default connect(profileState, { getListByUser, toggleForm, logout })(Profile)
