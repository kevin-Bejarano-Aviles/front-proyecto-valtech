import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useGet from './useGet';

function usePost() {
  const { getLastStudentAndRedirect } = useGet();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const [errorSignUpObject, seteErrorSignUpObject] = useState({});
  const [errorCreateEventObject, setErrorCreateEventObject] = useState({});
  const [navigationStateStudent, setNavigationStateStudent] = useState('');
  const [navigationStateEvent, setNavigationStateEvent] = useState('');
  const token = localStorage.getItem('token');

  const postStudent = async (newStudent) => {
    setNavigationStateStudent('pending');
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: newStudent,
      };
      const response = await axios(`${url}/admin/students`, options);
      setNavigationStateStudent('accept');
    } catch (err) {
      seteErrorSignUpObject(err.response?.data.data.errors);
      setNavigationStateStudent('reject');
    }
  };

  const postEvent = async (values) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-token': `Bearer ${token}`,
        },
        data: values,
      };
      const response = await axios(`${url}/admin/events`, options);
      localStorage.setItem('showAlert', true)
      navigate('/eventos');
    } catch (err) {
      setErrorCreateEventObject(err.response?.data.data.errors);
    }
  };

  useEffect(() => {
    if (navigationStateStudent === 'accept') {
      getLastStudentAndRedirect();
      setNavigationStateStudent('');
    }
  }, [navigationStateStudent]);

  return {
    postEvent,
    postStudent,
    errorSignUpObject,
    errorCreateEventObject,
  };
}

export default usePost;
