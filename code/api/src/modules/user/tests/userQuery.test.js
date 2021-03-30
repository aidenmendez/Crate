import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema/index'
import request from 'supertest'
import models from "../../../setup/models"
const bcrypt = require('bcrypt');
const config = require('../../../config/server.json');
const User = require('../../../modules/user/model');

describe('user queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  });

  beforeEach(async () => {
    const user = {
      name: "User",
      email: "user@crate.com",
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: "user"
    }

    await models.User.create(user)
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(() => {
    server.close();
  });

  it('can update user email', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, email: "updated@crate.com") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)
    expect(updateResponse.body.data.updateUser.email).toEqual('updated@crate.com')
  })

  it('can update addressLine1', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, addressLine1: "1st street") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('addressLine1')
    expect(updateResponse.body.data.updateUser.addressLine1).toEqual("1st street")
  })

  it('can update addressLine2', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, addressLine2: "1234") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('addressLine2')
    expect(updateResponse.body.data.updateUser.addressLine2).toEqual("1234")
  })

  it('can update city', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, city: "Denver") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('city')
    expect(updateResponse.body.data.updateUser.city).toEqual("Denver")
  })

  it('can update state', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, state: "Colorado") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('state')
    expect(updateResponse.body.data.updateUser.state).toEqual("Colorado")
  })

  it('can update zipcode', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, zipcode: 67789) { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('zipcode')
    expect(updateResponse.body.data.updateUser.zipcode).toEqual(67789)
  })

  it('can update description', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, description: "Cool test yo") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('description')
    expect(updateResponse.body.data.updateUser.description).toEqual("Cool test yo")
  })

  it('can update image', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, image: "new.jpg") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)

    expect(updateResponse.body.data.updateUser).toHaveProperty('image')
    expect(updateResponse.body.data.updateUser.image).toEqual("new.jpg")
  })

  it('can update all fields', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, email: "updated@crate.com", addressLine1: "1st Street", city: "Denver", state: "CO", zipcode: 74265, image: "new.jpg", description: "Cool test yo") { id email addressLine1 addressLine2 city state zipcode description image, deliveryDate } }` })
      .expect(200)
    expect(updateResponse.body.data.updateUser).toHaveProperty('id')
    expect(updateResponse.body.data.updateUser).toHaveProperty('email')
    expect(updateResponse.body.data.updateUser).toHaveProperty('addressLine1')
    expect(updateResponse.body.data.updateUser).toHaveProperty('addressLine2')
    expect(updateResponse.body.data.updateUser).toHaveProperty('description')
    expect(updateResponse.body.data.updateUser).toHaveProperty('city')
    expect(updateResponse.body.data.updateUser).toHaveProperty('state')
    expect(updateResponse.body.data.updateUser).toHaveProperty('zipcode')
    expect(updateResponse.body.data.updateUser).toHaveProperty('image')
    expect(updateResponse.body.data.updateUser.email).toEqual('updated@crate.com')
  })

  it('can update the delivery date', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { updateUser(id: ${userID}, deliveryDate: "15th" ) { id email addressLine1 addressLine2 city state zipcode description image deliveryDate } }` })
      .expect(200)
    expect(updateResponse.body.data.updateUser).toHaveProperty('deliverDate')
    expect(updateResponse.body.data.updateUser.deliveryDate).toEqual("15th")
  })
});
