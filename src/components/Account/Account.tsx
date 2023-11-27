import { FC } from 'react';
import avatar from '../../icons/Avatar.svg';
import { User } from '../../redux/userSlice';

type UserProfileProps = {
  user: User | null
}

export const UserProfile: FC<UserProfileProps> = (props) => {
  const { user } = props;
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-5 border">

          <img src={avatar} alt="person_avatar"/>

          <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2'>
              <h3 style={{ color: "white" }}>{user && user.userName}</h3>
              <h3 style={{ color: "white" }}>{user && user.userLastName}</h3>
            </div>
          
            <h3 style={{ color: "white" }}>{user && user.position}</h3>
            <h3 style={{ color: "white" }}>{user && user.phoneNumber}</h3>
          </div>
      </div>
    </div>
    </>
  )
}