import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import Logo from '../Logo';

import './_styles.scss';

const NavBar = () => {

    const { logout } = useContext(AuthContext);

    return (
        <main className='navbar'>
            <div className='navbar-content'>
                <a href='/home'>
                    <Logo width={72} height={72} />
                </a>
                <div className="navbar-content__itens">
                    <ul className='navbar-content__list-itens'>
                        <li><a href="/" className="navbar-content__item">Minha conta</a> </li>
                        <li><a href="/login" onClick={() => { logout() }} className="navbar-content__item">Sair</a></li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default NavBar;