import { ChangeEvent, FC, useState } from 'react';
import { PiLinkLight } from 'react-icons/pi';
import { SquareDeco } from '../Components';
import axios from 'axios';
import { ShortLink } from './ShortedLink';
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

interface shortResponse {
  message: string;
  status: number;
  short_url: string;
}

const Landing: FC = () => {
  const Squares = [
    { className: 'absolute top-0 left-0 rotate-[325deg]' },
    { className: 'absolute bottom-0 right-[-100px] rotate-45' },
    { className: 'absolute -bottom-20 -left-20 rotate-[225deg]' },
  ];
  
  const [loading, setLoading] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [shortLink, setShortLink] = useState<string>('');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const CallShorten = async (e: any) => {
    e.preventDefault();

    if (!isValidUrl(link)) {
      toast.error('Please enter a valid URL.');
      return;
    }

    const formData = new FormData();
    formData.append('FullUrl', link);

    setLoading(true);
    setSpinner(true);

    try {
      const response = await axios.post<shortResponse>(
        `${import.meta.env.VITE_API_URL}/PostShortUrl`,
        formData
      );
      setShortLink(response.data.short_url);
      setSpinner(false);
      setLoading(false);
    } catch {
      toast.error('Error creating your link, please try again later.');
      setLoading(true);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
      <Toaster position="top-center" />
      {loading ? <></> : <ShortLink shortLink={shortLink} />}
      <div>
        {Squares.map((item, i) => (
          <SquareDeco key={i} className={item.className} />
        ))}
      </div>
      <div className="absolute bottom-2">
        <a
          className="text-[#496190] flex text-xl"
          href="https://www.linkedin.com/in/luis-fernando-cabral-b13847220/"
          target="_blank"
        >
          <span className="ml-2 font-inter font-thin"> Made by @Scrabxd</span>
        </a>
      </div>

      <div className="flex flex-col items-center space-y-[15%]">
        <h1 className="font-inter-bold text-7xl leading-tight bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 bg-clip-text text-transparent">
          Shorten your loooong LINKS
        </h1>
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="flex flex-col items-center w-full max-w-4xl rounded-md border-4 border-solid border-border bg-fondoCaja">
            <div className="flex items-center w-full p-3">
              <PiLinkLight className="text-white size-6 mr-2" />
              <input
                type="text"
                className="flex-grow bg-secondary font-inter text-white p-2 rounded-l-md outline-none"
                placeholder="Enter the link here"
                value={link}
                onChange={onChange}
              />
              <button
                className="bg-button text-white rounded-md font-inter p-2 pl-4 pr-4 ml-1"
                onClick={CallShorten}
                disabled={spinner}
              >
                <p className="drop-shadow-[0_0px_5px_rgba(20,78,227,0.26)]">
                  {spinner ? <BeatLoader size={12} color="white" /> : 'Shorten'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
