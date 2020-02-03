import React from 'react'

import { StyledSidebar } from './Sidebar.styles'
import Categories from '../categories/Categories'
import JoinUs from '../join-us/JoinUs'

const SidebarContainer = () => {
  return (
    <StyledSidebar>
      <JoinUs/>
      <Categories/>
    </StyledSidebar>
  )
}

export default SidebarContainer
