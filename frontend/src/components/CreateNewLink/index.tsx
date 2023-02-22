import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { authApi } from "../../database/api";
import { ILink } from "../Card";
import { BsArrowReturnLeft } from 'react-icons/bs';

import './_styles.scss';

export interface ITypeForm {
    returnToLinks: (type: string) => void
}

const CreateNewLink = ({ returnToLinks }: ITypeForm) => {

    const { user } = useContext(AuthContext);
    const token = user.token;

    const InitialValueLink = {
        link_title: '',
        link: '',
        id_user: user.id,
    }

    const [link, setLink] = useState<ILink>(InitialValueLink);

    function editLink(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setLink({ ...link, [name]: value });
    }

    async function createLink(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await authApi(token).post('/link', link).then(response => {
                const link = response.data;
                if (link) {
                    alert('Link cadastrado com sucesso!');
                    window.location.reload();
                } else {
                    alert(`Erro ao cadastrar o Link, tente novamente!`);
                }
            })
        } catch (error) {
            alert(`Erro ao cadastrar o link: ${error}`);
        }
    }

    return (
        <form className="create-new-link-page" onSubmit={createLink}>
            <div className="create-new-link-page__head">
                <h1 className="create-new-link-page__head-title">Guarde um novo link</h1>
                <i className="create-new-link-page__head-icon" onClick={() => { returnToLinks('default') }}><BsArrowReturnLeft /></i>
            </div>
            <label className='create-new-link-page__label' htmlFor="user">Título do link</label>
            <input className='create-new-link-page__input' type="text" name='link_title' id='link_title' placeholder='Exemplo: Alura' required onChange={editLink} />

            <label className='create-new-link-page__label' htmlFor="user">Link</label>
            <input className='create-new-link-page__input' type="text" name='link' id='link' placeholder='Exemplo: www.alura.com' required onChange={editLink} />

            <button type='submit' className='create-new-link-page__button'>Guardar</button>
        </form>
    )
}

export default CreateNewLink;