import { getErrorMessage } from '../stringFormat';
import { AppError } from '../../auth/axios';

test('getErrorMessage', () => {
  const exampleError: AppError = {
    config: {},
    isAxiosError: false,
    message: '',
    name: '',
    response: {
      data: 'uh oh',
      status: 400,
      statusText: 'bad',
      headers: [],
      config: {},
    },
    toJSON: () => {
      return exampleError;
    },
  };
  expect(getErrorMessage(exampleError)).toEqual('uh oh');
});
