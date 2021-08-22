import React, { useState } from "react";
import { Modal, Header, Button, Grid } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

const initialState = { results: [], c_weather: {}, open: false };

const MainView = () => {
  const [state, setState] = useState(initialState);
  const { results, c_weather, open } = state;

  const getLocationData = (l) => {
    let url = `${process.env.REACT_APP_PROXY_HOST}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_LOCATION_DATA_PATH}`;

    axios.get(`${url}${l.woeid}`).then((res) => {
      setState({
        ...state,
        c_weather: res.data.consolidated_weather,
        open: true,
      });
    });
  };

  const changeDateFormat = (d) => {
      const stringParts = d.split('-');
      return `${stringParts[2]}/${stringParts[1]}`
  }

  const getResults = () => {
    if (results.length !== 0) {
      return results.map((l, i) => (
        <div className="ui segment" onClick={() => getLocationData(l)} key={i}>
          {l.title}
        </div>
      ));
    }
    return;
  };

  const getConsolidatedWeatherData = () => {
    return (
      <Grid>
        <Grid.Row columns={c_weather.length}>
          {c_weather.map((d, i) => (
            <Grid.Column key={i}>
              <div className="weather-date">{changeDateFormat(d.applicable_date)}</div>
              <div className="img-wrapper"><img src={`https://www.metaweather.com/static/img/weather/${d.weather_state_abbr}.svg`} alt={d.weather_state_name}/></div>
              <div>{d.weather_state_name}</div>
              <div>
                <span>{Math.round(d.min_temp)}&#8451;</span>
                <span>-</span>
                <span>{Math.round(d.max_temp)}&#8451;</span>
              </div>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <div className="ui container center aligned">
      <h3 className="ui center aligned header">Weather App</h3>
      <SearchBar
        results={(data) => setState({ ...state, results: data })}
      ></SearchBar>
      {getResults()}
      {open ? (
        <Modal open={open} size="small">
          <Header icon="cloud" content={results[0].title} />
          <Modal.Content>{getConsolidatedWeatherData()}</Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              onClick={() => setState({ ...state, open: false })}
            >
              OK
            </Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </div>
  );
};

export default MainView;
