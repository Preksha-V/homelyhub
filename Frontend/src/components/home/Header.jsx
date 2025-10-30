import React from 'react'
import '../../css/Home.css'
import Search from './Search'
import Filter from './Filter'
import { Link, useNavigate} from 'react-router-dom' 
import { useSelector,useDispatch } from 'react-redux'
import { logout} from '../../store/User/user-action'
import { propertyAction } from '../../store/Property/property-slice'    
import { getAllProperties } from '../../store/Property/property-action' 
import toast from 'react-hot-toast'
const Header = () => {

    const {isAuthenticated,user}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutUser=()=>{
        dispatch(logout());
        toast.success("Logged out successfully")
        navigate('/')
    }

    const refreshFunction=()=>{
        dispatch(propertyAction.resetSearchParams({}));
        dispatch(getAllProperties())
    }
  return (
    <>
    <nav className='header row sticky-top'>
        <Link to="/">
        <img src='/assets/logo.png' alt='logo' className='logo' onClick={refreshFunction}/>
        </Link>
        <div className='search_filter'>
            <Search/>
            <Filter/>
        </div>


        {!isAuthenticated && !user &&(
<Link to="/login">
        <span className='material-symbols-outlined web_logo'>
            account_circle
        </span>
        </Link>
        )}

        <div className="dropdown">
            <span
                className='material-symbols-outlined web_logo dropdown-toggle'
                role='button'
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    <img src="/assets/avatar.png" className="user-img rounded-circle w-25 h-25" alt='icon'/>
            </span>
                <ul className='dropdown-menu' aria-labelledby="dropdownMenuLink">
                <li>
                <a className="dropdown-item" href="/profile">My Account</a>
                </li>
                <li>
                <button className="dropdown-item">Logout</button>
                </li>
                </ul>
                </div>


                        
                    </nav>
                    </>
                )
                }

                export default Header
