import React from 'react';

export default class CanvasComponent extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const img = new Image();
        // img.src = '../../out.png';
        img.src = this.props.imagePath
        img.onload = () => {
            ctx.drawImage(img,0,0);
        }
    }
    render() {
        return (
            <canvas ref="canvas"/>
        );
    }
}