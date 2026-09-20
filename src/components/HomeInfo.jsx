import useServerClosed from '../hooks/useServerClosed';
import { arrow } from '../assets/icons';
import { INSTAGRAM_URL } from '../constants';

const InfoBox = ({ text, btnText, href }) => {
  const { open } = useServerClosed();
  const btnClass = 'neo-brutalism-white neo-btn cursor-pointer';
  const btnContent = (
    <>
        {btnText}
        <img src={arrow} className='w-4 h-4 object-contain'/>
    </>
  );
  return (
    <div className="info-box"> 
        <p className='font-medium sm:text-xl text-center mx-6'>{text}</p>
        {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={btnClass}>
                {btnContent}
            </a>
        ) : (
            <button type="button" onClick={open} className={btnClass}>
                {btnContent}
            </button>
        )}
    </div>
  );
}

const renderContent = {
    1: (
        <h1 className="sm:text-x1 sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">Hi, we are <span className='font-semibold'>Blue Suburb Hour</span> 👋
        <br />
        A pop/alternative/rock band.
        </h1>
    ),
    2: (
        <InfoBox
            text= "Dernières infos !"
            btnText="Prochain concert"
        />
    ),
    3: (
        <InfoBox
            text= "Nos vidéos"
            btnText="Portfolio"
        />
    ),
    4: (
        <InfoBox
            text= "Newsletter & Réseaux"
            btnText="Suivez-nous"
            href={INSTAGRAM_URL}
        />
    ),
}

function HomeInfo({ currentStage }) {
  return renderContent[currentStage] || null ;
}

export default HomeInfo