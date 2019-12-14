import React from 'react';
import BOOK from './BOOK';

class SERIES extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',
      BookOpen:false

    };
  }

  componentDidMount(){
    return fetch('https://wfc2-image-api-259809.appspot.com/api/series/eE6BFpfm/')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          loading: true,
          data: responseJson,
      });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleClickOpen() {
   this.setState({BookOpen: true});
  }

  handleClickClose() {
   this.setState({BookOpen: false});
  }

  render() {
    let modal;
	  if(this.state.BookOpen){
	   modal = (
		     <div className="modal_2">
            <div className="guide">
              <p>Scroll</p>
              <i className="material-icons">arrow_downward</i>
            </div>
            <button
          className='modal-close-btn abs'
          onClick={() => this.handleClickClose()}
            >
              <i className="material-icons close">close</i>
            </button>
            <BOOK />
		     </div>
	   );
	   }
    if(this.state.loading){
      return(
        <div className="series_outer">
          <div className="series_inner">
            <div className="series_inner_l">
              <img src={ this.state.data.seriesImage }/>
            </div>
            <div className="series_inner_r">
              <p className="series_title">{ this.state.data.title }</p>
              <p className="series_author"><span>author</span>{ this.state.data.author }</p>
              <p className="series_publisher"><span>publisher</span>{ this.state.data.publisher }</p>
              <p className="series_description">{ this.state.data.description }</p>
              <div className="startBtn"
                    onClick={() => {this.handleClickOpen()}}
              >read from first</div>
            </div>
          </div>

          <div className="series_detail">
          {this.state.data.books.map((Item) => {
              return (
                <div className="series_detail_inner">
                  <div className="BookToBtn"
                    onClick={() => {this.handleClickOpen()}}
                  ></div>
                  <div className="series_dewtail_inner_img">
                    <img src={ Item.image } />
                  </div>
                  <p>{Item.title}</p>
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
