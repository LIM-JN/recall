import logo from '../assets/logo.png';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="logo"/>
            <div className='nav'>
                <Link to='/'>
                    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <rect height="10.5" width="12.5" y="2.75" x="1.75"/>
                    <path d="m5.25 3.25v9.5m-3-6.5h11.5m-11.5 3.5h11.5"/>
                    </svg>
                    <span>데이터</span>
                </Link>
                <Link to='/BarChart'>
                    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#cccccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <path d="m1.75 1.75v12.5h12.5m-9-3v-2.5m4 2.5v-5.5m4 5.5v-8.5"/>
                    </svg>
                    <span>막대그래프</span>
                </Link>
                <Link to='/LineChart'>
                <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="m4.75 11.25 2.5-4.5 2.5 2.5 3.5-6m-11.5-1.5v12.5h12.5"/>
                </svg>
                <span>라인그래프</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
