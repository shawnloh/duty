const {login} = require('../accounts');
const account = require('../../models/account');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../models/account');

describe('Login', () => {
  describe('Does not use account models module to find user', () => {
    const req = {
      body: {},
    };
    let res = mockResponse();
    const next = jest.fn();
    beforeEach(() => {
      res = mockResponse();
    });

    describe('Does not contain username and password', () => {
      test('should give status of 401', () => {
        login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', () => {
        login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });

    describe('Does not contain password', () => {
      test('should give status of 401', () => {
        login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', () => {
        login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });
    describe('Does not contain username', () => {
      test('should give status of 401', () => {
        login(req, res, next);
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', () => {
        login(req, res, next);
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });
    test('Account model must not be called', () => {
      expect(account.findByCredentials).toHaveBeenCalledTimes(0);
    });
  });

  describe('Using account model module to find user', () => {
    describe('Invalid credentials', () => {
      const req = {
        body: {
          username: 'lala',
          password: '123',
        },
      };

      account.findByCredentials.mockReturnValue(Promise.resolve(null));
      let res = mockResponse();
      let next = jest.fn();
      beforeAll(() => {
        jest.clearAllMocks();
        res = mockResponse();
        next = jest.fn();
        return login(req, res, next);
      });
      test('should call account findByCredentials', () => {
        expect(account.findByCredentials).toHaveBeenCalledTimes(1);
        expect(account.findByCredentials).toHaveBeenCalledWith('lala', '123');
      });

      test('should give status of 401', () => {
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(401);
      });
      test('should give 1 correct error messages', () => {
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({
          errors: ['Login failed! Check authentication credentials'],
        });
      });
    });

    describe('Correct credentials', () => {
      const req = {
        body: {
          username: 'user',
          password: '123',
        },
      };

      let res = mockResponse();
      let next = jest.fn();
      let userResponse;

      beforeAll(() => {
        userResponse= {
          username: 'user',
          generateAuthToken: jest.fn().mockReturnValue(
              Promise.resolve('token'),
          ),
        };
        account.findByCredentials.mockReturnValue(
            Promise.resolve(userResponse),
        );
        jest.clearAllMocks();
        res = mockResponse();
        next = jest.fn();
        return login(req, res, next);
      });

      test('should call account.findByCredentials', () => {
        expect(account.findByCredentials).toHaveBeenCalledTimes(1);
        expect(account.findByCredentials).toHaveBeenCalledWith('user', '123');
      });

      test('should call user.generateAuthToken once', () => {
        expect(userResponse.generateAuthToken).toHaveBeenCalledTimes(1);
      });

      test('should give status of 200', () => {
        expect(res.status).toBeCalled();
        expect(res.status).toBeCalledWith(200);
      });

      test('should contain token body', () => {
        expect(res.json).toBeCalled();
        expect(res.json).toBeCalledWith({token: 'token'});
      });
    });

    describe('Account model throw errors', () => {
      const req = {
        body: {
          username: 'user',
          password: '123',
        },
      };

      let res = mockResponse();
      let next = jest.fn();

      beforeAll(() => {
        account.findByCredentials.mockReturnValue(
            Promise.reject(new Error('some error')),
        );
        jest.clearAllMocks();
        res = mockResponse();
        next = jest.fn();
        return login(req, res, next);
      });

      test('should call next with error', () => {
        expect(next).toBeCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(new Error('some error'));
      });
    });
  });
});

