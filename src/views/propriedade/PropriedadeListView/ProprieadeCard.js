import React from 'react';
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
} from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const PropriedadeCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display='flex' justifyContent='center' mb={3}>
          <Avatar alt='Product' src={product.media} variant='square' />
        </Box>
        <Typography
          align='center'
          color='textPrimary'
          gutterBottom
          variant='h4'
        >
          {product.title}
        </Typography>
        <Typography align='center' color='textPrimary' variant='body1'>
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify='space-between' spacing={2}>
          <Grid className={classes.statsItem} item>
            <StarRateIcon className={classes.statsIcon} color='action' />
            <Typography color='textSecondary' display='inline' variant='body2'>
              {product.totalDownloads}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

PropriedadeCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default PropriedadeCard;
