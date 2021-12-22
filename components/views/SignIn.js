import { Button } from 'antd';
import firebaseApp from '../../net/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        onClick={() => {
          const auth = getAuth(firebaseApp);
          const provider = new GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          signInWithPopup(auth, provider)
            .then((res) => {
              const { email } = res.user;
              switch (email) {
                case 'sjlee347@gmail.com':
                  router.push('/');
                  break;
                default:
                  alert('관리자만 로그인할 수 있습니다.');
              }
            })
            .catch(console.warn);
        }}
      >
        로그인
      </Button>
    </div>
  );
}
