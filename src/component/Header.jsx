import logo from '../assets/logo.png';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="logo"/>
            <a href=""></a>
            <Link to='/'>로그인</Link>
            <Link to='/Population'>유동인구 조회</Link>
            <div>Data Source 관리</div>
            <div>Sub code 관리</div>
        </header>
    );
};

export default Header;
