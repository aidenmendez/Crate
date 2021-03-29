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
    const user1 = {
      name: "User",
      email: "user@crate.com",
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: "user"
    }

    await models.User.create(user1)
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(() => {
    server.close();
  });

  it('can update a user with just email', async () => {
    const tokenResponse = await request(server)
      .get('/')
      .send({query: '{ userLogin(email: "user@crate.com", password: "123456", role: "user") { token user { id } } }'})
    const userID = tokenResponse.body.data.userLogin.user.id

    const updateResponse = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: `mutation { userUpdate(id: ${userID}, email: "new@crate.com") { id email streetAddress1 streetAddress2 city state zip description image } }` })
      .expect(200)
    expect(updateResponse.body.data.userUpdate.email).toEqual('new@crate.com')
  })
});
