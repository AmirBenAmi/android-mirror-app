import React from 'react';

export default class ImageComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <img src={this.props.imagePath} height="600" width="350"/>
        );
    }
}