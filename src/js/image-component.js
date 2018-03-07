import React from 'react';

export default class ImageComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <img src={'data:image/jpeg;base64,'+ this.props.imageFromBuf.buffer} height="600" width="350"/>
        );
    }
}