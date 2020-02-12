import styled from 'styled-components';

export const StyledComment = styled.div`
  position: relative;
  i {
    color: #848484;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #dcdcdc;
  width: 90%;
  margin: 0 auto;
`;

export const StyledDelete = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 2rem;
  cursor: pointer;
  & svg:hover {
    color: red !important;
  }
`;