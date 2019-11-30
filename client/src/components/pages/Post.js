import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  CircularProgress,
  IconButton,
  Icon,
  Divider,
  Grid,
  Container,
  Badge,
  Typography,
  ButtonGroup,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alerts';
import {
  getPostQuery,
  getClapsOfPostQuery,
  getPostsQuery,
  getUserQuery
} from '../../graphql/queries';
import {
  addClapMutation,
  removeClapMutation,
  deletePostMutation
} from '../../graphql/mutations';
import CommentsList from '../posts/CommentsList';
import DeletePostDialog from '../posts/DeletePostDialog';
import Author from '../posts/Author';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    margin: '25px 0',
    whiteSpace: 'pre-line'
  },
  header: {
    marginBottom: '25px'
  },
  clap: {
    fontSize: '50px'
  },
  aboutClap: {
    color: theme.palette.primary.dark
  },
  divider: {
    height: '2px',
    backgroundColor: theme.palette.secondary.main,
    margin: '10px 0'
  },
  commentsList: {
    marginTop: '20px'
  },
  deleteButton: {
    '&:hover': {
      backgroundColor: theme.palette.delete
    }
  },
  image: {
    height: '400px',
    width: '100%',
    marginBottom: '15px'
  }
}));

const Post = props => {
  const classes = useStyles();
  const postId = props.match.params.postId;

  const [open, setOpen] = useState(false);
  const [deletePost, deletePostRes] = useMutation(deletePostMutation);
  const [addClap, addClapRes] = useMutation(addClapMutation, {
    variables: { postId },
    refetchQueries: [
      {
        query: getClapsOfPostQuery,
        variables: { postId }
      }
    ]
  });
  const [removeClap, removeClapRes] = useMutation(removeClapMutation, {
    variables: { postId },
    refetchQueries: [
      {
        query: getClapsOfPostQuery,
        variables: { postId }
      }
    ]
  });
  const getClaps = useQuery(getClapsOfPostQuery, {
    variables: { postId }
  });
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { postId }
  });

  const [clapsCount, setClapsCount] = useState(0);

  useEffect(() => {
    if (!loading && !error) {
      setClapsCount(data.getPost.claps.length);
    }

    if (!getClaps.loading && !getClaps.error) {
      setClapsCount(getClaps.data.getClapsOfPost.length);
    }

    if (deletePostRes.data && deletePostRes.data.deletePost) {
      props.history.push('/dashboard');
    }
  }, [
    removeClapRes.loading,
    addClapRes.loading,
    loading,
    error,
    getClaps,
    deletePostRes.loading,
    deletePostRes.error
  ]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Ooops... , Something went wrong</div>;

  const { title, content,imageUrl, user, userId, date, comments, claps } = data.getPost;

  let currentUserId = '';
  if (props.auth.isAuth) {
    currentUserId = props.auth.user._id;
  }

  const isAlreadyClapped = getClaps.data.getClapsOfPost.find(
    clap => clap.userId.toString() === currentUserId
  );

  const handleClapButton = () => {
    if (isAlreadyClapped) {
      removeClap();
    } else {
      addClap();
    }
  };

  const handleEdit = () => {
    return props.history.push(`/edit-post/${postId}`)
  };

  const handleDelete = () => {
    deletePost({
      variables: { postId },
      refetchQueries: [
        {
          query: getPostsQuery
        },
        {
          query: getUserQuery,
          variables: { userId: currentUserId }
        }
      ]
    });
  };

  return (
    <div>
      <Container className={classes.root}>

        <Grid className={classes.header} container justify='space-between'>
          <Grid item>
            <Moment format='D MMM YYYY'>{date}</Moment>
          </Grid>
          <Grid item>
            {userId !== currentUserId ? (
              <Typography>
                <i>by</i>
                {' ' +
                  user.firstName.toUpperCase() +
                  ' ' +
                  user.lastName.toUpperCase()}
              </Typography>
            ) : (
              <ButtonGroup>
                <Button
                  startIcon={<Icon className='fas fa-edit' />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<Icon className='fas fa-trash-alt' />}
                  onClick={() => setOpen(true)}
                  className={classes.deleteButton}
                >
                  Delete
                </Button>
              </ButtonGroup>
            )}
          </Grid>
        </Grid>

        {imageUrl && <img className={classes.image} src={imageUrl} alt={title} />}

        <Grid container justify='center'>
          <Typography variant='h4'>
            {title[0].toUpperCase() + title.slice(1)}
          </Typography>
        </Grid>

        <Typography className={classes.content}>{content}</Typography>

        <Grid container justify='center' alignItems='center' >
          <span className={classes.aboutClap}>
            CLAP and make noise for the post
          </span>
          <Badge badgeContent={clapsCount} color='secondary'>
            <IconButton
              disabled={!props.auth.isAuth}
              color='secondary'
              onClick={handleClapButton}
            >
              <Icon className={clsx('fas fa-sign-language', classes.clap)} color='secondary' />
            </IconButton>
          </Badge>
        </Grid>

        <Divider className={classes.divider} />
        <Author {...user} />
        <Divider className={classes.divider} />
        
        <div className={classes.commentsList}>
          <CommentsList postId={postId} comments={comments} />
        </div>
      </Container>
      <DeletePostDialog
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Post);
