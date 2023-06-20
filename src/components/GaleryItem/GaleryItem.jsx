import { GalleryItem } from './ImageItem.styled';

export const GaleryItem = ({ image, onOpenModal }) => {

    const handleClick = () => {
        onOpenModal(image);
    };
    return (
        <GalleryItem onClick={handleClick}>
            <img
                src={image.webformatURL}
                alt={image.tags}
                loading='lazy'
            />
        </GalleryItem>
    );
};