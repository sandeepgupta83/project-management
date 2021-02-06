import React, { Component } from 'react';
import { Heading, Box } from 'grommet';

export default class Loading extends Component {
  render() {
    return (
      <Box direction="row" fill="horizontal" align="center" justify="center" gap="small">
        <Heading level="2" alignSelf="center" size="large">Loading </Heading>
        <Box animation={{ type: 'jiggle', duration: 100, delay: 200 }}>
          <Heading level="2" alignSelf="center" size="large">...</Heading>
        </Box>
      </Box>
    );
  }
}

