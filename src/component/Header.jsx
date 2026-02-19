import logo from '../assets/logo.png';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="logo"/>
            <a href=""></a>
            <Link to='/'>로그인</Link>
            <Link to='/Population'>생활인구 조회</Link>
            <Link to='/BarChart'>막대그래프</Link>
            <Link to='/LineChart'>라인그래프</Link>
        </header>
    );
};

export default Header;
