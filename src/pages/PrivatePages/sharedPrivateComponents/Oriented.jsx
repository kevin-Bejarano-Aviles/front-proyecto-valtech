import { useNavigate } from 'react-router-dom';
import iconUser from '../../../assets/icons/privatePage/Icon_user.svg';

function Oriented({ info, asignOriented = false }) {
  const navigate = useNavigate();
  const oriented = info.adviserId;

  return (
    <div
      className='flex items-center justify-between gap-4 pl-6 w-80 h-24 list-none border-solid border-2 rounded-lg border-slate-200 cursor-pointer'
      onClick={() => {
        navigate(`/orientados/${info.id}`);
      }}
    >
      <div className='flex  '>
        <img
          className='w-16 h-16 rounded-full ml-[-5px] mt-[-4px] mx-1'
          src={`https://proyecto-academy.herokuapp.com/admin/images/${info.avatar}`}
          alt=''
        />
        <div className='ml-2'>
          <h3 className='font-medium text-base'>{info.fullName}</h3>
          <h4 className='text-sm text-lightgray'>{info.school}</h4>
        </div>
      </div>
      {asignOriented && oriented && (
        <div
          className={`flex mb-12 mr-4 w-4 h-4  ${!asignOriented && 'hidden'}`}
        >
          <img src={iconUser} alt='iconUser' />
        </div>
      )}
    </div>
  );
}
export default Oriented;
