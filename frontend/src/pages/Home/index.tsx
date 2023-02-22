import NavBar from "../../components/Navbar"
import Card, { ILink } from "../../components/Card";
import { FaFilter } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { authApi } from "../../database/api";
import CreateNewLink from "../../components/CreateNewLink";

import './_styles.scss';

const Home = () => {

    const { user } = useContext(AuthContext);

    const token = user.token;
    const userId = user.id;

    const valorInicial = {
        link_title: ''
    }

    const [filters, setFilters] = useState(valorInicial);

    const [link, setLink] = useState<ILink[]>([])

    useEffect(() => {
        authApi(token).post(`/link/filters/${userId}`, filters).then((response) => {
            setLink(response.data);
        }).catch((erro) => {
            console.log(`erro ao listar os links cadastrados: ${erro}`);
        })
    }, [filters]);

    function editFilters(e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }

    const [typeForm, setTypeForm] = useState('default');

    return (
        <main className="home-page">
            <NavBar />
            <div className="home-page__content">
                {typeForm == 'default' ?
                    <>
                        <div className="home-page__content-cards">
                            <button className="home-page__content-card home-page__content-card-new-link" onClick={() => { setTypeForm('not-default'); }}>Guardar Novo link <i className="home-page__content-card-new-link-icon"><IoIosAddCircleOutline /></i></button>
                            <div className="home-page__content-card home-page__content-card-filter">
                                <div className="home-page__content-card-filter-infos">
                                    <span className="home-page__content-card-filter-infos-title"><FaFilter />  Filtrar busca</span>
                                    <span className="home-page__content-card-filter-infos-title">{link.length} Resultados</span>
                                </div>
                                <form>
                                    <input type="text" name='link_title' className='home-page__content-card-filter-input' placeholder='Título do link...' onChange={editFilters} />
                                </form>
                            </div>
                        </div>
                        {
                            link.map(card => (
                                <Card key={card.id}
                                    id={card.id}
                                    link_title={card.link_title}
                                    link={card.link}
                                />
                            ))
                        }
                    </>

                    :

                    <CreateNewLink returnToLinks={setTypeForm} />
                }
            </div>
        </main>
    )
}

export default Home;