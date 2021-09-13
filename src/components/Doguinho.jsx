import React, { Component } from 'react';
import Loading from './Loading';

class Doguinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dog: '',
    };
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.dog.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { dog: { message } } = this.state;
    localStorage.setItem('last-dog', message);
    const breed = message.split('/')[4];
    alert(breed);
  }

  async fetchDog() {
    try {
      const resp = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await resp.json();
      this.changeState(data);
    } catch (error) {
      console.log(error);
    }
  }

  changeState(data) {
    this.setState({
      loading: false,
      dog: data,
    });
  }

  render() {
    const { loading, dog: { message } } = this.state;

    if (loading) return <Loading />;
    return (
      <main>
        <div>
          <button
            type="button"
            onClick={ this.fetchDog }
          >
            Doguinho
          </button>
        </div>
        <img src={ message } alt="dog" />
      </main>
    );
  }
}

export default Doguinho;
