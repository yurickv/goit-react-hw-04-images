import { BtnLoadMore } from './LoadMoreBtn.styled'



export const Button = ({ morePictures }) => {
    return (
        <BtnLoadMore type="button" onClick={morePictures}>
            Load more
        </BtnLoadMore>
    );
}
