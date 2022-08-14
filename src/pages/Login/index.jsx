import React from 'react';

import { api } from '../../api';

import Input from '../../components/Input';
import Label from '../../components/Label';
import SubmitButton from '../../components/Button/SubmitButton';
import HiddenDiv from '../../components/HiddenDiv';

function maybeValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function maybeValidPassword(password) {
  const splittedPassword = password.split('');
  return splittedPassword.length > 7 ? true : false;
}

const Login = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const [success, setSuccess] = React.useState(false);

  const onChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: '',
    });
  };

  const submitValue = () => {
    // Email geçerli mi
    const isEmailValid = maybeValidEmail(userInfo.email);
    // Şifre min. 8 karakter olmalı
    const isPasswordValid = maybeValidPassword(userInfo.password);

    if (!isEmailValid || !isPasswordValid || !userInfo.email || !userInfo.password) {
      return setErrors({
        email:
          (!userInfo.email && 'Email alanı boş geçilemez') || (!isEmailValid && 'Geçerli bir email adresi giriniz'),
        password:
          (!userInfo.password && 'Password alanı boş geçilemez') ||
          (!isPasswordValid && 'Şifreniz en az 8 karakter olmalıdır'),
      });
    }

    api()
      .post('/auth/login', userInfo)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.accessToken);
          setSuccess(true);
          setTimeout(() => {
            window.location.replace('/');
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container form flex">
      <br></br>
      <Label text={'E-mail'}></Label>
      <Input type="text" placeholder="E-mail Giriniz" id="email" onChange={onChange.bind(this)} error={errors.email} />
      <Label text={'Password'}></Label>
      <Input
        type="password"
        placeholder="Şifrenizi Giriniz"
        id="password"
        onChange={onChange.bind(this)}
        error={errors.password}
      />
      <SubmitButton submitValue={submitValue} />
      <br></br>
      {success && <HiddenDiv text="Giriş Başarılı. Answers Sayfasına Yönlendiriliyorsunuz..." />}
    </div>
  );
};

export default Login;
