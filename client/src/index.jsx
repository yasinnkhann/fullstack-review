import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repos from './components/Repos.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      reposUpdated: [],
      reposImported: []
    };
    // BINDERS
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.get('http://localhost:1128/repos')
      .then(res => {
        console.log('GET RESPONSE ON MOUNT: ', res);
        this.setState({ repos: res });
      })
      .catch(err => console.error(err))
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({ username: term }),
      contentType: 'application/json',
      success: (resp) => {
        console.log('POST RESPONSE: ', resp);
        this.setState({ reposImported: resp });
        $.get('http://localhost:1128/repos')
          .then(res => {
            console.log('UPDATED GET RESPONSE!: ', res);
            this.setState({ repos: res });
          })
          .catch(err => console.error(err))
      },
      error: (err) => {
        console.error('ERROR: ', err);
      }
    });
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList
        repos={this.state.repos}
        reposImported={this.state.reposImported}
        reposUpdated={this.state.reposUpdated}
      />
      <Repos repos={this.state.repos} />
      <Search onSearch={this.search} />
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));