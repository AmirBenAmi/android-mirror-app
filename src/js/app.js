import React from 'react';
import ReactDOM from 'react-dom';
import CanvasComponent from './canvas-component';
import ImageComponent from './image-component';
import subscribeToimage  from './api';


export default class Image extends React.Component {
    constructor(props){
        super(props);
        this.state = {imageNum: 0, filePath: '../../out.png', imageBuffer:'' };
        subscribeToimage((counter, filePath, buffer) => {
            this.setState({imageNum: counter, filePath:`../.${filePath}`, imageBuffer: buffer} );
            console.log('image count is:', this.state.imageNum);
            console.log('file path is:', this.state.filePath);
            // console.log('buffer:', buffer);
        });

    };
    render(){
        return (
            <div>
            <ImageComponent imagePath={this.state.filePath} imageBuffer={this.state.imageBuffer}/> 
            </div>
        )
    }
}
ReactDOM.render(<Image />, document.getElementById('app'));