const BreweryHeaders = [
  {
    key: 'id',
    value: 'ID',
    filterable: false,
  },
  {
    key: 'name',
    value: 'Name',
    filterable: true,
  },
  {
    key: 'city',
    value: 'City',
    filterable: true,
  },
  {
    key: 'state',
    value: 'State',
    filterable: true,
  },
  {
    key: 'phone',
    value: 'Phone',
    filterable: false,
  },
  {
    key: 'postal',
    value: 'Postal',
    filterable: true,
  },
  {
    key: 'brewery_type',
    value: 'Type',
    filterable: true,
  },
];

const BreweryType = [
  { key: 'micro', value: 'Micro' },
  { key: 'nano', value: 'Nano' },
  { key: 'regional', value: 'Regional' },
  { key: 'brewpub', value: 'Brew Pub' },
  { key: 'large', value: 'Large' },
  { key: 'planning', value: 'Planning' },
  { key: 'bar', value: 'Bar' },
  { key: 'contract', value: 'Contract' },
  { key: 'proprietor', value: 'Proprietor' },
  { key: 'closed', value: 'Closed' },
];

const BreweryAttributes = {
  id: 'ID',
  name: 'Name',
  brewery_type: 'Type',
  street: 'Street',
  address_2: 'Address line 2',
  address_3: 'Address line 3',
  county_province: 'Province',
  postal_code: 'Post Code',
  longitude: 'Longitude',
  latitude: 'Latitude',
  city: 'City',
  state: 'State',
  country: 'Country',
  phone: 'Phone',
  website_url: 'Website',
  updated_at: 'Updated Time',
  created_at: 'Established Time',
};

export { BreweryHeaders, BreweryType, BreweryAttributes };
