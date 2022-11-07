/* eslint-disable no-console */
import { React, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import Menu from '../sharedPrivateComponents/menu/Menu';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Button from '../sharedPrivateComponents/button/Button';
import Alert from '../sharedPrivateComponents/Alert';
import useGet from '../hooks/useGet';
import CardStudents from './Components/CardStudents';
import CardAdivser from './Components/CardAdivser';

function AssignAdviserPage() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const params = useParams();
  const idStudent = params.id;
  const token = localStorage.getItem('token');
  const [cardAdviserIsVisible, setcardAdviserIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [hideCard, setHideCard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modifyAlert, setModifyAlert] = useState(false);

  useEffect(() => {
    valor < 1 ? setIsEmpty(true) : setIsEmpty(false);
  });

  const { studentDetail, getOneStudent } = useGet();

  const { adviserList, getAllAdvisers } = useGet();

  useEffect(() => {
    getOneStudent(idStudent);
    getAllAdvisers();
  }, []);

  const [valor, setValor] = useState(0);
  const { adviserDetail, getOneAdviser } = useGet();

  useEffect(() => {
    getOneAdviser(valor);
  }, [valor]);

  const handleChange = (e, formik) => {
    const valueOption = e.target.value;
    setValor(valueOption);
    formik.handleChange(e);
  };

  const assignAdviser = async (idAdviser) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-token': `Bearer ${token}`,
        },
        withCredentials: true,
        data: idAdviser,
      };
      const response = await axios(
        `${baseUrl}/admin/students/${params.id}/adviser`,
        options
      );
    } catch (err) {
      console.error(`${err.response.status}: ${err.response.statusText}`);
    }
  };

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr]  gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title='Orientados' />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-8  '>
          <section>
            <h2 className='text-2xl text-blue   mt-8 '>
              Asignación de Orientador Referente
            </h2>
            <CardStudents
              avatar={studentDetail && studentDetail.avatar}
              ruta='students'
              fullName={studentDetail && studentDetail.fullName}
              email={studentDetail && studentDetail.email}
              school={studentDetail && studentDetail.school}
              phoneNumber={studentDetail && studentDetail.phoneNumber}
              program={studentDetail && studentDetail.program}
            />
          </section>

          <section>
            <h2 className='text-2xl text-blue  mt-8'>
              Selección de un Orientador Referente
            </h2>
            <div
              className={
                hideCard || (studentDetail && studentDetail.adviserId === null)
                  ? 'block'
                  : 'hidden'
              }
            >
              <h4>Referente</h4>
            </div>

            <div className=''>
              <Formik
                initialValues={{
                  idAdviser: '',
                }}
                onSubmit={(idAdviser) => {
                  assignAdviser(idAdviser);
                  setShowAlert(true);
                }}
              >
                {(formik) => (
                  <Form className='formulario'>
                    <div
                      className={
                        hideCard ||
                        (studentDetail && studentDetail.adviserId === null)
                          ? 'block'
                          : 'hidden'
                      }
                    >
                      <div>
                        <Field
                          className='border-[2px] w-[320px] h-10  rounded-lg border-graybackground mt-4 focus:outline-green'
                          name='idAdviser'
                          as='select'
                          onClick={() => setcardAdviserIsVisible(true)}
                          onChange={(e) => handleChange(e, formik)}
                        >
                          <option hidden value=''>
                            Seleccionar orientador
                          </option>
                          {adviserList.map((elemento) => (
                            <option key={elemento.id} value={elemento.id}>
                              {elemento.fullName}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className={cardAdviserIsVisible ? 'block' : 'hidden'}>
                      <div className='mt-16'>
                        <CardAdivser
                          avatar={adviserDetail && adviserDetail.avatar}
                          fullName={adviserDetail && adviserDetail.fullName}
                          email={adviserDetail && adviserDetail.email}
                          phoneNumber={
                            adviserDetail && adviserDetail.phoneNumber
                          }
                        />
                      </div>
                    </div>

                    <div className='ml-10 mt-8 mb-8  flex flex-row'>
                      <div
                        className={`${showAlert ? 'hidden' : 'block'} ${
                          hideCard ||
                          (studentDetail && studentDetail.adviserId === null)
                            ? 'block'
                            : 'hidden'
                        } `}
                      >
                        <div className='relative  bottom-4 left-[-40px]'>
                          <Button
                            type='submit'
                            name='Asignar orientador/a'
                            disabled={isEmpty}
                          />
                        </div>
                      </div>
                      <div className='hidden'>.</div>
                    </div>
                    <div>
                      {showAlert ? (
                        <div className='flex flex-row   mt-24 relative bottom-32 items-center'>
                          <Button
                            type='submit'
                            name='Modificar orientador/a'
                            handleFunction={() => setModifyAlert(true)}
                          />
                          <div className='ml-4 underline'>
                            <NavLink to={`/orientados/${params.id}`}>
                              Volver
                            </NavLink>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className={hideCard ? 'hidden' : 'block'}>
              {studentDetail && studentDetail.adviserId !== null ? (
                <CardAdivser
                  avatar={studentDetail && studentDetail.Adviser.avatar}
                  fullName={studentDetail && studentDetail.Adviser.fullName}
                  email={studentDetail && studentDetail.Adviser.email}
                  phoneNumber={studentDetail && studentDetail.phoneNumber}
                />
              ) : (
                ''
              )}

              <div
                className={
                  studentDetail && studentDetail.adviserId !== null
                    ? 'block'
                    : 'hidden'
                }
              >
                <div className='flex flex-row  bottom-2 relative  items-center'>
                  <Button
                    type='button'
                    handleFunction={() => setHideCard(true)}
                    name='Modificar orientador/a'
                  />
                  <div className='ml-4 underline'>
                    <NavLink to={`/orientados/${params.id}`}>Volver</NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-24 ml-10'>
              {showAlert ? (
                <div className='z-80'>
                  <Alert
                    title='El orientado ya fue asignado a su referente.'
                    message='Recibirá una notificación para que contacte al Orientado.'
                  />
                </div>
              ) : (
                ''
              )}

              {modifyAlert ? (
                <div className='z-80'>
                  <Alert
                    title='El orientado ya fue asignado a su referente.'
                    message='Recibirá una notificación para que contacte al Orientado.'
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AssignAdviserPage;
