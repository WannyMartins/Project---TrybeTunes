import React from 'react';
import Header from '../components/Header';
import Card from './Card';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      inputValue: false,
      responseApi: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      artista: value,
      [name]: value,
    });
  }

  isDisabled = () => {
    const { name } = this.state;
    const minLength = 2;
    return name.length < minLength;
  }

  pesquisar = () => {
    const { name } = this.state;
    const artista = name;
    this.setState({
      artista,
      loading: true,
      inputValue: true,
    }, () => this.buscaApi());
  }

  buscaApi = () => {
    const { artista } = this.state;
    searchAlbumsAPI(artista)
      .then((response) => this.setState(
        {
          responseApi: [...response],
          inputValue: true,
          loading: false,
        },
      ));
  }

  renderCard = () => {
    const { responseApi } = this.state;
    return responseApi.map((element, index) => (<Card
      key={ index }
      artistName={ element.artistName }
      collectionName={ element.collectionName }
      collectionPrice={ element.collectionPrice }
      artworkUrl100={ element.artworkUrl100 }
      releaseDate={ element.releaseDate }
      collectionId={ element.collectionId }
    />));
  }

  render() {
    const { name, loading, artista, inputValue, responseApi } = this.state;
    const respostaApi = (
      <div>
        <h2>
          { responseApi.length ? `Resultado de álbuns de: ${artista}`
            : 'Nenhum álbum foi encontrado' }
        </h2>
        { this.renderCard() }
      </div>
    );
    const resultado = (
      <div data-testid="page-search">
        <input
          type="text"
          data-testid="search-artist-input"
          name="name"
          placeholder="Busque por Nome do Artista"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ this.isDisabled() }
          onClick={ this.pesquisar }
        >
          Pesquisar
        </button>
        { loading ? <Carregando /> : '' }
        { inputValue ? respostaApi : '' }
      </div>

    );
    return (
      <>
        <Header />
        { loading ? <Carregando /> : resultado }
      </>
    );
  }
}

export default Search;
