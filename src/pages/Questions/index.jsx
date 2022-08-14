import React from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import SubmitButton from '../../components/Button/SubmitButton';
import DeleteButton from '../../components/Button/DeleteButton';
import AddButton from '../../components/Button/AddButton';
import LogoutButton from '../../components/Button/LogoutButton';

import data from '../../data.json';

const Questions = () => {
  const [questions, setQuestions] = React.useState(data.questions);

  const navigate = useNavigate();

  const onChange = (event) => {
    const value = event.target.value;
    const id = Number(event.target.id);
    const clonedQuestions = questions.map((question) => {
      if (question.id === id) {
        question.question = value;
      }
      return question;
    });
    setQuestions(clonedQuestions);
  };

  const addValue = () => {
    const newQuestions = [...questions];

    newQuestions.push({ id: Date.now(), question: '', answer: '' });

    setQuestions(newQuestions);
  };

  const deleteValue = (id) => {
    const newId = Number(id);
    const newQuestions = questions.filter((question) => question.id !== newId);
    setQuestions(newQuestions);
    console.log(questions);
  };

  const submitValue = () => {
    console.log(questions);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <LogoutButton deleteToken={deleteToken} />
      <div className="container form">
        <div className="right">
          <AddButton addvalue={addValue} />
        </div>
        <ul className="form flex">
          {questions.map((data) => (
            <div key={data.id}>
              <Input type="text" placeholder={data.question} id={data.id} onchange={onChange.bind(this)} />
              <DeleteButton id={data.id} deletevalue={deleteValue} />
            </div>
          ))}
          <SubmitButton submitValue={submitValue} />
        </ul>
        <br></br>
      </div>
    </>
  );
};

export default Questions;
