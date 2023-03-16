import React from 'react';
import lodash from 'lodash';
import { TextInput, RadioButton, Button, Select, SelectItem } from 'carbon-components-react';
import { BreweryHeaders, BreweryType } from './BreweryConstants';

const BreweryFilter = (props) => {
  const [filter, setFilter] = React.useState('name');
  const [searchVal, setSearchVal] = React.useState(null);
  let searchS = '';
  const onFilterTypeSelect = (value) => {
    setFilter(value);
    if (value == 'brewery_type') {
      props.onFilterChange('by_type=micro');
    }
  };

  const onTextInputChange = (event) => {
    event.stopPropagation();
    searchS = event.currentTarget.value;
    deferQuery();
  };

  const deferQuery = lodash.debounce(() => {
    setSearchVal(searchS);
  }, 1000);

  const resetFilter = () => {
    setSearchVal(null);
    setFilter('name');
    props.resetFilter();
  };

  const onTypeSelect = (event) => {
    event.stopPropagation();
    props.onFilterChange(`by_type=${event.currentTarget.value}`);
  };

  React.useEffect(() => {
    if (filter && searchVal) {
      if (searchVal == '') {
        props.onFilterChange(searchVal);
      } else {
        const encodeVal = encodeURIComponent(searchVal);
        props.onFilterChange(`by_${filter}=${encodeVal}`);
      }
    }
  }, [searchVal]);

  return (
    <div id="filter-groups">
      {BreweryHeaders.map((type) => {
        if (type.filterable) {
          return (
            <div
              className="filter-group"
              key={`${type.key}-filter-group`}
              id={`${type.key}-filter-group`}
            >
              <RadioButton
                checked={filter == type.key}
                labelText={type.value}
                value={type.key}
                id={`filter-${type.key}`}
                onChange={onFilterTypeSelect}
                key={type.key}
              />
              {type.key === 'brewery_type' ? (
                <Select
                  className="brewery_type_selector"
                  labelText=""
                  disabled={filter !== type.key}
                  onChange={onTypeSelect}
                  id="brewery_type"
                >
                  {BreweryType.map((type) => {
                    return (
                      <SelectItem value={type.key} text={type.value} id={type.key} key={type.key} />
                    );
                  })}
                </Select>
              ) : (
                <TextInput
                  id={`${type.key}-input`}
                  size="sm"
                  labelText=""
                  onChange={onTextInputChange}
                  disabled={filter !== type.key}
                />
              )}
            </div>
          );
        }
      })}
      <Button size="sm" onClick={resetFilter}>
        Reset Filter
      </Button>
    </div>
  );
};

export default BreweryFilter;
