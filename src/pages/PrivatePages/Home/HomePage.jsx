import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGet from '../hooks/useGet';
import Button from '../sharedPrivateComponents/button/Button';
import OrientedList from '../sharedPrivateComponents/OrientedList';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import CardText from './components/CardText';

function HomePage() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const adminFirstName = admin.fullName.split(' ')[0];
  const {studentList,getAllStudents}=useGet();

  useEffect(() => {
    getAllStudents();
  },[]);

  return (
    <div className='grid grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title={`¡Bienvenido/a, ${adminFirstName}!`} />
        <main className='max-w-max mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='flex-col gap-4 lap_tablet:flex-row flex items-center justify-between'>
            <h4 className='flex items-center justify-center h-[58px] w-[187px] py-3 border-b-4 border-green'>
              Nuevos orientados
            </h4>
            <Link to='/orientados/alta-orientado'>
              <Button type='button' name='Ingresar orientado' />
            </Link>
          </div>
          <OrientedList users={studentList} />
          <div className='relative mt-16'>
            <h2 className='mb-4 h-[26px] w-[135px] pb-3 border-b-8 text-2xl font-medium text-blue '>
              Novedades
            </h2>
            <div className='grid-cols-1 lap_tablet:grid-cols-2 desktop:grid-cols-3 gap-4 cursor-pointer grid'>
              <CardText title='¿Usás inteligentemente tu tiempo?' />
              <CardText title='¿Estás todavía con dudas sobre qué carrera seguir?' />
              <CardText title='¿Qué querés aportar?' />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;