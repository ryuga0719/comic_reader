import React from 'react';

class AppBar extends React.Component {
  render(){
    return(
      <div className="app_bar">
        <i className="material-icons book">menu_book</i>
        <h1>Comic Reader</h1>
      </div>
    );
  }
}

export default AppBar;
