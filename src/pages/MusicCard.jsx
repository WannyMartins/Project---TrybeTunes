import propTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, name } = this.props;

    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};

export default MusicCard;
