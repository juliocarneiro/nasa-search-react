import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: [],
      search: ''
    }
    this.handleContent = this.handleContent.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleContent(e) {
    this.setState({
      loading: true
    })
    axios.get(`https://images-api.nasa.gov/search?q=${e}&media_type=image`)
      .then(res => {
        this.setState({
          data: res.data.collection.items,
          loading: false
        })
      })
      .catch(error => this.setState({
        error,
        loading: false
      }))
  }
  handleSearch(){
    const e = this.state.search
    this.handleContent(e)
  }
  handleInputChange(self, changeEvent) {
    self.setState({
      [changeEvent.target.name]: changeEvent.target.value
    })
  }
  componentDidMount() {
    this.setState({
      loading:false
    })
  }
  render() {
    const { data } = this.state
    const loader = (
      <div className="load animated fadeIn col-md-12">
        <div id="loader" style={{border: `10px solid black`, borderTop: '10px solid white'}}></div>
        <p>Carregando...</p>
      </div>
    )
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto mt-4 mb-4">
            <form className="row">
              <div className="form-group col-md-6 col">
                <input placeholder="Digite algo para buscar, ex: mars..." type="text" name="search" className="form-control" onChange={(event) => this.handleInputChange(this, event)} />
              </div>
              <div className="col-md-6 col">
              <button type="button" onClick={this.handleSearch} className="btn btn-primary d-block">Buscar</button>
              </div>
            </form>
          </div>
          {
            !this.state.loading ?
            data.map((data, key) =>
              <div className="col-md-4 animated fadeIn" key={key} >
                <div className="card mb-5">
                  <div style={{maxHeight: '350px', overflow: 'hidden'}}>
                    <img className="card-img-top" src={data.links[0].href} alt={data.data[0].description} key={key} />
                  </div>
                  <small className="pl-2 pt-2 text-center">{data.data[0].date_created} - {data.data[0].nasa_id}</small>
                  <div className="card-body">
                    <h5 className="card-title">{data.data[0].title}</h5>
                    <p 
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: data.data[0].description
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : loader
          }
        </div>
      </div>
    );
  }
}

export default App;