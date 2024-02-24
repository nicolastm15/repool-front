import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import AuthContext from 'src/contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    cel: user.cel,
    tel: user.tel,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete='off' noValidate className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader='As informações abaixo podem ser editadas' title='Seus dados' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Nome Completo'
                name='name'
                onChange={handleChange}
                required
                value={values.name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label='Email'
                name='email'
                onChange={handleChange}
                value={values.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Biografia'
                name='biografia'
                onChange={handleChange}
                value={values.bio}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Celular'
                name='Celular'
                required
                onChange={handleChange}
                value={values.cel}
                variant='outlined'
              />
            </Grid>
            {user.tel ? (
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Telefone Residencial'
                  name='phone'
                  onChange={handleChange}
                  value={values.cel}
                  variant='outlined'
                />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </CardContent>
        <Divider />
        {/* TODO Fazer esses botões mais responsivos */}
        <Box display='flex' flexWrap='wrap' justifyContent='flex-end' p={2}>
          <Button style={{ margin: 8 }} color='primary' variant='contained'>
            Salvar
          </Button>
          <Button style={{ margin: 8 }} variant='contained'>
            Cancelar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
