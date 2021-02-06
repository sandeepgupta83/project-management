import React, { Component } from 'react';
import {
    Grid, Heading, Box,
    Table, TableHeader, TableRow, TableCell, TableBody
} from 'grommet';
import _ from 'underscore';
import axios from '../../utils/axios'

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEmployees: [] 
        }
    }

    componentDidMount() {
        axios.get('/employee/')
        .then((response) => {
            console.log(`All employees ${response.data}`)
            this.setState({
                allEmployees: response.data
            })
        })
        .catch((err) => {
            console.log(`Error fetching data ${err}`);
        });
    }
    
    render() {
        let employee_data = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                          Employee Name
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Employee ID
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Project ID
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Created At
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.state.allEmployees.map(value => (
                      <TableRow>
                        <TableCell scope="row">
                          <strong>{value.full_name}</strong>
                        </TableCell>
                      <TableCell>{value.employee_id}</TableCell>
                      <TableCell>{value.project_id}</TableCell>
                      <TableCell>{value.created_at}</TableCell>
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
                  {'Employee Services'}
                </Heading>
              </Box>
            </Box>
          </Box>
          <Box margin="medium" alignSelf="center" align="start">
            <Box align="start" direction="row">
            </Box>
            <Box>
              {employee_data}
            </Box>

          </Box>
        </Box>
      </Grid>
        );
    }
}

export default Employee;
