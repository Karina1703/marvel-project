import './appHeader.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <NavLink to="/" end
                        style={({ isActive }) => ({
                            color: isActive ? "#9F0013" : "inherit"
                        })}
                    >
                        <li>Characters</li>
                    </NavLink>
                    /
                    <NavLink to="/comics"
                        style={({ isActive }) => ({
                            color: isActive ? "#9F0013" : "inherit"
                        })}>
                        <li>Comics</li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;