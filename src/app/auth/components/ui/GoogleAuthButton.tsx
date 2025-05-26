"use client" 

type GoogleAuthButtonProps = {
  authMode: 'signup' | 'signin';
  onClick: () => void;
};

const GoogleAuthButton = ({ authMode, onClick }: GoogleAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='w-full flex items-center justify-center font-bold gap-2 py-3 border-[.060rem] rounded-xl my-3'>
      <img
        src='/icons/google-icon.png'
        alt='Google Login'
        width='25px'
        height='25px'
      />
      {authMode === 'signup' ? 'Signup with Google' : 'Signin with Google'}
    </button>
  );
};

export default GoogleAuthButton;
