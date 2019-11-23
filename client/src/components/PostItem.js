import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'

const PostItem = ({_id, title, content, date, user }) => {
  return (
    <div>
      <Link to={`/post/${_id}`} >
      <h3>{title}</h3>
      </Link>
      <br />
      {`-${user.firstName} ${user.lastName}`}
    </div>
  );
};

export default PostItem;
