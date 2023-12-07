import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import {
    setUsername,
    setPassword,
    setEmail,
    signup,
} from '../../app/slice/signup.slice';
import { RootState } from '../../app/store';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const signupUserstate = useAppSelector((state: RootState) => state.signup);
    const styles = useStyles();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            `Username: ${signupUserstate.user.name}, Password: ${signupUserstate.user.password}`,
        );
    };

    const handleSignUp = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        dispatch(signup(signupUserstate.user));
        console.log(signupUserstate.user);
        navigate('/registered');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={signupUserstate.user.name}
                        inputProps={{ maxlength: 20 }}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={signupUserstate.user.password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        value={signupUserstate.user.email}
                        onChange={handleEmailChange}
                    />
                    <Button
                        className={styles.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {'Already have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                {user.loggedIn && <div>You are logged in</div>}
            </Box> */}
        </Container>
    );
};

export default Signup;
