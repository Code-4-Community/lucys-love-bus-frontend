import { RefreshTokenResponse } from '../ducks/types';
import AuthClient, { API_ROUTE } from '../authClient';
import nock from 'nock';
import { BASE_URL, invalidExp, mockTokenResponse } from '../../App.test';

describe('Authentication Client Tests', () => {
  describe('Login', () => {
    it('makes the right request', async () => {
      nock(BASE_URL)
        .post(API_ROUTE.LOGIN)
        .reply(200, mockTokenResponse(invalidExp));

      const result = await AuthClient.login({
        email: 'jackblanc',
        password: 'password',
      });

      expect(result).toEqual(mockTokenResponse(invalidExp));
    });
  });

  describe('Sign Up', () => {
    it('makes the right request', async () => {
      nock(BASE_URL)
        .post(API_ROUTE.SIGNUP)
        .reply(200, mockTokenResponse(invalidExp));

      const result = await AuthClient.signup({
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
        email: 'jblanc222@gmail.com',
        photoRelease: true,
        phoneNumber: '',
        location: {
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },
        dateOfBirth: '2001-01-15',
      });

      expect(result).toEqual(mockTokenResponse(invalidExp));
    });
  });

  describe('Logout', () => {
    it('makes the right request', () => {
      nock(BASE_URL).delete(API_ROUTE.LOGIN).reply(200, {});

      expect(
        AuthClient.logout(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
        ),
      ).toEqual(Promise.resolve());
    });
  });

  describe('Refresh', () => {
    it('makes the right request', async () => {
      const response: RefreshTokenResponse = {
        freshAccessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
      };

      nock(BASE_URL).post(API_ROUTE.REFRESH).reply(200, response);

      const result = await AuthClient.refresh(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      );

      expect(result).toEqual(response);
    });
  });
});
