import React, { Component } from 'react';
import {
    Grid, Heading, Box, TextArea, Select,
    Form, FormField, TextInput, Button
} from 'grommet';
import _ from 'underscore';
import axios from '../../utils/axios'

class UpdateProject extends Component {
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
        <Form
            value={'test'}
            onChange={event => this.setValue(event.target.value)}
            onReset={(event) => this.setValue(event.target.value)}
            onSubmit={({ value }) => {}}
        >
            <FormField name="name" htmlFor="text-input-id" label="Project Name">
                <TextInput id="text-input-id" name="name" />
            </FormField>
            <FormField name="name" htmlFor="text-input-id" label="Description">
                <TextArea id ="text-area-input-id" placeholder="TextArea" />
            </FormField>
            <FormField name="name" htmlFor="text-input-id" label="Project ID">
                <TextInput id="text-input-id" name="name" />
            </FormField>
            <FormField name="name" htmlFor="text-input-id" label="Employees List">
                <Select
                    placeholder="Select"
                    options={['John', 'Jane', 'Shawn']}
                    onChange={() => {}}
                />
            </FormField>
            <Box direction="row" gap="medium">
                <Button type="submit" primary label="Submit" />
                <Button type="reset" label="Reset" />
            </Box>
        </Form>
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
                <Heading margin="xsmall" pad="xsmall" level="3" size="small" strong>
                  {'Update Project'}
                </Heading>
              </Box>
            </Box>
          </Box>
          <Box margin="small" alignSelf="center" align="start">
            {/* <Box align="start" direction="row">
            </Box> */}
            <Box>
              {project_data}
            </Box>

          </Box>
        </Box>
      </Grid>
        );
    }
}

export default UpdateProject;
