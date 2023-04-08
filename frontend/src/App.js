
import './App.css';

import AddPost from "./Componnet/AddPost"
import Header from './Componnet/Header';
import PostCard from './Componnet/PostCards';
import PostList from './Componnet/PostList';
import Main from './Componnet/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { useState, useEffect } from 'react';
import simpleRestProvider from 'ra-data-simple-rest';
import { Admin, Resource } from 'react-admin';
function App() {


  useEffect(() => {

  })


  return (




    <BrowserRouter>
      {/* <Admin dataProvider={simpleRestProvider('http:localhost:5000')}>
        <Resource name="posts" list={PostList} />
        </Admin> */}
      <Header />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route path='/Posts' element={<Main />}></Route>
        </Route>
        <Route path="addpost" element={<AddPost />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
