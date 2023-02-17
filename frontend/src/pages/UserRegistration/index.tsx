import { useState } from 'react';
import { useNavigate } from 'react-router';
import Logo from '../../components/Logo';
import { authApi } from '../../database/api';

import './_styles.scss'

const UserRegistration = () => {

    const initialValue = {
        name: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState(initialValue);

    const navigate = useNavigate();

    async function updateUser(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await authApi("").post('/user', user);
            alert('Cadastro realizado com sucesso! ');
            navigate('/login');

        } catch (error) {
            alert('Erro ao realizar o cadastro, tente novamente! ');
        }
    }

    return (
        <main className='user-registration'>
            <div className="user-registration__card">
                <div className='user-registration__left-card'>
                    <div className='user-registration__left-card-image'>
                        <Logo width={160} height={160} />
                    </div>
                    <h2 className="user-registration__left-card-title">Bem-vindo de volta!</h2>
                    <p className="user-registration__left-card-text"> Clique no botão abaixo se já tiver conta</p>
                    <a href='/login' className="user-registration__left-card-button">ENTRAR</a>


                </div>
                <div className='user-registration__right-card'>

                    <form className='user-registration__form' onSubmit={handleSubmit}>

                        <h1 className='user-registration__form-title'>Crie sua conta</h1>

                        <label className='user-registration__label' htmlFor="user">Nome Completo</label>
                        <input className='user-registration__input' type="text" name='name' id='name' required placeholder='João da Silva' onChange={(e) => { updateUser(e) }} />

                        <label className='user-registration__label' htmlFor="user">E-mail</label>
                        <input className='user-registration__input' type="email" name='email' id='email' required placeholder='email@gmail.com' onChange={(e) => { updateUser(e) }} />

                        <label className='user-registration__label' htmlFor="user">Senha</label>
                        <input className='user-registration__input' type="password" name='password' id='password' required placeholder='**********' onChange={(e) => { updateUser(e) }} />

                        <button type='submit' className='user-registration__button'>REGISTRAR</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default UserRegistration;