import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BreweryDetail from '../BreweryDetail';
import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
global.fetch = fetch;
const fakeData = {
  id: 9527,
  name: 'Karen Brewing',
  brewery_type: 'regional',
  street: '3301 Madison Rd',
  address_2: null,
  address_3: null,
  city: 'Cincinnati',
  county_province: null,
  state: 'Ohio',
  postal_code: '45209-1132',
  country: 'United States',
  longitude: '-84.4239715',
  latitude: '39.1563725',
  phone: '5138368733',
  website_url: 'http://www.madtreebrewing.com',
  updated_at: '2018-08-24T15:44:22.281Z',
  created_at: '2018-08-23T23:24:11.758Z',
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('BreweryDetail', () => {
  it('should render', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    const { container, queryByText } = render(
      <BrowserRouter>
        <BreweryDetail id={9527} />
      </BrowserRouter>,
    );
    await screen.findByText('Back to home page');
    expect(queryByText('Back to home page')).toBeTruthy();
    expect(container.querySelectorAll('table').length).toBe(1);
  });

  it('should display data detail', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    const { container, queryByText } = render(
      <BrowserRouter>
        <BreweryDetail id={9527} />
      </BrowserRouter>,
    );
    await screen.findByText('Back to home page');
    expect(queryByText('Detail Info of Brewery No.9527')).toBeTruthy();
    expect(container.querySelectorAll('table').length).toBe(1);
    expect(container.querySelectorAll('tr').length).toBe(18);

    const idRow = container.querySelectorAll('tr')[1];
    const nameRow = container.querySelectorAll('tr')[2];
    expect(idRow.querySelectorAll('td')[0].textContent).toBe('ID');
    expect(idRow.querySelectorAll('td')[1].textContent).toBe('9527');
    expect(nameRow.querySelectorAll('td')[0].textContent).toBe('Name');
    expect(nameRow.querySelectorAll('td')[1].textContent).toBe('Karen Brewing');
  });
});
