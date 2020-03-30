import React from 'react'
import ReactDOM from 'react-dom'

function Welcome (props) {
  "use strict";
  return (
    <div className="shopping-list">
      <h1>Shopping List for { props.name }</h1>
      <ul>
        <li>Instagram</li>
        <li>WhatsApp</li>
      </ul>
    </div>
  )
}
const div = document.createElement('div');
ReactDOM.render(
  <Welcome name={'Jack'} />,
  document.getElementById('root')
)