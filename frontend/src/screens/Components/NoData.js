import React, { Component } from 'react';
import { Heading, Box } from 'grommet';

export default class NoData extends Component {
  render() {
    return (
      <Box fill="horizontal" align="center" justify="center">
        <Heading level="3" alignSelf="center" size="large">No Data</Heading>
      </Box>
    );
  }
}

