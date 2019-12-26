const {login, register, me, logout} = require('../accounts');
const mongoose = require('mongoose');
const account = require('../../models/account');
const mock = require('./utils/mock');


beforeAll(() => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect('mongodb://localhost:27017/duty_test');
});
afterAll(() => {
  mongoose.connection.close();
});


describe('Login', () => {
  beforeEach(async () => {
    await account.create({username: 'user', password: '123'});
    await account.create({username: 'admin', password: '123', role: 'admin'});
  });

  describe('Insufficient data', () => {
    let req = {
      body: {},
    }; let res; let next;
    beforeEach(() => {
      req = {
        headers: {
          'x-forwarded-for': '12345',
        },
        body: {},
      };
      res = mock.response();
      next = jest.fn();
    });

    describe('Does not contain password', () => {
      req.body = {
        username: 'user',
      };
      test('should give status of 401', async () => {
        await login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', async () => {
        await login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });
    describe('Does not contain username', () => {
      req.body = {
        password: 123,
      };
      test('should give status of 401', async () => {
        await login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', async () => {
        await login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });
  });
  describe('Sufficient data', () => {
    let res; let next;
    beforeEach(() => {
      res = mock.response();
      next = jest.fn();
    });
    describe('Invalid Credentials', () => {
      const req = {
        headers: {
          'x-forwarded-for': '12345',
        },
        body: {
          username: 'lala',
          password: '123',
        },
      };
      test('should give status of 401', async () => {
        await login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });

      test('should give 1 correct error messages', async () => {
        await login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });
    describe('Correct credentials', () => {
      let res; let next;
      const req = {
        headers: {
          'x-forwarded-for': '12345',
        },
        body: {
          username: 'user',
          password: '123',
        },
      };
      beforeEach(() => {
        res = mock.response();
        next = jest.fn();
      });

      test('should give status of 200', async () => {
        await login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(200);
      });

      test('should give a json of token', async () => {
        await login(req, res, next);
        const user = await account.findOne({username: 'user'}).exec();
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({'token': user.token});
      });
    });
  });

  afterEach(async () => {
    await account.deleteMany({}).exec();
  });
});

describe('Register', () => {
  beforeEach(async () => {
    await account.create({username: 'user', password: '123'});
    await account.create({username: 'admin', password: '123', role: 'admin'});
  });
  afterEach(async () => {
    await account.deleteMany({}).exec();
  });
  describe('Not an admin role', () => {
    let req; let res; let next;
    beforeEach(() => {
      req = {
        user: {
          username: 'user',
          role: 'user',
        },
      };

      res = mock.response();
      next = jest.fn();
    });
    test('should give status of 401', async () => {
      await register(req, res, next);
      expect(res.status).toBeCalled();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('should give 1 correct error message', async () => {
      await register(req, res, next);
      expect(res.json).toBeCalled();
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith({
        errors: ['You need to be admin to register an account'],
      });
    });

    test('Db should not have added user', async () => {
      await register(req, res, next);
      const accounts = await account.find({}).exec();
      expect(accounts.length).toBe(2);
    });
  });

  describe('An admin role', () => {
    let req; let res; let next;
    beforeEach(() => {
      req = {
        body: {
          username: 'newUser',
          password: 123,
        },
        user: {
          username: 'admin',
          role: 'admin',
        },
      };

      res = mock.response();
      next = jest.fn();
    });
    test('should have 3 accounts in db', async () => {
      await register(req, res, next);
      const accounts = await account.find({}).exec();
      expect(accounts.length).toBe(3);
    });
    test('should give status of 201', async () => {
      await register(req, res, next);
      expect(res.status).toBeCalled();
      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    });

    test('should give token and account details', async () => {
      await register(req, res, next);
      expect(res.json).toBeCalled();
      expect(res.json).toBeCalledTimes(1);
    });
  });
});

describe('Me - information of current accessed user', () => {
  const user = {
    username: 'lalala',
  };
  let req; let res; let next;
  beforeEach(() => {
    req = {
      user: user,
    };
    res = mock.response();
    next = jest.fn();
  });


  test('should return status code 200', () => {
    me(req, res, next);
    expect(res.status).toBeCalled();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
  });

  test('should return user', () => {
    me(req, res, next);
    expect(res.json).toBeCalled();
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(user);
  });
});

describe('Logout', () => {
  let res; let next;
  const exampleToken = 'testToken';
  beforeEach(async () => {
    await account.create({
      username: 'user', password: '123', token: exampleToken,
    });
    res = mock.response();
    next = jest.fn();
  });


  test('Should delete token in db', async () => {
    const users = await account.find({username: 'user'}).exec();
    const req = {
      user: users[0],
    };
    await logout(req, res, next);
  });

  afterEach(async () => {
    await account.deleteMany({}).exec();
  });
});
