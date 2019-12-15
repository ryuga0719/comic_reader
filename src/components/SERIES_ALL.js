import React from 'react';
import SERIES from './SERIES';
import AppBar from './AppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SERIES_ALL extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',
      currentIndex: undefined
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

  handleClickOpen(i) {
   this.setState({currentIndex: i});
  }

  handleClickClose() {
   this.setState({currentIndex: undefined});
  }



  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "40px",
      slidesToShow: 3,
      speed: 500 ,
    };

    if(this.state.loading == false){
      return(
      <div className="App-header">
      </div>
      );
    }
    let modal;
	  if(this.state.currentIndex != null){
	   modal = (
		     <div className="modal_1">
         <AppBar />
          <div className="btn_div">
            <button
            className='modal-close-btn'
            onClick={() => this.handleClickClose()}
            >
              <i className="material-icons back">arrow_back</i>
              </button>
          </div>
          <SERIES
            id={this.state.data.data[this.state.currentIndex].seriesId}
          />
		     </div>
	   );
	   }
    if(this.state.loading){
      return(
        <div className="series_all_outer">
          <Slider {...settings}>
          {this.state.data.data.map((Item, i) => {
              return (
                <div className="series_all_inner" >
                  <div className="inner_container" onClick={() => {this.handleClickOpen(i)}}>
                    <div className="inner_container_img">
                      <img src={ Item.seriesImage } />
                    </div>
                    <p className="series_all_title">{Item.title}</p>
                    {/*<p className="series_all_description">{Item.description}</p>*/}
                  </div>
                </div>

              );
            })}
            </Slider >
            {modal}
        </div>
      );
    }
  }
}


export default SERIES_ALL;
