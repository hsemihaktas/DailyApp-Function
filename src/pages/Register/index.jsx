import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: 'deneme3',
    email: 'deneme3@deneme3.com',
    password: 'denemedeneme',
    userRole: 'user',
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const submitValue = () => {
    // Email geçerli mi
    const isEmailValid = maybeValidEmail(userInfo.email);
    // Şifre min. 8 karakter olmalı
    const isPasswordValid = maybeValidPassword(userInfo.password);

    if (!userInfo.name || !isEmailValid || !isPasswordValid || !userInfo.email || !userInfo.password) {
      return setErrors({
        name: !userInfo.name && 'Lütfen isminizi giriniz',
        email:
          (!userInfo.email && 'Email alanı boş geçilemez') || (!isEmailValid && 'Geçerli bir email adresi giriniz'),
        password:
          (!userInfo.password && 'Password alanı boş geçilemez') ||
          (!isPasswordValid && 'Şifreniz en az 8 karakter olmalıdır'),
      });
    }

    api()
      .post('/auth/register', userInfo)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container form flex">
        <br></br>
        <Label text={'İsim'}></Label>
        <Input
          type="text"
          placeholder="İsim Giriniz"
          name="name"
          onChange={onChange.bind(this)}
          error={errors.name}
          value={userInfo.name}
        />
        <Label text={'E-mail'}></Label>
        <Input
          type="text"
          placeholder="E-mail Giriniz"
          name="email"
          onChange={onChange.bind(this)}
          error={errors.email}
          value={userInfo.email}
        />
        <Label text={'Password'}></Label>
        <Input
          type="password"
          placeholder="Şifrenizi Giriniz"
          name="password"
          onChange={onChange.bind(this)}
          error={errors.password}
          value={userInfo.password}
        />
        <SubmitButton submitValue={submitValue} />
        <br></br>
      </div>
      {success && <HiddenDiv text="Kayıt Başarılı. Login Sayfasına Yönlendiriliyorsunuz..." />}
    </>
  );
};

export default Register;
