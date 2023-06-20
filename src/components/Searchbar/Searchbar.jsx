import { Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
import { Header, SearchForm, SearchField, Button } from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {

    const Submit = (value, { resetForm }) => {

        if (value.search.trim()) {
            onSearch(value);
            resetForm();
            return;
        }
        alert('Type something!');
    }



    return (
        <Header >
            <Formik
                onSubmit={Submit}
                initialValues={{ search: '' }}
            >
                <SearchForm>

                    <SearchField name="search"
                        type="text"
                        placeholder="Search images and photos"
                    />

                    <Button type="submit" >
                        <ImSearch />
                    </Button>
                </SearchForm>

            </Formik>

        </Header>

    )


}