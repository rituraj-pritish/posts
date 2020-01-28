import React from 'react'

import BlogSlider from './BlogSlider'

const BlogSliderContainer = () => {
  const posts = [
    {
      title: '5 Hot recipies for parties',
      imageUrl: 'https://demo.goodlayers.com/akea/homepage2/wp-content/uploads/2018/11/yiran-ding-624696-unsplash-600x898.jpg',
      date: '15 Jan 2019',
      author: 'John Doe'
    },

    {
      title: 'Indian thali ',
      imageUrl: 'https://demo.goodlayers.com/akea/homepage2/wp-content/uploads/2018/11/post-beach.jpg',
      date: '15 Jan 2019',
      author: 'John Doe'
    },
  ]

  return (
    <div>
      <BlogSlider posts={posts}/>
    </div>
  )
}

export default BlogSliderContainer
