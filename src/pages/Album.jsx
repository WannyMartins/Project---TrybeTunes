import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
    };
  }

  
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">Album</div>
      </>
    );
  }
}

export default Album;
