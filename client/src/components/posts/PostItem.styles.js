import styled from 'styled-components'

export const StyledPostItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3,1fr);
  grid-template-rows: 1fr 1.5fr 0.5fr;
  grid-gap: 10px;
  padding: 1rem 1rem 1rem 0;
  transition: 0.2s;
  background: #fff;
  cursor: pointer;
  min-height: 220px;
  color: ${({theme}) => theme.colors.black};

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 0 10px 10px #00000033;
  }

  &:hover > p {
    transition: 0.2s;
    color: black;
  }

  & > div > p:first-child:hover,p:last-child span:hover {
    transition: 0.2s;
    color: ${({theme}) => theme.colors.primary};
  }
`
export const Divider = styled.div`
  height: 1px;
  background: grey;
  width: 100%;
`