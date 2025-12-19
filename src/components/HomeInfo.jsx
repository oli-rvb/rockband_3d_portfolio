import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

const InfoBox = ({ text, link, btnText}) => (
    <div className="info-box"> 
        <p className='font-medium sm:text-xl text-center mx-6'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn' target="_blank">
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain'/>
        </Link>
    </div>
)

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
            link="https://bluesuburbhour.com/index.php/a-venir/"
            btnText="Prochain concert"
        />
    ),
    3: (
        <InfoBox
            text= "Nos vidéos"
            link="https://bluesuburbhour.com/index.php/video/"
            btnText="Portfolio"
        />
    ),
    4: (
        <InfoBox
            text= "Newsletter & Réseaux"
            link="https://bluesuburbhour.com/index.php/contact/"
            btnText="Suivez-nous"
        />
    ),
}

function HomeInfo({ currentStage }) {
  return renderContent[currentStage] || null ;
}

export default HomeInfo