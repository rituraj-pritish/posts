import React from 'react'

import { StyledSidebar } from './Sidebar.styles'
import Tags from './tags/Tags'
import JoinUs from './join-us/JoinUs'

const SidebarContainer = () => {
  return (
    <StyledSidebar>
      <JoinUs/>
      <Tags/>
    </StyledSidebar>
  )
}

export default SidebarContainer
