import Login from 'components/login';
import { render, fireEvent, waitFor, userEvent, cleanup } from 'utils/test-utils';

afterEach(cleanup);

test('should check the initial form state', async () => {
  const { getByLabelText, getByRole } = render(Login);

  expect(getByLabelText('Email')).toHaveAttribute('type', 'text');
  expect(getByLabelText('Password')).toHaveAttribute('type', 'password');
  expect(getByRole('button')).toHaveAttribute('disabled');
});

it('should check error state of email field', async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(Login);
  const email = getByLabelText('Email') as HTMLInputElement;

  fireEvent.blur(email);
  expect(await findByTestId('error-email')).toHaveTextContent('Email is a required field');

  userEvent.type(email, 'test');
  expect(email).toHaveValue('test');
  expect(await findByTestId('error-email')).toHaveTextContent('Email format is not correct');

  await waitFor(() => {
    userEvent.type(email, 'test@email.com');
  });

  expect(email).toHaveValue('test@email.com');
  expect(await queryByTestId('error-email')).toBeNull();
});

it('should check error state of password field', async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(Login);
  const password = getByLabelText('Password') as HTMLInputElement;

  fireEvent.blur(password);
  expect(await findByTestId('error-password')).toHaveTextContent('Password is a required field');

  userEvent.type(password, 'test');
  expect(password).toHaveValue('test');
  expect(await findByTestId('error-password')).toHaveTextContent('Password should atleast be of 8 characters');

  userEvent.type(password, 'test@password');
  expect(password).toHaveValue('test@password');
  expect(await findByTestId('error-password')).toHaveTextContent(
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  );

  await waitFor(() => {
    userEvent.type(password, 'Test@password1');
  });

  expect(password).toHaveValue('Test@password1');
  expect(await queryByTestId('error-password')).toBeNull();

  await waitFor(() => {
    userEvent.type(password, 'h>4l2Z1J');
  });

  expect(password).toHaveValue('h>4l2Z1J');
  expect(await queryByTestId('error-password')).toBeNull();
});
