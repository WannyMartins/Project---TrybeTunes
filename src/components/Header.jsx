import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.usuario();
  }

  usuario = async () => {
    const nome = await getUser();
    this.setState({
      name: nome.name,
      loading: true,
    });
  }

  render() {
    const { name, loading } = this.state;
    const cabecalho = (
      <div>
        <h1 data-testid="header-user-name">{ name }</h1>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search" />
            Página De Pesquisa
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites" />
            Músicas Favoritos
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile" />
            Profile
          </li>
        </ul>
      </div>
    );
    return (
      <header data-testid="header-component">
        { loading ? cabecalho : <Carregando /> }
      </header>);
  }
}

export default Header;
