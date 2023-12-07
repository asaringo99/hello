import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    title: {
        fontSize: '6em',
        marginBottom: '20px',
        textAlign: 'center',
    },
    button: {
        marginBottom: '10px',
        width: '200px',
        height: '50px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    fadeIn: {
        transition: 'opacity 4000ms',
    },
});
