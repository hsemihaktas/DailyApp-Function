import React from 'react';

import Label from '../../components/Label';
import Input from '../../components/Input';
import SubmitButton from '../../components/Button/SubmitButton';
import LogoutButton from '../../components/Button/LogoutButton';

import Data from '../../data.json';

const Answers = () => {
  const [questions, setQuestions] = React.useState(Data.questions);

  const [errors, setErrors] = React.useState([]);

  const onChange = (event) => {
    const { id, value } = event.target;
    const error = [...errors];

    const clonedQuestions = questions.map((question) => {
      if (question.id === Number(id)) {
        question.answer = value;
        const errorIndex = error.indexOf(question.id);
        if (errorIndex > -1) {
          error.splice(errorIndex, 1);
        }
      }
      return question;
    });
    setQuestions(clonedQuestions);
    setErrors(error);
  };

  const submitValue = () => {
    const error = [];
    questions.map((question) => {
      if (!question.answer) {
        error.push(question.id);
      }
      return question;
    });

    if (error.length > 0) {
      return setErrors(error);
    } else {
      console.log(questions);
      return alert('Form gönderildi.');
    }
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  return (
    <>
      <LogoutButton deleteToken={deleteToken} />
      <div className="container form flex">
        <br></br>
        <ul>
          {questions.map((data, index) => (
            <div key={data.id}>
              <Label id={data.id} text={data.question}></Label>
              <Input
                type="text"
                placeholder={data.id + '. Sorunun Cevabı'}
                id={data.id}
                onChange={onChange.bind(this)}
                error={errors.includes(data.id) && 'Cevap boş geçilemez'}
              ></Input>
            </div>
          ))}
        </ul>
        <SubmitButton submitValue={submitValue} />
        <br></br>
      </div>
    </>
  );
};

export default Answers;
