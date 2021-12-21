import { censorEmail } from 'utils/censor-email';

it('should return censored email string', () => {
  const tests = [
    {
      input: 'test@test.com',
      output: 'te**@t***.com',
    },
    {
      input: 'test_123@test.com',
      output: 'te******@t***.com',
    },
    {
      input: 'mycoolemail@gmail.com',
      output: 'my*********@g****.com',
    },
    {
      input: '',
      output: '',
    },
  ];

  tests.forEach(({ input, output }) => {
    const email = censorEmail(input);
    expect(email).toEqual(output);
  });
});
