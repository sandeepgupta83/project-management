import React, { Component } from 'react';
import {
    Grid, Heading, Box,
    Table, TableHeader, TableRow, TableCell, TableBody
} from 'grommet';
import _ from 'underscore';
import axios from '../../utils/axios'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProjects: [] 
        }
    }

    componentDidMount() {
        axios.get('/project/')
        .then((response) => {
            console.log(`All projects ${response.data}`)
            this.setState({
                allProjects: response.data
            })
        })
        .catch((err) => {
            console.log(`Error fetching data ${err}`);
        });
    }
    
    render() {
        let project_data = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                          Project ID
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Name
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Description
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Start Date
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.state.allProjects.map(value => (
                      <TableRow>
                        <TableCell scope="row">
                          <strong>{value.project_id}</strong>
                        </TableCell>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.description}</TableCell>
                      <TableCell>{value.start_date}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
            </Table>
        );
        return (
        <Grid
            // columns={['flex', 'medium']}
            // columns={['large', 'flex']}
            columns="full"
            rows="full"
            fill
        >
        <Box
          pad="xsmall"
          wrap
          animation={{ type: 'zoomIn', duration: 100, delay: 200 }}
          margin="xsmall"
          gap="xsmall"
          basis="auto"
          background="light-1"
          align="start"
          responsive={false}
        >

          <Box align="start">
            <Box align="start" direction="row">
              <Box>
                <Heading margin="small" pad="small" level="3" size="small" strong>
                  {'Project Services'}
                </Heading>
              </Box>
            </Box>
          </Box>
          <Box margin="medium" alignSelf="center" align="start">
            <Box align="start" direction="row">
            </Box>
            <Box>
              {project_data}
            </Box>

          </Box>
        </Box>
      </Grid>
        );
    }
}

export default Project;
