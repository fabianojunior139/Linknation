import { useContext, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import AuthContext from '../../context/AuthContext';
import { authApi } from '../../database/api';
import EditLinks from '../EditLink';

import './_styles.scss';

export interface ILink {
    id: number,
    link_title: string,
    link: string,
    id_user?: number,
}


const Card = ({ id, link_title, link }: ILink) => {

    const { user } = useContext(AuthContext);

    const token = user.token;

    function excludeLink() {
        try {
            authApi(token).delete(`/link/${id}`).then(() => {
                alert('Link excluído com sucesso!');
                window.location.reload();
            });
        } catch (err) {
            console.log(err);
        }
    }

    const [openEditLink, SetOpenEditLinks] = useState('close');

    return (
        <>
            {openEditLink == 'close' ?

                <main className="card">
                    <div className="card__content">
                        <div className="card__content-infos">
                            <span className="card__content-infos-link-title">{link_title}</span>
                            <div className="card__content-infos-icons">
                                <span><i className="card__content-infos-icon" onClick={() => { SetOpenEditLinks('open') }}><AiFillEdit /></i></span>
                                <span><i className="card__content-infos-icon" onClick={excludeLink}><AiOutlineDelete /></i></span>
                            </div>
                        </div>
                        <a href={`${link}`} className="card__content-link">{link}</a>
                    </div>

                </main>

                :

                <EditLinks id={id} link_title={link_title} link={link} isOpen={SetOpenEditLinks} />
            }

        </>
    )
}

export default Card;