import React from 'react';

class Modal extends React.Component {
  render(){
    const message = "上にスクロールすると閲覧できます。";
    return(
      <div id="caution_modal">
        <div className="caution_modal_inner">
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

export default Modal;
