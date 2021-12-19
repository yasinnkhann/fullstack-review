import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br />
    {props.reposImported.length} new repos imported, {props.reposUpdated.length} repos updated.
    <br />
    <br />
  </div>
)

export default RepoList;