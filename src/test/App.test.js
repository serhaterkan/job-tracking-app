// import { render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Sort from '../components/Dashboard/Sort';
import { inputAlphaNumeric } from '../components/Helper';

describe('inputAlphaNumeric function works correctly', () => {
  test('special character control', async () => {
    await expect(inputAlphaNumeric({}, '+-*/')).rejects.toThrow(Error);
  });
  test('alpha numeric control', async () => {
    await expect(inputAlphaNumeric({}, 'tested')).resolves.toEqual('success');
  });
  test('space control', async () => {
    await expect(inputAlphaNumeric({}, '   ')).rejects.toThrow(Error);
  });
});

test('sort button works correctly', async () => {
  const onSort = jest.fn();
  const { container } = render(<Sort onSort={onSort} />);
  const button = screen.getByRole('button', {
    name: /Job Name/i
  });
  userEvent.click(button);
  const ascending = container.getElementsByClassName('anticon anticon-sort-ascending');
  expect(ascending.length).toBe(1);
});
