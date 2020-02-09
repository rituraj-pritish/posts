import React from 'react'
import Input from '../../common/Input'

const EditPost = ({handleSubmit, handleChange}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input onChange={handleChange} value={}/>
      </form>
    </div>
  )
}

export default EditPost
