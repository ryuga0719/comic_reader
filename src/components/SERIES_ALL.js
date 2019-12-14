import React from 'react';
import SERIES from './SERIES';
import AppBar from './AppBar';

class SERIES_ALL extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',
      isModalOpen: false

    };
  }

  componentDidMount(){
    return fetch('https://wfc2-image-api-259809.appspot.com/api/series/')
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
   this.setState({isModalOpen: true});
  }

  handleClickClose() {
   this.setState({isModalOpen: false});
  }


  render() {
    if(this.state.loading == false){
      return(
      <div className="App-header">
      </div>
      );
    }
    let modal;
	  if(this.state.isModalOpen){
	   modal = (
		     <div className="modal_1">
         <AppBar />
          <div className="btn_div">
            <button
            className='modal-close-btn'
            onClick={() => this.handleClickClose()}
            >
              <i class="material-icons back">arrow_back</i>
              </button>
          </div>
          <SERIES />
		     </div>
	   );
	   }
    if(this.state.loading){
      return(
        <div className="series_all_outer">
          {this.state.data.data.map((Item) => {
              return (
                <div className="series_all_inner">
                  <div className="DetailToBtn"
                 onClick={() => {this.handleClickOpen()}}
                  ></div>
                  <img src={ Item.seriesImage } />
                  <p>{Item.title}</p>
                </div>
              );
            })}
            {modal}
        </div>
      );
    }
  }
}


export default SERIES_ALL;
