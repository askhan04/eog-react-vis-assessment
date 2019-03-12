import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Chart from './Chart';
import Map from './Map';

// this file was set up as a container for the chart and the map components for the assessment

// utilizing styles/theme provided in the now what component / overall project
const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);
const styles = {
  card: {
    margin: '3.5% 10%'
  }
};

class Dashboard extends Component {
  // dispatch actions to ping api on component load and on a 4 second internal per requirements
  // used separate dispatch actions to not show the loading/linear progress on each mount (keep loading set on false after initial)
  // -- would appreciate feedback on this method - i'm sure there is a better way
  componentDidMount() {
    this.props.onLoad();
    this.timer = setInterval(() => this.props.onRefetch(), 4000);
  }

  // clear timer interval to prevent memory leaks
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { loading, data, classes } = this.props;

    if (loading) return <LinearProgress />;

    // charting the temperature data isnt very polished :\
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader title="Drone Location Map" />
          <CardContent>
            <Map
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.REACT_APP_MAPS_API_KEY
              }&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              mapData={data}
            />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title="Recharts Drone Temperature Chart" />
          <CardContent>
            <Chart plotData={data} />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

const mapState = state => {
  const { loading, data } = state.drone;
  return {
    loading,
    data: [...data]
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    }),
  onRefetch: () =>
    dispatch({
      type: actions.REFETCH_DRONE
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Dashboard));
