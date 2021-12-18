import React, { Component, Fragment } from 'react';
import Repo from './Repo.jsx';

export default class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // BINDERS
  };

  render() {
    const mappedRepos = this.props.repos.map(repo => (
      <Repo
        key={repo._id}
        repo={repo}
      />
    ))
    return (
      <Fragment>
        {mappedRepos}
      </Fragment>
    );
  }
}