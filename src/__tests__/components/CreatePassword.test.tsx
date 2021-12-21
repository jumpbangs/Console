import CreatePassword from 'components/createPassword';
import { render, fireEvent, waitFor, userEvent, cleanup } from 'utils/test-utils';

afterEach(cleanup);

test('should check the initial form state', async () => {
  const { getByLabelText, getByRole } = render(CreatePassword);
  expect(getByLabelText('Password')).toHaveAttribute('type', 'password');
  expect(getByLabelText('Repeat password')).toHaveAttribute('type', 'password');
  expect(getByRole('button')).toHaveAttribute('disabled');
});

it('should check various state of password field', async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(CreatePassword);
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
});

it('should check various state of repeat password field', async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(CreatePassword);
  const password = getByLabelText('Password') as HTMLInputElement;
  const confirmPassword = getByLabelText('Repeat password') as HTMLInputElement;

  fireEvent.blur(confirmPassword);
  expect(await findByTestId('error-confirmPassword')).toHaveTextContent('Repeat Password is a required field');

  await waitFor(() => {
    userEvent.type(password, 'Test@password1');
  });

  await waitFor(() => {
    userEvent.type(confirmPassword, 'Test@password2');
  });

  expect(password).toHaveValue('Test@password1');
  expect(confirmPassword).toHaveValue('Test@password2');
  expect(await findByTestId('error-confirmPassword')).toHaveTextContent('Passwords does not match');

  await waitFor(() => {
    userEvent.type(password, 'Test@mypassword123');
  });

  await waitFor(() => {
    userEvent.type(confirmPassword, 'Test@mypassword123');
  });

  expect(password).toHaveValue('Test@mypassword123');
  expect(confirmPassword).toHaveValue('Test@mypassword123');
  expect(await queryByTestId('error-confirmPassword')).toBeNull();

  await waitFor(() => {
    userEvent.type(password, 'h>4l2Z1J');
  });

  await waitFor(() => {
    userEvent.type(confirmPassword, 'h>4l2Z1J');
  });

  expect(password).toHaveValue('h>4l2Z1J');
  expect(confirmPassword).toHaveValue('h>4l2Z1J');
  expect(await queryByTestId('error-confirmPassword')).toBeNull();
});
