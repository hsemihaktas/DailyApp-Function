import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Questions from '../pages/Questions';
import Answers from '../pages/Answers';
import NotFound from '../pages/NotFound';

function index() {
  return (
    <Routes>
      {localStorage.getItem('token') ? (
        <>
          <Route path="/" element={<Navigate to="/answers" />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/answers" element={<Answers />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default index;
