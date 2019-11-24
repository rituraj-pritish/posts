import React,{useRef,useEffect,useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Select, MenuItem, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';

import { getPostsQuery } from '../graphql/queries';
import PostsList from './PostsList';

const Home = ({ auth }) => {
  let [sortCategory, setSortCategory] = useState('date')
  const { loading, error, data } = useQuery(getPostsQuery);

  const [posts,setPosts] = useState(data ? data.getPosts : undefined)

  useEffect(() => {
    console.log('ran');
    switch(sortCategory) {
      case 'claps':
        setPosts(posts.sort((a,b) => b.claps.length - a.claps.length )) 
      case 'views':
        setPosts(posts.sort((a,b) => b.views - a.views))
      default:
        setPosts(data ? data.getPosts : undefined)
    }
  },[sortCategory])

  if (loading) return <CircularProgress />;

  if (error) return <div>Oooops... Something went wrong. Please try again</div>;

  const handleSelectChange = e => {

    setSortCategory(e.target.value)

  }

  console.log(posts);

  if(posts === undefined) {
  setPosts(data.getPosts)
  }
  const sort = true
  return (
    <div>
      filter by drop down
      <InputLabel>Sort By</InputLabel>
      <Select value={sortCategory} onChange={handleSelectChange} >
        <MenuItem value={'claps'}>Most Clapped</MenuItem>
        <MenuItem value={'date'}>Date</MenuItem>
        <MenuItem value={'views'}>Most Viewed</MenuItem>
      </Select>
      <PostsList sort={!sort} posts={posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
