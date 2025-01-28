import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
export default function Home() {
  const cookieValue = getCookie('hyrio');
  if(!cookieValue){
    return redirect('/login')
  }
  return (
    <>

    </>
  );
}
