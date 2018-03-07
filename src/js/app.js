import React from 'react';
import ReactDOM from 'react-dom';
import CanvasComponent from './canvas-component';
import ImageComponent from './image-component';
import subscribeToimage  from './api';


export default class Image extends React.Component {
    constructor(props){
        super(props);
        this.state = {filePath: '../../out.png', imageFromBuf:{image: true, buffer:''}};
        subscribeToimage((filePath, buffer) => {
            this.setState({filePath:`../.${filePath}`, imageFromBuf:{image: true, buffer: buffer}} );
            // console.log('file path is:', this.state.filePath);
            // console.log('image buf:', this.state.imageFromBuf.buffer);
            // console.log('buffer:', buffer);
            console.log('New Image!');
        });

    };
    render(){
        return (
            <div>
            <ImageComponent imagePath={this.state.filePath} imageFromBuf={this.state.imageFromBuf}/> 
            </div>
        )
    }
}
ReactDOM.render(<Image />, document.getElementById('app'));