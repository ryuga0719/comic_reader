import React from 'react';
import LazyLoad from 'react-lazyload';

class BOOK extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      data: '',

    };
  }

  componentDidMount(){
    return fetch(`https://wfc2-image-api-259809.appspot.com/api/books/${this.props.bookid}/`)
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



  render() {
    if(this.state.loading == false){
      return(
      <div className="App-header">
      </div>
      );
    }
    if(this.state.loading){
      return(
        <div className="book_outer">
          {this.state.data.imageData.map((Item) => {
              return (
                <div className="book_inner">
                  <LazyLoad height="50px" once>
                    <img src={ Item.imageUrl } />
                  </LazyLoad>
                </div>
              );
            })}
        </div>
      );
    }
  }
}


export default BOOK;
