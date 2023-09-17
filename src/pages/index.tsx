import { BASE_URL, MESSAGE_EVENT } from '@/constant';
import { isValidURL } from '@/utils/isValidEmail';
import { useEffect, useState } from 'react';
import Player from 'rrweb-player';

function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [url, setUrl] = useState<string>(`${BASE_URL}?url=https://www.frameiteasy.com/`);

  const handleMessage = (event: any) => {
    if (event.data && event.data.type === MESSAGE_EVENT.RRWEB_EVENT) {
      setEvents((prevEvents) => [...prevEvents, event.data.event]);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  const handleReplay = () => {
    const iframe = document.getElementById('replay-container');

    if (!iframe) {
      return;
    }

    new Player({
      target: iframe, 
      props: {
        events,
      },
    });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(!isValidURL(url)){
      alert('Invalid URL');
    }else{
      setUrl(`${BASE_URL}?url=${url}`);
    }
  }

  return (
    <div>
      <form className='flex items-center justify-center gap-4 my-4 px-4' onSubmit={onSubmitHandler}>
        <input 
          type="email" 
          placeholder="Enter URL" 
          className='w-full px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         type="submit">Go</button>
      </form>
      
      <iframe 
        id="external-content" 
        src={url} 
        width="100%" 
        height="600px" 
      />

    <div className='justify-center flex items-center'>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'  tabIndex={0} onClick={handleReplay}>Replay</button>

    </div>

      <div id="replay-container" className='w-full h-full mt-5'/>
    </div>
  );
}


export default Home;