const getFirstUser = require('./src/index.js');

it('returns first user and fields', async () => {
  const user = await user();
  expect(user).toEqual('The User');
});