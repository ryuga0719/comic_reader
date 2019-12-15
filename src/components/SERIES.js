import React from 'react';
import BOOK from './BOOK';
import LazyLoad from 'react-lazyload';

class SERIES extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',
      currentBookIndex:undefined

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
   this.setState({currentBookIndex: i});
  }

  handleClickClose() {
   this.setState({currentBookIndex:undefined});
  }



  render() {
    let modal;
	  if(this.state.currentBookIndex != null){
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
            <BOOK
              bookid={this.state.data.books[this.state.currentBookIndex].id}
            />
		     </div>
	   );
	   }

     const first = "はじめから読む";
     const read = "読む";

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
              <p className="series_author">{ this.state.data.author }</p>
              <p className="series_publisher">{ this.state.data.publisher }</p>
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
