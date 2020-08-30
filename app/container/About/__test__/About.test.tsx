import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import About from '../About';
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

describe('<About />', () => {
  const tree = () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    ).container.firstChild;
  };

  it('should call fetchInitialDataIfNeeded when loaded', () => {});

  it('should not call fetchInitialDataIfNeeded when loaded on Server Side', () => {});

  it('renders the loading status if requesting data', () => {});

  it('renders the list if loading was successful', () => {});
});
