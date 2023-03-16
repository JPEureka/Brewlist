import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BreweriesList from '../BreweriesList';
import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
global.fetch = fetch;
const fakeData = [
  {
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
  },
  {
    id: 5566,
    address_2: null,
    address_3: null,
    brewery_type: 'planning',
    city: 'Austin',
    country: 'United States',
    county_province: null,
    created_at: '2018-07-24T00:00:00.000Z',
    latitude: null,
    longitude: null,
    name: 'Bnaf, LLC',
    obdb_id: 'bnaf-llc-austin',
    phone: null,
    postal_code: '78727-7602',
    state: 'Texas',
    street: null,
    updated_at: '2018-07-24T00:00:00.000Z',
    website_url: null,
  },
];

describe('BreweryList', () => {
  it('should render', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });
    const { container, queryByText } = render(
      <BrowserRouter>
        <BreweriesList />
      </BrowserRouter>,
    );
    await screen.findByText('Breweries List');
    expect(queryByText('Breweries List')).toBeTruthy();
    expect(container.querySelectorAll('.bx--table-toolbar').length).toBe(1);
    expect(container.querySelectorAll('.bx--data-table-content').length).toBe(1);
  });

  it('should display datatable', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    const { container, queryByText } = render(
      <BrowserRouter>
        <BreweriesList />
      </BrowserRouter>,
    );
    await screen.findByText('Breweries List');

    const dataRow1 = container.querySelectorAll('tbody tr')[0];
    const dataRow2 = container.querySelectorAll('tbody tr')[1];
    expect(queryByText('Breweries List')).toBeTruthy();
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
    expect(dataRow1.querySelectorAll('td')[0].textContent).toBe('9527');
    expect(dataRow1.querySelectorAll('td')[1].textContent).toBe('Karen Brewing');
    expect(dataRow1.querySelectorAll('td')[2].textContent).toBe('Cincinnati');
    expect(dataRow2.querySelectorAll('td')[0].textContent).toBe('5566');
    expect(dataRow2.querySelectorAll('td')[1].textContent).toBe('Bnaf, LLC');
    expect(dataRow2.querySelectorAll('td')[2].textContent).toBe('Austin');
  });

  it("should fetch data with search query if there's search input", async () => {
    let spyFetch = jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    const { container } = render(
      <BrowserRouter>
        <BreweriesList />
      </BrowserRouter>,
    );
    await screen.findByText('Breweries List');

    const searchBar = container.querySelector('.bx--search-close');
    fireEvent.click(searchBar);
    const searchInput = screen.getByPlaceholderText('Filter table');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    setTimeout(() => {
      expect(spyFetch).toHaveBeenCalledWith(
        'https://api.openbrewerydb.org/breweries/search?query=test',
      );
    }, 1500);
  });

  it("should fetch data with filter query if there's filter is selected", async () => {
    let spyFetch = jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    const { getByLabelText } = render(
      <BrowserRouter>
        <BreweriesList />
      </BrowserRouter>,
    );
    await screen.findByText('Breweries List');

    const typeRadioButton = getByLabelText('Type');
    fireEvent.click(typeRadioButton);

    await screen.findByText('Breweries List');
    expect(spyFetch).toHaveBeenCalledWith('https://api.openbrewerydb.org/breweries?by_type=micro');
  });
});
