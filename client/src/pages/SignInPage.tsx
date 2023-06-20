import { ThemeProvider, styled } from '@mui/material/styles'
import { useTheme, Container, CssBaseline, Box, Avatar, Typography, Grid, Link } from '@mui/material'
import { AccountBoxRounded } from '@mui/icons-material'
import { TypeOf, object, string } from 'zod'
import FormInput from '../components/FormInput'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInUserMutation } from '../redux/api/authApi'
import {useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom'

const LoadingButton = styled(_LoadingButton)`
    padding: 0.6rem 0;
    background-color: #FF8551;
    color: #2363eb;
    font-weight: 500;

    &:hover {
        background-color: #9ac5f4;
        transform: translateY(-2px);
    }
`

const signInSchema = object({
    username: string().min(1, 'Username is required').max(255),
    password: string().min(1, 'Password is required').min(8, 'Password must be more than 8 characters').
                max(32, 'Password must be less than 32 characters')
})

export type SignInInput = TypeOf<typeof signInSchema>

const SignInPage = () => {
    const defaultTheme = useTheme()

    const methods = useForm<SignInInput>({
        resolver: zodResolver(signInSchema)
    })

    const { reset, handleSubmit, formState: {isSubmitSuccessful} } = methods

    const [signInUser, {isLoading, isSuccess, isError, error}] = useSignInUserMutation()

    const onSubmitHandlers: SubmitHandler<SignInInput> = (values) => {
        signInUser(values)
    }

    const navigate = useNavigate()
    const location = useLocation()
    const from = ((location.state as any)?.from.pathname as string) || '/dashboard';

    useEffect(() => {
        if (isSuccess) {
          toast.success('Sign In Successfully');
          navigate(from);
        }
    
        if (isError) {
          console.log(error);
          if (Array.isArray((error as any).data.error)) {
            (error as any).data.error.forEach((el: any) =>
              toast.error(el.message, {
                position: 'top-right',
              })
            );
          } else {
            toast.error((error as any).data.message, {
              position: 'top-right',
            });
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLoading]);

      useEffect(() => {
        if (isSubmitSuccessful) {
          reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSubmitSuccessful]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems:"center"}}>
                    <Avatar sx={{m: 1, bgcolor: defaultTheme.palette.primary.main}}>
                        <AccountBoxRounded />
                    </Avatar>
                    <Typography component="h1" variant='h5' sx={{fontWeight: 'bold'}}>
                        Sign In
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormInput name='username' label='Username' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput name='password' label='Password' type='password' />
                                </Grid>
                            </Grid>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disableElevation
                                loading={isLoading}
                            >
                                <Typography color={defaultTheme.palette.primary.mainText}>
                                    Sign In
                                </Typography>
                            </LoadingButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </FormProvider>
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    )
}

export default SignInPage