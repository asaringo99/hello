import React from 'react';
import { Container, Button, Typography, Grid, Link } from '@material-ui/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import './fade.css';

const Root: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={styles.root}>
                <TransitionGroup>
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={5000}
                        classNames="fade"
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            className={`${styles.title} ${styles.fadeIn}`}
                        >
                            ようこそ
                        </Typography>
                    </CSSTransition>
                </TransitionGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    className={styles.button}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Root;
