import React from "react";
import BreweriesContent from "../../components/BreweriesContent";
import { Tile } from "carbon-components-react";
export default class App extends React.Component {
  render() {
    return (
      <div id="home-page">
        <Tile>Karen React Brewery List</Tile>
        <BreweriesContent />
      </div>
    );
  }
}
