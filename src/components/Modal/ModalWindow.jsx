import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, ModalImg } from './Modal.styled';

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        const { image } = this.props;

        return (
            <Backdrop onClick={this.handleClick}>
                <ModalImg>
                    <img src={image.largeImageURL} alt={image.tags} />
                </ModalImg>
            </Backdrop>
        );
    }
}

Modal.propTypes = {
    image: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};