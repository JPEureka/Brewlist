import React from 'react';
import {
  DataTable,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  Loading,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-react';
import { Link } from 'react-router-dom';
import BreweryFilter from './BreweryFilter';
import lodash from 'lodash';
import { BreweriesTableHeaders } from './BreweryConstants';
type responseObject = {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  postal_code: string;
  phone: string;
  state: string;
};

const BreweriesList = () => {
  const [breweries, updateBreweries] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [datatStartIndex, setStartIndex] = React.useState(0);
  const [viewState, setViewState] = React.useState('loading');
  const [displayedBreweries, setDisplayedBreweries] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [useFEPaging, setUseFEPaging] = React.useState(false);

  let searchS = '';

  const deferQuery = lodash.debounce(() => {
    setSearchQuery(searchS);
  }, 1000);

  const getUrl = () => {
    if (searchQuery && searchQuery !== '') {
      return `https://api.openbrewerydb.org/breweries/search?query=${searchQuery}`;
    } else if (filter && filter !== '') {
      return `https://api.openbrewerydb.org/breweries?${filter}`;
    } else return `https://api.openbrewerydb.org/breweries?page=${currentPage}`;
  };

  const getData = () => {
    setViewState('loading');
    setStartIndex(0);
    fetch(getUrl())
      .then((response) => response.json())
      .then((jsonData) => {
        const rd = jsonData.map((jd: responseObject) => {
          return {
            id: jd.id,
            name: jd.name,
            brewery_type: jd.brewery_type,
            city: jd.city,
            postal: jd.postal_code,
            phone: jd.phone,
            state: jd.state,
          };
        });
        if (rd.length == 0) {
          setDisplayedBreweries([]);
        } else {
          if (rd.length > pageSize) {
            setDisplayedBreweries(rd.slice(datatStartIndex, pageSize));
          } else {
            setDisplayedBreweries(rd);
          }
        }
        setViewState('data');
        updateBreweries(rd);
      });
  };

  const resetPaging = () => {
    setStartIndex(0);
    setCurrentPage(1);
    getData();
  };

  const onCurrentPageChange = (change: any) => {
    change.page > currentPage
      ? setStartIndex(
          datatStartIndex + pageSize >= breweries.length
            ? breweries.length - 1
            : datatStartIndex + pageSize,
        )
      : setStartIndex(datatStartIndex - pageSize >= 0 ? datatStartIndex - pageSize : 0);
    // change format: {page, pageSize}
    if (change.page !== currentPage) {
      setCurrentPage(change.page);
    }
    if (change.pageSize !== pageSize) {
      setPageSize(change.pageSize);
    }
  };

  const onSearchQueryChange = (change: any) => {
    if (change) {
      searchS = change.target.value;
      deferQuery();
    }
  };

  const onFilterReset = () => {
    setUseFEPaging(false);
    setFilter('');
  };

  React.useEffect(() => {
    if (searchQuery !== null) {
      setUseFEPaging(true);
      resetPaging();
    }
  }, [searchQuery]);

  React.useEffect(() => {
    if (!useFEPaging) {
      getData();
    } else {
      setDisplayedBreweries(
        breweries.slice(
          datatStartIndex,
          datatStartIndex + pageSize >= breweries.length
            ? breweries.length
            : datatStartIndex + pageSize,
        ),
      );
    }
  }, [currentPage]);

  React.useEffect(() => {
    getData();
  }, [pageSize]);

  React.useEffect(() => {
    if (filter !== null) {
      setUseFEPaging(true);
      resetPaging();
    }
  }, [filter]);

  return (
    <div className="breweries-list-view">
      <BreweryFilter
        onFilterChange={(val: any) => {
          setFilter(val);
        }}
        resetFilter={onFilterReset}
      />
      {viewState === 'loading' ? (
        <Loading description="Fetching breweries list..." />
      ) : (
        <div className="breweries-list">
          <DataTable
            headers={BreweriesTableHeaders}
            rows={displayedBreweries}
            isSortable
            render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
              <TableContainer title="Breweries List" description="Here are a list of breweries...">
                <TableToolbar>
                  <TableToolbarContent>
                    <TableToolbarSearch onChange={onSearchQueryChange} />
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header, i) => (
                        <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any) => (
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map((cell: any) => (
                          <TableCell key={cell.id}>
                            {cell.info.header == 'id' ? (
                              <Link to={`/details/${cell.value}`}>{cell.value}</Link>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          ></DataTable>
          <Pagination
            page={currentPage}
            pagesUnknown={true}
            pageSize={20}
            pageInputDisabled={true}
            pageSizes={[20, 30, 40, 50]}
            onChange={onCurrentPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default BreweriesList;
