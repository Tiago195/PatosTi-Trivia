import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { formatUrl, objCategory, optionCategory,
  optionsType, optionDifficulty, filter, fetchGeneric } from '../../helpers';
import { setUrl } from '../../action';

class Settings extends Component {
constructor(props) {
  super(props)

  this.state = {
    category: '',
    type: '',
    difficulty: '',
    loadind: false,
  }
  this.handleUrl = this.handleUrl.bind(this)
}

  componentDidMount() {
    // this.teste()
  }

  handleUrl({name, value}) {
    this.setState({[name]: value})
  }

  // async teste() {
  //   const filtroUrl = formatUrl(objCategory['Historia em quadrinhos'], 'boolean')
  //   // console.log(filtroUrl)
  //   const results = await (await fetch(filtroUrl)).json()
  //   // console.log(results)
  //   toast.success('🦄 Wow so easy!', {
  //     position: "bottom-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
      
  // }

  async reqApi({category,difficulty,type}) {
    const { setUrl } = this.props;
    this.setState({loadind: true})
    toast.loading('Carregando...', {
      position: "bottom-center",
      theme: 'dark'
    })
    const URL =  formatUrl(filter['category'][category],
      filter['type'][type],
      filter['difficulty'][difficulty]);
    const {results} = await fetchGeneric(URL)
    toast.dismiss();
    if (results.length) {
      toast.success('Tudo certo chef, pode ir jogar', {
        position: "bottom-center",
        theme: 'colored'
      })
    } else toast.error('deu algum B.O. aqui, MB, n tem perguntas para seu filtro', {
      position: "bottom-center",
      theme: 'colored'
    })
    setUrl(URL);
    this.setState({loadind: false})
  }

  render() {
    const { category,difficulty,type, loadind } = this.state;
    const {history} = this.props;
    return (
      <div>
      <h1 data-testid="settings-title">SETTINGS</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <select
          name='category'
          onChange={ ({target})=> this.handleUrl(target) }
          value={ category }
        >
          {optionCategory.map(e => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <select
          name='type'
          onChange={ ({target})=> this.handleUrl(target) }
          value={ type }

        >
          {optionsType.map(e => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <select
          name='difficulty'
          onChange={ ({target})=> this.handleUrl(target) }
          value={ difficulty }
        >
          {optionDifficulty.map(e => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <button
          onClick={ () => this.reqApi(this.state) }
          disabled={ loadind }
        >Aplicar</button>
        <button
          onClick={ () => history.push('/') }
          disabled={ loadind }
        >Home</button>
      </form>
      <ToastContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUrl: (newUrl) => dispatch(setUrl(newUrl)),
})

export default connect(null, mapDispatchToProps)(Settings);
