import React from 'react';
import {Link} from 'react-router-dom'

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
