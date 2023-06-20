import { GalleryList } from './ImageList.styled'
import { GaleryItem } from 'components/GaleryItem/GaleryItem.jsx'


export const ImageGallery = ({ pictures, onOpenModal }) => {
    return (
        <GalleryList>
            {pictures.map(image => (
                <GaleryItem
                    image={image}
                    key={image.id}
                    onOpenModal={onOpenModal}
                />
            ))}

        </GalleryList>
    )
}