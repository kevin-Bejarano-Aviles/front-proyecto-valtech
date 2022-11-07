import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../../context/Context';
import IconUser from '../../../../assets/icons/privatePage/Icon_user.svg';
import IconLogouat from '../../../../assets/icons/privatePage/Icon_logout.svg';

export default function Logout() {
  const navigate = useNavigate();
  const { logOut } = useContext(Context);
  const login = () => {
    logOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className='w-[216px] h-20'>
      <div className='h-10 w-full bg-white hover:bg-hoverlogout border-x-2 border-t-2 border-gray-400  rounded-t-[10px] flex items-center'>
        <Link to='/inicio/mi-perfil'>
          <p className='ml-4 flex flex-row text-blue'>
            <img src={IconUser} alt='' className='mr-2' />
            Mi perfil
          </p>
        </Link>
      </div>
      <div className='h-10 w-full bg-white hover:bg-hoverlogout rounded-b-[10px] border-x-2 border-b-2 border-gray-400 flex items-center'>
        <Link to='/login' onClick={() => login()}>
          <p className='ml-4 flex flex-row text-blue'>
            <img src={IconLogouat} alt='' className='mr-2' />
            Cerrar sesión
          </p>
        </Link>
      </div>
    </div>
  );
}
