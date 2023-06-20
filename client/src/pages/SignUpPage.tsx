import { ThemeProvider, styled } from '@mui/material/styles'
import { useTheme, Container, CssBaseline, Box, Avatar, Typography, Grid, Link } from '@mui/material'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { AccountBoxRounded } from '@mui/icons-material'
import { TypeOf, object, string } from 'zod'
import FormInput from '../components/FormInput'
import DropDownInput, { IMenuItemsValues } from '../components/DropDownInput'
import { useSignUpUserMutation } from '../redux/api/authApi'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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

const signUpSchema = object({
    username: string().min(1, 'Username is required').max(255),
    email: string().min(1, 'Email is required').max(255).email('email is invalid'),
    full_name: string().min(1, 'Full Name is required').max(255),
    password: string().min(1, 'Password is required').min(8, 'Password must be more than 8 characters').
                max(32, 'Password must be less than 32 characters'),
    role: string()
})

export type SignUpInput = TypeOf<typeof signUpSchema>

const roleValues: IMenuItemsValues[] = [
    {label: 'Super Admin', value: 'super_admin'},
    {label: 'Cashier', value: 'cashier'},
    {label: 'Management', value: 'management'},
]

const SignUpPage = () => {
    const defaultTheme = useTheme()
    
    const methods = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema)
    })

    const { reset, handleSubmit, formState: {isSubmitSuccessful} } = methods
    
    const navigate = useNavigate()

    const [signUpUser, {isLoading, isSuccess, isError, error}] = useSignUpUserMutation()

    const onSubmitHandlers: SubmitHandler<SignUpInput> = (values) => {
        signUpUser(values)
    }

    useEffect(() => {
        if (isSuccess) {
          toast.success('User registered successfully');
          navigate('/signin');
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems:"center"}}>
                    <Avatar sx={{m: 1, bgcolor: defaultTheme.palette.primary.main}}>
                        <AccountBoxRounded />
                    </Avatar>
                    <Typography component="h1" variant='h5' sx={{fontWeight: 'bold'}}>
                        Sign Up
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormInput name='username' label='Username' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput name='email' label='Email' type='email' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput name='full_name' label='Full Name' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput name='password' label='Password' type='password' />
                                </Grid>
                                <Grid item xs={12}>
                                    <DropDownInput name='role' label='Role' values={roleValues} />
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
                                    Sign Up
                                </Typography>
                            </LoadingButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have accounts? Sign In
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

export default SignUpPage