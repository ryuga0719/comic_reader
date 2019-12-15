import React from 'react';
import BOOK from './BOOK';
import LazyLoad from 'react-lazyload';
import Modal from './modal.js';

class SERIES extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',
      currentBookIndex:undefined,
      modalOpen:false

    };
  }

  componentDidMount(){
    return fetch(`https://wfc2-image-api-259809.appspot.com/api/series/${this.props.id}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: true,
          data: responseJson,
      });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleClickOpen(i) {
   this.setState({currentBookIndex: i,
   modalOpen:true});
  }

  handleClickClose() {
   this.setState({currentBookIndex:undefined});
  }

  handleClickModalClose(){
    this.setState({modalOpen:false});
  }



  render() {
    let modal;
    const message = "上にスクロールすると閲覧できます。";
    const close ="閉じる";
	  if(this.state.currentBookIndex != null && this.state.modalOpen){
	   modal = (
		     <div className="modal_2">

            <div id="caution_modal">
              <div className="caution_modal_inner">
                <p>{message}</p>
                <div className="modal_close_btn">
                  <button onClick={() => this.handleClickModalClose()}>
                    {close}
                  </button>
                </div>
              </div>
            </div>


            <button
          className='modal-close-btn abs'
          onClick={() => this.handleClickClose()}
            >
              <i className="material-icons close">close</i>
            </button>
            <BOOK
              bookid={this.state.data.books[this.state.currentBookIndex].id}
            />
		     </div>
	   );
   }else if (this.state.currentBookIndex != null ) {
     modal = (
         <div className="modal_2">

            <button
          className='modal-close-btn abs'
          onClick={() => this.handleClickClose()}
            >
              <i className="material-icons close">close</i>
            </button>
            <BOOK
              bookid={this.state.data.books[this.state.currentBookIndex].id}
            />
         </div>
     );
   }

     const first = "はじめから読む";
     const read = "読む";
     const author = "作者";
     const pub = "出版社";

    if(this.state.loading){
      return(
        <div className="series_outer">
          <div className="series_middle">
          <div className="series_inner">
            <div className="series_inner_l">
              <img src={ this.state.data.seriesImage }/>
            </div>
            <div className="series_inner_r">
              <p className="series_title">{ this.state.data.title }</p>
              <p className="series_author"><span>{author}</span>{ this.state.data.author }</p>
              <p className="series_publisher"><span>{pub}</span>{ this.state.data.publisher }</p>
              <p className="series_description">{ this.state.data.description }</p>
              <div className="startBtn"
                    onClick={() => {this.handleClickOpen(0)}}
              >{first}</div>
            </div>
          </div>
          </div>{/*series_middle*/}

          <div className="series_detail">
          {this.state.data.books.map((Item, i) => {
              return (
                <div className="series_detail_inner">
                  <div className="series_detail_inner_l">
                    <div className="series_dewtail_inner_img">
                      <LazyLoad height="140px" once>
                        <img src={ Item.image } />
                      </LazyLoad>
                    </div>
                    <p>{Item.title}</p>
                  </div>

                  <div className="BookToBtn"
                    onClick={() => {this.handleClickOpen(i)}}
                  >{read}</div>
                </div>
              );
            })}
          </div>
          {modal}
        </div>
      );
    }else{
      return(
        <div className="App-header">
        </div>
      );
    }
  }
}


export default SERIES;
