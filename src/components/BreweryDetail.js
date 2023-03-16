import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Loading, Button, Tile } from "carbon-components-react";
import { BreweryAttributes } from "./BreweryConstants";
const BreweryDetail = props => {
  const location = useLocation();
  const id = props.id ? props.id : location.pathname.split("/").pop();

  const [detail, setDetail] = React.useState([]);
  const [viewState, setViewState] = React.useState("loading");

  const getDetail = () => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (response.message) {
            setViewState("error");
          } else {
            setViewState("data");
            setDetail(Object.entries(response));
          }
        }
      });
  };

  React.useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="brewery-details">
      <Button>
        <a href="/">Back to home page</a>
      </Button>
      {viewState === "data" ? (
        <table id={`${id}-details-table`}>
          <thead>
            <tr>
              <th colSpan="2">{`Detail Info of Brewery No.${id}`}</th>
            </tr>
          </thead>
          <tbody>
            {detail.map(data => {
              if (Object.keys(BreweryAttributes).includes(data[0])) {
                return (
                  <tr key={data[0]}>
                    <td>{BreweryAttributes[data[0]]}</td>
                    <td>{data[1] ? data[1] : "-"}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : viewState === "error" ? (
        <Tile>{`Couldn't find Brewery with 'id'=${id}`}</Tile>
      ) : (
        <Loading description="Fetching brewery details..." />
      )}
    </div>
  );
};

export default BreweryDetail;
