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
      artista: '',
    };
  }

  handleChange = ({ target }) => { // Desconstrui o target para não usar event.target
    const { value } = target; // pega o name e o value do input que está lá no render, input de pesquisas;
    this.setState({ // pesquisa e artista recebe value do input para gerar a pesquisa,
      artista: value,
      pesquisa: value,
    });
  }

  pesquisar = () => {
    const { pesquisa } = this.state;
    this.setState({
      inputValue: pesquisa, // aqui atribuo a pesquisa a chave do input value para ser pesquisado,
      loading: true, // enquanto espera o retorno da api aparece carregando por isso setei o estado de loading para true
      pesquisa: '', // pesquisa volta novamente a receber o valor de vazio para limpar o input de pesquisa
    }, () => {
      this.respostaApi(); // a função pesquisar recebe a função que se conecta a api como parametro para esperar a resposta da api antes de finalizar o carregando.
    });
  }

  isDisabled = () => {
    const { pesquisa } = this.state;
    const numbMini = 2;// aqui peg o valor da pesquisa no onchange e a medida que vai aparecendo fica desbilitado até chegar no minimo de 2 caracteres para habilitar o botao;
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
