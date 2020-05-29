import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '../Home';
import IUserData from '../../../types/UserData';

afterEach(cleanup);

const fakeData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }
];

interface IProps {
  userData: IUserData[];
}

interface IActions {
  fetchInitialDataIfNeeded: () => null;
}

describe('<Home />', () => {
  const tree = (props: IProps, actions: IActions) => {
    render(
      <MemoryRouter>
        <Home {...props} {...actions} />
      </MemoryRouter>
    ).container.firstChild;
  };

  it('should call fetchInitialDataIfNeeded when loaded', () => {
    const mockAction = jest.fn();
    const actions = { fetchInitialDataIfNeeded: mockAction };
    const userData = [];
    tree({ userData }, actions);
    expect(mockAction).toHaveBeenCalled();
  });

  it('should not call fetchInitialDataIfNeeded when loaded on Server Side', () => {
    const mockAction = jest.fn();
    const actions = { fetchInitialDataIfNeeded: mockAction };
    const userData = fakeData;
    tree({ userData }, actions);
    expect(mockAction).not.toHaveBeenCalled();
  });

  it('renders the loading status if requesting data', () => {
    const userData = fakeData;
    const actions = { fetchInitialDataIfNeeded: () => null };

    expect(tree({ userData }, actions)).toMatchSnapshot();
  });

  it('renders the list if loading was successful', () => {
    const userData = fakeData;
    const actions = { fetchInitialDataIfNeeded: () => null };

    expect(tree({ userData }, actions)).toMatchSnapshot();
  });
});
