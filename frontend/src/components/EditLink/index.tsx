import { useContext, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import AuthContext from '../../context/AuthContext';
import { authApi } from '../../database/api';
import { ILink } from '../Card';

import './_styles.scss';

export interface IModal {
    id: number,
    link_title: string,
    link: string,
    isOpen(type: string): void
}

const EditLinks = ({ id, link_title, link, isOpen }: IModal) => {

    const { user } = useContext(AuthContext);

    const token = user.token;

    const InitialValue = {
        link_title: link_title,
        link: link
    }

    const [links, setLinks] = useState(InitialValue);

    function editLinks(evento: any) {
        const { name, value } = evento.target;
        setLinks({ ...links, [name]: value });
    }

    async function updateLink(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        try {
            await authApi(token).put(`/link/${id}}`, links);
            alert('Link atualizado com sucesso!');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="edit-link">
            <form className="edit-link-form" onSubmit={updateLink}>
                <div className="edit-link-form__head">
                    <h1 className="edit-link-form__head-title">Atualize o Link</h1>
                    <i className="edit-link-form__head-icon" onClick={() => { isOpen('close') }}><BsArrowReturnLeft /></i>
                </div>
                <label className='edit-link-form__label' htmlFor="user">Título do link</label>
                <input className='edit-link-form__input' type="text" name='link_title' id='link_title' onChange={editLinks} defaultValue={link_title} required />

                <label className='edit-link-form__label' htmlFor="user">Link</label>
                <input className='edit-link-form__input' type="text" name='link' id='link' onChange={editLinks} defaultValue={link} required />

                <button type='submit' className='edit-link-form__button'>Guardar</button>
            </form>
        </div>
    )
}

export default EditLinks;