import React from 'react';
import Header from '@/components/header';
function Layout(props) {
  return (
    <div>
      <Header {...props} />
      {props.children}
    </div>
  );
}

export default Layout;
