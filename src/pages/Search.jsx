import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import Card from './Card';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      retornoApi: [],
      loading: false,
      inputValue: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      artista: value,
      [name]: value,
    });
  }

  pesquisar = () => {
    const { pesquisa } = this.state;
    const inputValue = pesquisa;
    this.setState({
      inputValue,
      loading: true,
      pesquisa: '',
    }, () => {
      this.respostaApi();
    });
  }

  isDisabled = () => {
    const { pesquisa } = this.state;
    const numbMini = 2;
    return pesquisa.length < numbMini;
  }

  respostaApi = () => {
    const { inputValue } = this.state;
    searchAlbumsAPI(inputValue)
      .then((response) => this.setState(
        { retornoApi: [...response], inputValue: true, loading: false },
      ));
  }

  renderCard() {
    const { retornoApi } = this.state;
    return retornoApi.map((element, index) => (<Card
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
    const { pesquisa, loading, artista, inputValue, retornoApi } = this.state;
    const respostaApi = (
      <section>
        <h2>
          { retornoApi.length ? `Resultado de álbuns de: ${artista}`
            : 'Nenhum álbum foi encontrado' }
        </h2>
        { this.renderCard() }
      </section>
    );
    const resultado = (
      <form>
        <label htmlFor="pesquisa">
          <input
            data-testid="search-artist-input"
            name="pesquisa"
            value={ pesquisa }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ this.isDisabled() }
          data-testid="search-artist-button"
          onClick={ this.pesquisar }
        >
          Pesquisar
        </button>
        { loading ? <Carregando /> : '' }
        { inputValue ? respostaApi : '' }
      </form>
    );
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Carregando /> : resultado }
      </div>
    );
  }
}

export default Search;
