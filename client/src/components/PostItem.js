import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import { Collapse } from '@material-ui/core';

const PostItem = ({_id, title, claps,date, user, views }) => {
  return (
    <div>
      <Link to={`/post/${_id}`} >
      <h3>{title}</h3>
      </Link>
      <br />
      {`-${user.firstName} ${user.lastName}`}
      Views: {views} Claps: {claps.length}
    </div>
  );
};

export default PostItem;
