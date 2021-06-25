import React from 'react';
// import styled from '@emotion/styled';
import styledComponent from 'styled-components'

import { MDXProvider } from '@mdx-js/react';

import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import config from '../../config.js';

// background: '#fff',
// heading: '#000',
// text: '#3B454E',
// preFormattedText: 'rgb(245, 247, 249)',
// link: '#1000EE',

const Wrapper = styledComponent.div`
  display: flex;
  justify-content: space-between;
  background: #fff;

  .sideBarUL li a {
    color: #3B454E;
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
    color: #fff !important;

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styledComponent.main`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: #fff;

  table tr {
    background: #fff};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

const MaxWidth = styledComponent.div`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const LeftSideBarWidth = styledComponent.div`
  width: 298px;
`;

const RightSideBarWidth = styledComponent.div`
  width: 224px;
`;

const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <Wrapper>
        <LeftSideBarWidth className={'hiddenMobile'}>
          <Sidebar location={location} />
        </LeftSideBarWidth>
        {config.sidebar.title ? (
          <div
            className={'sidebarTitle sideBarShow'}
            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
          />
        ) : null}
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
        <RightSideBarWidth className={'hiddenMobile'}>
          <RightSidebar location={location} />
        </RightSideBarWidth>
      </Wrapper>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
