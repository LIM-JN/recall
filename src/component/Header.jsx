import logo from '../assets/logo.png';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="logo"/>
            <a href=""></a>
            <Link to='/'>데이터</Link>
            <Link to='/BarChart'>막대그래프</Link>
            <Link to='/LineChart'>라인그래프</Link>
        </header>
    );
};

export default Header;
