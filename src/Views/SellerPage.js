import React from 'react'
import SellerPageLogin from '../Components/SellerPageLogin';
import SellerPageSignup from '../Components/SellerPageSignup';
import SellProductForm from '../Components/SellProductForm';
import { useStateValue } from '../StateProvider';
import './SellerPage.css'

function SellerPage() {

    const [{user}] = useStateValue();

    return (
      <div className="sellerPage">
       {user && <SellProductForm/>}
      </div>
    );
}

export default SellerPage
