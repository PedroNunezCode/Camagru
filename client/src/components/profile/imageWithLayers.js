import React, { Component } from 'react';
import Overlay from 'react-image-overlay'

class FilterComponent extends Component {

    constructor(props) {
        super();

        this.state = {
            image: props.image
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Overlay
                        url='https://placeimg.com/250/250/any' // required
                        overlayUrl='https://placeimg.com/50/50/any' // required
                        imageHeight={{height: "100%"}}
                        position={'bottomRight'}
                        overlayWidth={50}
                        overlayHeight={50}
                        overlayPadding={10}
                        watermark={false}
                    />

                </div>
            </div>
        );
    }
}

export default FilterComponent;