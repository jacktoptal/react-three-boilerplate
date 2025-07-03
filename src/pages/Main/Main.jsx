import React from 'react';
import styled from 'styled-components';

import PageTransition from 'components/PageTransition';
import ThreeViewer from 'components/ThreeViewer';

export default function Main() {
  return (
    <PageTransition>
      <Holder>
        <ViewerContainer>
          <ThreeViewer />
        </ViewerContainer>
      </Holder>
    </PageTransition>
  );
}

const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ViewerContainer = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 25em;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
`;
