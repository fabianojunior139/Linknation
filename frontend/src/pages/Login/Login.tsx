import AuthContext, { IUserLogin } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaTwitterSquare } from 'react-icons/fa';
import Logo from '../../components/Logo';

import './_styles.scss'

const Login = () => {

    const [user, setUser] = useState<IUserLogin>({} as IUserLogin);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    function updateUser(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        if (login(user)) {
            navigate('/home');
        } else {
            alert('usuário inválido');
        }
    }

    return (

        <main className='login-page'>
            <div className="login-page__card">
                <div className='login-page__image'>
                    <Logo width={512} height={180} />
                </div>

                <form className='login-page__form' onSubmit={handleSubmit}>
                    <label className='login-page__label' htmlFor="user">E-mail</label>
                    <input className='login-page__input' type="email" name='email' id='email' required placeholder='email@gmail.com' onChange={(e) => { updateUser(e) }} />

                    <label className='login-page__label' htmlFor="user">Senha</label>
                    <input className='login-page__input' type="password" name='password' id='password' required placeholder='**********' onChange={(e) => { updateUser(e) }} />
                    <span className='login-page__password'><a href='/recuperaSenha' className='login-page__password-link'>Esqueci minha senha</a></span>

                    <button type='submit' className='login-page__button'>ENTRAR</button>

                    <span>Não tem uma conta? <a href='/' className='login-page__link-to-register'>Inscreva-se</a></span>
                </form>

                <div className="login-page__social-icons">
                    <a href="https://www.facebook.com/" target='_blank'>
                        <i className='login-page__icon login-page__icon-facebook'><FaFacebookSquare /></i>
                    </a>

                    <a href="https://www.instagram.com/" target='_blank'>
                        <i className='login-page__icon login-page__icon-instagram'><FaInstagram /></i>
                    </a>

                    <a href="https://web.whatsapp.com//" target='_blank'>
                        <i className='login-page__icon login-page__icon-whatsapp'><FaWhatsapp /></i>
                    </a>

                    <a href="https://twitter.com/" target='_blank'>
                        <i className='login-page__icon login-page__icon-twitter'><FaTwitterSquare /></i>
                    </a>

                </div>
            </div>
        </main>
    )
}

export default Login;