const request = require('supertest');
const app = require('../../app');
const account = require('../../models/account');
// const rank = require('../../models/rank');
// const platoon = require('../../models/platoon');


describe('/api/accounts/login', () => {
  beforeAll(async (done) => {
    // const createdRank = await rank.create({name: 'LCP'});
    // const createdPlatoon = await platoon.create({name: 'HQ'});
    await account.create([{
      username: 'user',
      password: '123',
      role: 'user',
    },
    {
      username: 'admin',
      password: '123',
      role: 'admin',
    }]);

    done();
  });

  afterAll(async (done) => {
    await account.deleteMany({});
    done();
  });

  describe('User did not give username and password', () => {
    let res;
    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/login');
      done();
    });

    test('should give 400 status code', () => {
      expect(res.status).toEqual(400);
    });
    test('should contain 2 correct errors', () => {
      const expected = ['Username is required', 'Password is required'];
      expect(res.body.errors).toEqual(expected);
      expect(res.body.errors.length).toEqual(2);
    });
  });

  describe('User give only username', () => {
    let res;
    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/login')
          .send({username: 'hello'});
      done();
    });
    test('should give 400 status code', () => {
      expect(res.status).toEqual(400);
    });
    test('should contain 1 correct error', () => {
      const expected = ['Password is required'];
      expect(res.body.errors).toEqual(expected);
      expect(res.body.errors.length).toEqual(1);
    });
  });

  describe('User give only password', () => {
    let res;
    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/login')
          .send({password: '123'});
      done();
    });
    test('should give 400 status code', () => {
      expect(res.status).toEqual(400);
    });
    test('should contain 1 correct error', () => {
      const expected = ['Username is required'];
      expect(res.body.errors).toEqual(expected);
      expect(res.body.errors.length).toEqual(1);
    });
  });

  describe('User give incorrect username and password', () => {
    let res;

    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/login')
          .send({username: 'lalala', password: '123'});
      done();
    });

    test('should give 401 status code', () => {
      expect(res.status).toEqual(401);
    });

    test('should contain 1 correct error', () => {
      const expected = ['Login failed! Check authentication credentials'];
      expect(res.body.errors).toEqual(expected);
      expect(res.body.errors.length).toEqual(1);
    });
  });

  describe('User give correct username and password', () => {
    let res;
    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/login')
          .send({
            username: 'user', password: '123',
          });
      done();
    });

    test('should give 200 status code', () => {
      expect(res.status).toEqual(200);
    });
    test('should not give any errors', () => {
      expect(res.body.errors).toBeFalsy();
      expect(res.body).not.toHaveProperty('errors');
    });

    test('should give a token back', () => {
      expect(res.body.token).toBeTruthy();
    });
  });
});

describe('/api/accounts/register', () => {
  beforeAll(async (done) => {
    await account.create([{
      username: 'user',
      password: '123',
      role: 'user',
    },
    {
      username: 'admin',
      password: '123',
      role: 'admin',
    }]);

    done();
  });

  afterAll(async (done) => {
    await account.deleteMany({});
    done();
  });

  describe('Not Authenticated', () => {
    let res;
    beforeAll(async (done) => {
      res = await request(app)
          .post('/api/accounts/register');
      done();
    });
    test('should give 401 status code', () => {
      expect(res.status).toBe(401);
    });
    test('should contain 1 correct error', () => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.message).toEqual(
          'Not authorized to access this resource',
      );
    });
  });

  describe('Authenticated', () => {
    describe('Not an admin role', () => {
      let res;
      beforeAll(async (done) => {
        const loginRes = await request(app)
            .post('/api/accounts/login')
            .send({username: 'user', password: '123'});

        const token = loginRes.body.token;
        res = await request(app)
            .post('/api/accounts/register')
            .set('Authorization', `Bearer ${token}`)
            .send({username: 'testuser', password: 'testpassword'});
        done();
      });

      test('should give 401 status code', () => {
        expect(res.status).toBe(401);
      });
      test('should contain 1 correct error', () => {
        const expected = ['You need to be admin to register an account'];
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.length).toEqual(1);
        expect(res.body.errors).toEqual(expected);
      });
    });

    describe('An admin role', () => {
      let res;
      beforeAll(async (done) => {
        const loginRes = await request(app)
            .post('/api/accounts/login')
            .send({username: 'admin', password: '123'});

        const token = loginRes.body.token;
        res = await request(app)
            .post('/api/accounts/register')
            .set('Authorization', `Bearer ${token}`)
            .send({username: 'testuser', password: 'testpassword'});
        done();
      });
      test('should give 201 status', () => {
        expect(res.status).toBe(201);
      });
    });
  });
});
