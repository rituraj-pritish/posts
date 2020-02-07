import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useLazyQuery } from '@apollo/react-hooks';

import {
  getPostsQuery,
  getTotalPagesQuery
} from '../../../graphql/queries/postQueries';
import './Pagination.css';
import { connect } from 'react-redux';
import { setPosts } from '../../../redux/actions/postsActions';

const Pagination = ({ setPosts }) => {
  const currentPage = window.localStorage.getItem('page') || 1;
  const [getPosts, { loading, error, data }] = useLazyQuery(getPostsQuery);
  const [
    getTotalPages,
    { loading: pagesLoading, error: pagesError, data: pagesData }
  ] = useLazyQuery(getTotalPagesQuery);

  useEffect(() => {
    getTotalPages();
  }, []);

  const handleClick = e => {
    window.localStorage.setItem('page', e.selected + 1);
    getPosts({
      variables: { page: e.selected + 1 }
    });
    if (window.innerHeight > 800) {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  if (error) console.log('err', error);
  if (!loading && !error && data) setPosts(data.getPosts);

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pagesData && pagesData.getTotalPages}
      initialPage={currentPage - 1}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handleClick}
      containerClassName={'pagination'}
      pageClassName={'page'}
      activeClassName={'active'}
    />
  );
};

export default connect(null, { setPosts })(Pagination);
