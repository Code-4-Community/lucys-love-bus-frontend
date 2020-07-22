import React from 'react'
import { Helmet } from 'react-helmet'
import { Container, Box, Typography, Grid } from '@material-ui/core'

const Home = () => {
  return (
    <Container maxWidth='md'>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='Description for the Home page' />
      </Helmet>
      <Box my={4}>
        <Box mb={5}>
          <Typography variant='h2'>Frontend Scaffold</Typography>
          <Typography variant='h4'>
            The scaffold for C4C frontend projects.
          </Typography>

          <Typography variant='subtitle2' gutterBottom>
            Using React+Typescript and Material UI. Routing using React Router,
            and SEO with React Helmet.
          </Typography>
        </Box>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
          spacing={2}
        >
          <Grid item sm>
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
          <Grid item sm>
            <Typography variant='h6'>Subheading2</Typography>
            <Typography variant='body1'>
              Interdum consectetur libero id faucibus nisl tincidunt eget nullam
              non. Eu non diam phasellus vestibulum lorem sed risus ultricies
              tristique. Enim praesent elementum facilisis leo. Quisque egestas
              diam in arcu cursus euismod. Vestibulum mattis ullamcorper velit
              sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo
              eget magna fermentum. Feugiat pretium nibh ipsum consequat nisl
              vel. Lorem sed risus ultricies tristique nulla aliquet enim
              tortor. Vel pretium lectus quam id leo in vitae turpis.
            </Typography>{' '}
          </Grid>
          <Grid item sm>
            <Typography variant='h6'>Subheading3</Typography>
            <Typography variant='body1'>
              Non pulvinar neque laoreet suspendisse interdum consectetur. Proin
              nibh nisl condimentum id venenatis a condimentum. Neque gravida in
              fermentum et sollicitudin ac orci. Condimentum lacinia quis vel
              eros. Ullamcorper velit sed ullamcorper morbi tincidunt ornare
              massa. Tellus pellentesque eu tincidunt tortor aliquam nulla
              facilisi cras fermentum. Ultrices in iaculis nunc sed augue. Metus
              aliquam eleifend mi in. Quam adipiscing vitae proin sagittis.
              Purus gravida quis blandit turpis cursus.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
