import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import Avatar from '../../../../assets/admins/default.jpg';
import MenuComponent from './MenuComponent';
import Logout from '../../../../assets/icons/privatePage/Icon_logout.svg';
import Context from '../../../../context/Context';

export default function MenuResponsive({ menu, setMenu }) {
  const navigate = useNavigate();
  const { logOut } = useContext(Context);
  const login = () => {
    logOut();
    navigate('/login', { replace: true });
  };

  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className={`fixed top-0 felx flex-row ${menu ? 'block' : 'hidden'}`}>
      <div className='min-h-screen w-[1023px] flex items-center  bg-[#2E384D] bg-opacity-30 z-30' onClick={() => setMenu(false)}>
        <div className='relative flex flex-col min-w-[275px] max-w-[325px] h-screen bg-white border-r border-bordergray'>
          <div className='flex flex-row-reverse mt-3 pr-3 '>
            <div onClick={() => setMenu(false)}>
              <Icon icon='bx:x' height='30' width='30' />
            </div>
          </div>
          <div className='flex flex-row items-center mt-3'>
            <div>
              <Link to='/inicio/mi-perfil'>
                <img
                  className='h-[70px] w-[70px] ml-8 rounded-full'
                  src={Avatar}
                  alt='Profile_picture_admin'
                />
              </Link>
            </div>
            <div className='ml-3.5'>
              <h4>¡Bienvenido/a!</h4>
             <Link to='/inicio/mi-perfil'><h4 className='text-lightgray'>{admin.fullName}</h4></Link>  
            </div>
          </div>
          <div className='mt-10'>
            <MenuComponent />
          </div>
          <div className='absolute bottom-8 ml-8'>
            <Link to='/login' onClick={login}>
              <h4 className='flex flex-row'>
                <img className='mr-2' src={Logout} alt='' />
                Cerrar sesión
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
