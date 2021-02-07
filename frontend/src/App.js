/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react'
import { Tabs, Tab, Grommet, Box, Header, Text, Footer, Button, Grid} from 'grommet'
import { Projects } from 'grommet-icons'
import { hpe as theme } from 'grommet-theme-hpe'
import Employee from './screens/EmployeeService/Employee'
import Project from './screens/ProjectService/Project'
import EmployeeForm from './screens/EmployeeService/EmployeeForm'
import AssignEmployee from './screens/EmployeeService/AssignEmployee'
import ProjectForm from './screens/ProjectService/ProjectForm'
import UpdateProject from './screens/ProjectService/UpdateProject'


class ProjectManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };
  onclose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <Grommet full theme={theme} themeMode="dark">
        <Box fill="vertical" overflow="auto" align="center" flex="grow" justify="between">
          <Header align="center" direction="row" flex={false} justify="end" gap="medium" fill="horizontal" pad="medium">
            <Box align="center" justify="center" direction="row" gap="small">
              <Projects color="brand" size="large" />
              <Box align="center" justify="center" direction="row" gap="xsmall">
                <Text weight="bold" color="text-strong" size="xlarge">
                  The Project 
                </Text>
                <Text color="text-strong" size="xlarge">
                  Management App
                </Text>
              </Box>
            </Box>
            <Box align="center" justify="center" background={{"color":"background-contrast"}} round="full" pad="small" width="xxsmall" height="xxsmall">
              <Text textAlign="center" color="text-strong">
                LLP
              </Text>
            </Box>
          </Header>
          <Box pad="large" height="100%">
            <Grid gap="medium" columns={{ count: 'fit', size: 'small' }}>
            <Tabs height='medium' flex='grow' alignSelf='center'>
                <Tab title='Projects'>
                    <Box
                        margin='small'
                        pad='small'
                    >
                      <Project/>
                    </Box>
                </Tab>
                <Tab title='Employees'>
                    <Box
                        margin='small'
                        pad='small'
                    >
                      <Employee/>
                    </Box>
                </Tab>
                <Tab title='Add Project'>
                    <Box
                        flex='grow'
                        margin='small'
                        pad='small'
                    >
                    <ProjectForm/>
                    </Box>
                </Tab>
                <Tab title='Add Employee'>
                    <Box
                        flex='grow'
                        margin='small'
                        pad='small'
                    >
                    <EmployeeForm/>
                    </Box>
                </Tab>
                <Tab title='Assign Employee'>
                    <Box
                        flex='grow'
                        margin='small'
                        pad='small'
                    >
                    <AssignEmployee/>
                    </Box>
                </Tab>
                <Tab title='Update Project'>
                    <Box
                        flex='grow'
                        margin='small'
                        pad='small'
                    >
                    <UpdateProject/>
                    </Box>
                </Tab>
                
            </Tabs>
            </Grid>
          </Box>
          <Footer align="center" direction="row-responsive" flex={false} justify="between" gap="medium" fill="horizontal" pad="medium" background={{"color":"background-front"}}>
            <Text>
              © 2021 The Project Management App
            </Text>
            <Box align="center" justify="start" direction="row" gap="small">
              <Button label="Terms" plain />
              <Button label="Privacy" plain />
              <Button label="Security" plain />
              <Button label="Feedback" plain />
            </Box>
          </Footer>
        </Box>
      </Grommet>
    );
  }
}

export default ProjectManagementContainer;