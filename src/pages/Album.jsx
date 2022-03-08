import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      loading: true,
      favoritas: [],
    };
  }

  componentDidMount = () => {
    this.respostaApi();
    getFavoriteSongs()
      .then((favoritas) => this.setState({ favoritas }));
  }

    apiMusicasFavoritas = () => {
      this.setState({ loading: true });
      getFavoriteSongs()
        .then((favoritas) => this.setState({ favoritas, loading: false }));
    }

      respostaApi = () => {
        const { match: { params: { id } } } = this.props;
        getMusics(id)
          .then((response) => this.setState({ musicas: [...response], loading: false }));
      }

      renderAlbum = () => {
        const { musicas, favoritas } = this.state;
        return (
          <div>
            <h1 data-testid="album-name">{ musicas[0].collectionName }</h1>
            <p data-testid="artist-name">{ musicas[0].artistName }</p>
            {/* // posição 0 do array é um collection do album e a partir da posição 1 que tem o track, por isso o uso do slice(1) para eliminar a primeira e poder tocar as musicas. */}
            { musicas.slice(1).map((musica, index) => (<MusicCard
              name={ musica.trackName }
              previewUrl={ musica.previewUrl }
              key={ index }
              trackId={ musica.trackId }
              musica={ musica }
              checked={ favoritas }
              apiMusicasFavoritas={ this.apiMusicasFavoritas }
            />))}
          </div>
        );
      }

      render() {
        const { loading } = this.state;
        return (
          <div data-testid="page-album">
            <Header />
            { loading ? <Carregando /> : this.renderAlbum() }
          </div>
        );
      }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
