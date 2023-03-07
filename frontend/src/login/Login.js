import './Login.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
export default function Login() {
  return(<div>
    <Grid 
    container
    spacing ={0}
    direction = 'column'
    alignItems = 'center'
    justifyContent = "center"
    style = {{ minHeight: '75vh'}}
    >
      <Grid>
        <Box
        sx={{
          width: 400,
          height: 400,
          border: '1px solid black',
          borderRadius: '10px'
          }}>
          <SignIn>

          </SignIn>
        </Box>
      </Grid>
    </Grid>
  </div>)
}

// Sign In template from MUI https://github.com/mui/material-ui/blob/v5.11.11/docs/data/material/getting-started/templates/sign-in/SignIn.js
function SignIn() {
    const theme = createTheme();
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    }
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              GPA
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address/Username"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="grey"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
