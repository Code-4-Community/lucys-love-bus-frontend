import React from 'react'
import { Helmet } from 'react-helmet'
import { Container, Box, Typography, Grid } from '@material-ui/core'

function Home () {
  return (
    <Container maxWidth='md'>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='Description for the Home page' />
      </Helmet>
      <Box my={4}>
        <Box height='12em'>
          <Typography variant='h2'>Frontend Scaffold</Typography>
          <Typography variant='h4'>
            The scaffold for C4C frontend projects.
          </Typography>

          <Typography variant='subtitle2' gutterBottom>
            Using React+Typescript and Material UI. Its probably better than
            what we had before.
          </Typography>
        </Box>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item xs>
            <Typography variant='h6'>Subheading1</Typography>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat nisl pretium fusce id velit ut tortor pretium. Nulla
              aliquet enim tortor at. Sit amet est placerat in. Semper feugiat
              nibh sed pulvinar proin gravida hendrerit lectus. Morbi enim nunc
              faucibus a pellentesque. Turpis massa sed elementum tempus. Nulla
              at volutpat diam ut venenatis tellus. Dignissim cras tincidunt
              lobortis feugiat vivamus at augue eget.{' '}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant='h6'>Subheading2</Typography>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat nisl pretium fusce id velit ut tortor pretium. Nulla
              aliquet enim tortor at. Sit amet est placerat in. Semper feugiat
              nibh sed pulvinar proin gravida hendrerit lectus. Morbi enim nunc
              faucibus a pellentesque. Turpis massa sed elementum tempus. Nulla
              at volutpat diam ut venenatis tellus. Dignissim cras tincidunt
              lobortis feugiat vivamus at augue eget.{' '}
            </Typography>{' '}
          </Grid>
          <Grid item xs>
            <Typography variant='h6'>Subheading3</Typography>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat nisl pretium fusce id velit ut tortor pretium. Nulla
              aliquet enim tortor at. Sit amet est placerat in. Semper feugiat
              nibh sed pulvinar proin gravida hendrerit lectus. Morbi enim nunc
              faucibus a pellentesque. Turpis massa sed elementum tempus. Nulla
              at volutpat diam ut venenatis tellus. Dignissim cras tincidunt
              lobortis feugiat vivamus at augue eget.{' '}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
