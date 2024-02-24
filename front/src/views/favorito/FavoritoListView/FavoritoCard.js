import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import PetIcon from '@material-ui/icons/Pets';
import PoolIcon from '@material-ui/icons/Pool';
import GourmetAreaIcon from '@material-ui/icons/Fastfood';
import CarIcon from '@material-ui/icons/DirectionsCar';
import WifiIcon from '@material-ui/icons/Wifi';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContentRoot: {
    padding: 5,
    paddingBottom: 16,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    height: 150,
    width: '100%',
  },
  petAvatar: {
    height: 25,
    width: 25,
    color: '#fff',
    backgroundColor: '#87C094',
  },
  poolAvatar: {
    height: 25,
    width: 25,
    color: '#fff',
    backgroundColor: '#76CFD0',
  },
  carAvatar: {
    height: 25,
    width: 25,
    color: '#fff',
    backgroundColor: '#DB6B6B',
  },
  wifiAvatar: {
    height: 25,
    width: 25,
    color: '#fff',
    backgroundColor: '#858DFF',
  },
  gourmetAvatar: {
    height: 25,
    width: 25,
    color: '#fff',
    backgroundColor: '#D9C06D',
  },
}));

const FavoritoCard = ({ openConfirmDialog, className, favorito, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  const handleFavoritePress = () => {
    openConfirmDialog(true);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Box position='relative' mb={3}>
          <Avatar
            alt='Favorito'
            src={favorito.media}
            className={classes.image}
            variant='square'
          />
          <Box display='flex' position='absolute' right={0} bottom={0}>
            <Avatar variant='square' className={classes.wifiAvatar}>
              <WifiIcon style={{ fontSize: 15 }} />
            </Avatar>
            <Avatar variant='square' className={classes.petAvatar}>
              <PetIcon style={{ fontSize: 15 }} />
            </Avatar>
            <Avatar variant='square' className={classes.gourmetAvatar}>
              <GourmetAreaIcon style={{ fontSize: 15 }} />
            </Avatar>
            <Avatar variant='square' className={classes.carAvatar}>
              <CarIcon style={{ fontSize: 15 }} />
            </Avatar>
            <Avatar variant='square' className={classes.poolAvatar}>
              <PoolIcon style={{ fontSize: 15 }} />
            </Avatar>
          </Box>
        </Box>

        <Typography
          align='center'
          color='textPrimary'
          gutterBottom
          variant='h4'
        >
          {favorito.title}
        </Typography>
        <Typography align='center' color='textPrimary' variant='body1'>
          {`${favorito.city}, ${favorito.state}`}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={0.5}>
        <Grid container justify='space-between' spacing={2}>
          <Grid className={classes.statsItem} item>
            <Box component='fieldset' borderColor='transparent'>
              <Rating name='read-only' value={value} readOnly />
            </Box>
          </Grid>
          <IconButton onClick={handleFavoritePress}>
            <FavoriteIcon color='action' />
          </IconButton>
        </Grid>
      </Box>
    </Card>
  );
};

FavoritoCard.propTypes = {
  openConfirmDialog: PropTypes.func,
  className: PropTypes.string,
  favorito: PropTypes.object.isRequired,
};

export default FavoritoCard;
