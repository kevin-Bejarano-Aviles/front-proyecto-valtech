import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context/Context';

function useGet() {
  const url = process.env.REACT_APP_API_URL;
  const baseUrl = `${url}/admin`;
  const token = localStorage.getItem('token');

  const { logOut } = useContext(Context);

  const [studentList, setStudentList] = useState([]);
  const [eventList, setEventsList] = useState([]);
  const [adviserList, setAdviserList] = useState([]);
  const [studentDetail, setStudentDetail] = useState();
  const [totalPagesEvent, seTotalPagesEvent] = useState(0);
  const [totalEventsGet, setTotalEventsGet] = useState();
  const [totalEvents, setTotalEvents] = useState();
  const [adviserDetail, setAdviserDetail] = useState();

  const navigate = useNavigate();

  const LogOut = () => {
    logOut();
    navigate('/login', { replace: true });
  };

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-token': `Bearer ${token}`,
    },
  };

  const calculateTotalPages = (totalEvent) => {
    let totalPages = 0;
    let restEvents = 0;
    let total = totalEvent;
    while (total > 8) {
      totalPages += 1;
      total -= 8;
      restEvents = totalPages;
    }
    if (restEvents === 0 && total > 0) {
      totalPages += 1;
    } else if (restEvents > 0) {
      totalPages += 1;
    }
    seTotalPagesEvent(totalPages);
  };

  const getAllStudents = async () => {
    try {
      const response = await axios(`${baseUrl}/students`, options);
      setStudentList(response.data?.data.students);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  const getOneStudent = async (id) => {
    try {
      const response = await axios(`${baseUrl}/students/${id}`, options);
      setStudentDetail(response.data?.data.student);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
      else if(status===404){
        navigate('/error');
      }
    }
  };

  const getAllEvents = async (limit) => {
    try {
      const response = await axios(`${baseUrl}/events?from=${limit}&limit=8`, options);
      setEventsList(response.data?.data.events);
      const { totalCount, lengthEventsSent } = response.data.data;
      calculateTotalPages(totalCount);
      setTotalEventsGet(lengthEventsSent);
      setTotalEvents(totalCount);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  const getAllEventsByFilter = async (studentName, limit) => {
    try {
      const response = await axios(
        `${baseUrl}/events?from=${limit}&student=${studentName}&limit=8`,
        options
      );
      setEventsList(response.data?.data.events);
      const { totalCount, lengthEventsSent } = response.data.data;
      calculateTotalPages(totalCount);
      setTotalEventsGet(lengthEventsSent);
      setTotalEvents(totalCount);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      } else if (status === 404) {
        setTotalEvents(0);
        setTotalEventsGet(0);
      }
    }
  };

  const getAllAdvisers = async () => {
    try {
      const response = await axios(`${baseUrl}/advisers`, options);
      setAdviserList(response.data?.data.advisers);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  const getOneAdviser = async (id) => {
    try {
      const response = await axios(`${baseUrl}/advisers/${id}`, options);
      setAdviserDetail(response.data?.data.adviser);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  const getLastStudentAndRedirect = async () => {
    try {
      const response = await axios(`${baseUrl}/students`, options);
      const detailStudent = response.data.data.students;
      const lastUserId = detailStudent[detailStudent.length - 1].id;
      navigate(`/orientados/${lastUserId}`);
      window.location.reload();
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        LogOut();
      }
    }
  };

  return {
    getAllStudents,
    getOneStudent,
    getAllEvents,
    getAllAdvisers,
    getLastStudentAndRedirect,
    getAllEventsByFilter,
    getOneAdviser,
    studentList,
    studentDetail,
    eventList,
    adviserList,
    totalPagesEvent,
    totalEventsGet,
    totalEvents,
    adviserDetail,
  };
}
export default useGet;
