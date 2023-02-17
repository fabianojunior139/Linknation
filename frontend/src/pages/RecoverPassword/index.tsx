import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import './_styles.scss';

const RecoverPassword = () => {

    const navigate = useNavigate();

    function redirect() {
        navigate('/login');
        alert('E-mail enviado com sucesso!')
    }

    return (
        <main className='recover-password'>
            <div className="recover-password__card">

                <div className='recover-password__image'>
                    <Logo width={160} height={160} />
                </div>

                <span className='recover-password__text'>Digite o e-mail cadastrado</span>

                <form className='recover-password__form'>
                    <input className='recover-password__input' type="email" name='email' id='email' required placeholder='email@gmail.com' />

                    <button className='recover-password__button' type='submit' onClick={redirect}>ENVIAR E-MAIL</button>
                </form>
            </div>
        </main>
    )
}

export default RecoverPassword;