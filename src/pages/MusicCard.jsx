import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  addFavoritas = () => {
    const { apiMusicasFavoritas, musica } = this.props;
    this.setState({ loading: true });
    addSong(musica)
      .then(() => {
        apiMusicasFavoritas();
        this.setState({ loading: false });
      });
  }

  render() {
    const { previewUrl, name, trackId, checked } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Carregando />;
    }
    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ name }>
          Favorita
          <input
            type="checkbox"
            id={ name }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked.filter((musica) => musica.trackId === trackId) }
            onClick={ this.addFavoritas }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  musica: PropTypes.shape().isRequired,
  apiMusicasFavoritas: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf().isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
