import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setUsername, setPassword, login } from '../../app/slice/user.slice';
import { RootState } from '../../app/store';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './styles';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const loginUserstate = useAppSelector((state: RootState) => state.login);
    const styles = useStyles();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            `Username: ${loginUserstate.user.name}, Password: ${loginUserstate.user.password}`,
        );
    };

    const handleLogin = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        dispatch(login(loginUserstate.user));
        console.log(loginUserstate.user);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        value={loginUserstate.user.name}
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
                        value={loginUserstate.user.password}
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        className={styles.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Enter
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
