import React from 'react';
import { render, fireEvent, waitFor, queryAllByAltText } from '@testing-library/react';
import BreweryFilter from '../BreweryFilter';

describe('BreweryFilter', () => {
  it('should render all filters', () => {
    const fakeOnFilterChange = () => {};
    const { queryByText } = render(<BreweryFilter onFilterChange={fakeOnFilterChange} />);
    expect(queryByText('Name')).toBeTruthy();
    expect(queryByText('Type')).toBeTruthy();
    expect(queryByText('City')).toBeTruthy();
    expect(queryByText('State')).toBeTruthy();
    expect(queryByText('Postal')).toBeTruthy();
  });

  it('should enable name filter input by default', () => {
    const fakeOnFilterChange = () => {};
    const { container } = render(<BreweryFilter onFilterChange={fakeOnFilterChange} />);
    expect(container.querySelector('#name-input').disabled).toBe(false);
  });

  it('should disable input if the filter is not selected', () => {
    const fakeOnFilterChange = () => {};
    const { container } = render(<BreweryFilter onFilterChange={fakeOnFilterChange} />);
    expect(container.querySelector('#city-input').disabled).toBe(true);
  });

  it('should restore to default name filter if click reset filter button', () => {
    const fakePropsChange = () => {};
    const { container } = render(
      <BreweryFilter onFilterChange={fakePropsChange} resetFilter={fakePropsChange} />,
    );

    const cityRadioButton = container.querySelector('#filter-city');
    const resetButton = container.querySelector('.bx--btn--primary');

    expect(container.querySelector('#city-input').disabled).toBe(true);
    fireEvent.click(cityRadioButton);
    expect(container.querySelector('#city-input').disabled).toBe(false);

    fireEvent.click(resetButton);
    expect(container.querySelector('#city-input').disabled).toBe(true);
    expect(container.querySelector('#name-input').disabled).toBe(false);
  });
});
