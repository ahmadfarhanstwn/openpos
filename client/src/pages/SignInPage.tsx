import { ThemeProvider } from '@mui/material/styles'
import { useTheme, Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button, Link } from '@mui/material'
import { AccountBoxRounded } from '@mui/icons-material'

const SignInPage = () => {
    const defaultTheme = useTheme()

    const handleSubmit = () => {}

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems:"center"}}>
                    <Avatar sx={{m: 1, bgcolor: defaultTheme.palette.primary.main}}>
                        <AccountBoxRounded />
                    </Avatar>
                    <Typography component="h1" variant='h5' sx={{fontWeight: 'bold'}}>
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type='password'
                                    id="password"
                                    label="Password"
                                    name="password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <Typography color={defaultTheme.palette.primary.mainText}>
                                Sign In
                            </Typography>
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignInPage