import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from './components/SignIn.js';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';
import MyCart from './components/MyCart.js';

// Const
const footerName = "Final project - Duong Huu Loc";
const footerDescription = "ReactJS course of teacher Tran Khanh";
const tax = 2.6;
const GET_10_BOOKS = "http://duonghuuloc.somee.com/api/Sach/LayThongTinCacSachBanChay/10";
const GET_BOOK_DESCRIPTION = "http://duonghuuloc.somee.com/api/Sach/LayThongTinSachTheoId/";

function App() {
  const [screen, screenTransfer] = useState("ProductList");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState('');
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    // Get all products in startup
    fetch(GET_10_BOOKS, {
      crossDomain:true,
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    .then(response => response.json())
    .then(jsonResponse => {
      setBooks(jsonResponse);
    });
  }, []);

  function ViewOneProduct(productId) {
    // Get current viewed product
    fetch(GET_BOOK_DESCRIPTION + productId, {
      crossDomain:true,
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    .then(response => response.json())
    .then(jsonResponse => {
      setBook(jsonResponse);
      screenTransfer("ProductDetail");
    });
  }

  function AddOneProduct(productItem) {
    let found = carts.find(p => p.Id === productItem.Id);
    if (found == undefined)
      carts.push(productItem);
    else
      found.SoLuong++;
  }

  function onDecreaseQuantity(Id) {
    let myCarts = [...carts];
    let found = myCarts.find(p => p.Id === Id);
    if (found.SoLuong > 1) {
      found.SoLuong--;
      setCarts(myCarts);
    }
  }

  function onIncreaseQuantity(Id) {
    let myCarts = [...carts];
    let found = myCarts.find(p => p.Id === Id);
    found.SoLuong++;
    setCarts(myCarts);
  }

  function onRemoveItem(Id) {
    let myCarts = [...carts];
    myCarts = myCarts.filter(p => p.Id !== Id);
    setCarts(myCarts);
  }

  function onRemoveAll() {
    let myCarts = [...carts];
    myCarts = [];
    setCarts(myCarts);
  }

  // Show screen
  switch (screen) {
    case "ProductList":
      return (
        <div>
          <ProductList books={books} 
                       onView={(productId) => { ViewOneProduct(productId) }}
                       onShowCart={() => { screenTransfer("MyCart") }}
                       footerName={footerName}
                       footerDescription={footerDescription} />
        </div>
      );

    case "ProductDetail":
      return (
        <div>
          <ProductDetail book={book}
                         onAddToCart={(productItem) => { AddOneProduct(productItem) }}
                         onBackToBooks={() => { screenTransfer("ProductList") }}
                         onShowCart={() => { screenTransfer("MyCart") }}
                         footerName={footerName}
                         footerDescription={footerDescription} />
        </div>
      );

    case "MyCart":
      return (
        <div>
          <MyCart carts={carts}
                  tax={tax}
                  onBackToBooks={() => { screenTransfer("ProductList") }}
                  onDecreaseQuantity={(Id) => { onDecreaseQuantity(Id) }}
                  onIncreaseQuantity={(Id) => { onIncreaseQuantity(Id) }}
                  onRemoveItem={(Id) => { onRemoveItem(Id) }}
                  onRemoveAll={() => { onRemoveAll() }}
                  footerName={footerName}
                  footerDescription={footerDescription} />
        </div>
      );
  
    default:
      return (
        <div>No screen display</div>
      );
  }
}

export default App;
