import user from '../assets/user.svg';
import email from '../assets/mail.svg';
import password from '../assets/password.svg';

const LoginForm = () => {
    return (
        <>
        <section className="main">
            <div className="row">
                <div>
                    <img 
                    src={user}
                    className='user'
                    alt="user" />
                </div>
                <h2>LOGIN</h2>
            </div>
            <form method='post'>
                <div className="row">
                    <label htmlFor="email">
                        <img src={email} alt="" />
                    </label>
                    <input type="email" placeholder='이메일' id="email" autoComplete="username"/>
                </div>
                <div className="row">
                    <label htmlFor="password">
                        <img src={password} alt="" />
                    </label>
                    <input type="password" placeholder='비밀번호' id='password' autoComplete="current-password"/>
                </div>
                <div className="row ">
                    <h6>회원가입 | 비밀번호 재설정</h6>
                </div>
                <input type="submit" value="로그인" />
            </form>
        </section>
        </>
    )
}

export default LoginForm;