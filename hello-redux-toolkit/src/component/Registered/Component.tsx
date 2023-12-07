import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styels';
import { Grid, Link, Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const RegistrationSuccess = () => {
    const [isOpen, setIsOpen] = useState(true);
    const styles = useStyles();

    useEffect(() => {
        setTimeout(() => setIsOpen(false), 6000);
    }, []);

    return (
        <Container className={styles.root} maxWidth="md">
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={6000}
                open={isOpen}
                message={
                    <span>
                        <CheckCircleIcon
                            className={styles.icon}
                            style={{ color: 'green' }}
                        />
                        ユーザー登録が完了しました！
                    </span>
                }
            />
            <Typography className={styles.message} variant="h4">
                あなたのアカウントが登録されました！
            </Typography>
            <Grid container justifyContent="center">
                <Grid item>
                    <Link
                        href="/login"
                        variant="body1"
                        className={styles.button}
                    >
                        ログインページへ
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RegistrationSuccess;
