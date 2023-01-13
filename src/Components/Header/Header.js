import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

function Header() {
  const {user} = useContext(AuthContext)
  const auth = getAuth()
  const history = useHistory()

  const handleLogout = () =>{
    signOut(auth).then(()=>{
      history.push('/admin/login')
    })
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{
          history.push('/')
        }}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
         {<span onClick={()=>{history.push('/profile')}}>{`Welcome ${user?.displayName == null ?'Admin':user.displayName}`}</span>}
         {!user && <span onClick={()=>{history.push('/login')}}>Login</span>}
          <hr />
        </div>
        {<span onClick={handleLogout}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{history.push('/sell')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
