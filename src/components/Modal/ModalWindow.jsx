import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, ModalImg } from './Modal.styled';


export const Modal = ({ image, onClose }) => {

    const { largeImageURL, tags } = image || {};

    return (
        <Backdrop onClick={onClose}>
            <ModalImg>
                <img src={largeImageURL} alt={tags} />
            </ModalImg>
        </Backdrop>
    );
}




Modal.propTypes = {
    image: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),

    onClose: PropTypes.func.isRequired,
};