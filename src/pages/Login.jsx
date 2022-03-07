import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isDisabled = () => {
    const { name } = this.state;
    const minLength = 3;
    return name.length < minLength;
  }

  entrar = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      redirect: true,
    });
  }

  carregarPagina = (formulario) => {
    const { loading, redirect } = this.state;
    if (loading) {
      if (redirect) {
        return <Redirect to="/search" />;
      }
      return <Carregando />;
    }
    return formulario;
  }

  render() {
    const { name, loading, redirect } = this.state;
    const formulario = (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ this.isDisabled() }
          onClick={ this.entrar }
        >
          Entrar
        </button>
      </div>);
    return (
      this.carregarPagina(formulario, redirect, loading)
    );
  }
}

export default Login;
