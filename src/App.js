import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Coin from './Components/Coin/Coin';
import Balance from './Components/Balance/Balance';
import Personal from './Components/Personal/Personal';
import Invite from './Components/Invite/Invite';
import Friends from './Components/Friends/Friends';
import Wallet from './Components/Wallet/Wallet';
import Tasks from './Components/Tasks/Tasks';
import { telegramWebApp } from '@twa-dev/sdk'; // Импортируем Telegram Web App SDK

import DragonCoin from './Components/Photo/DragonCoin2.png';

function App() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lang, setLang] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isPremium, setPremium] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [clicks, setClicks] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavBarClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Проверяем, что WebApp доступен и инициализирован
    if (telegramWebApp.initDataUnsafe && telegramWebApp.initDataUnsafe.user) {
      const user = telegramWebApp.initDataUnsafe.user;
      telegramWebApp.setHeaderColor('#0C0C0C'); // Устанавливаем цвет заголовка
      telegramWebApp.expand(); // Расширяем WebApp

      setUserData(user);
      setUserId(user.id);
      setLang(user.language_code);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setUserName(user.username);
      setPremium(user.is_premium ? true : false);

      // Если доступен URL аватара, сохраняем его
      if (user.photo_url) {
        setAvatarUrl(user.photo_url);
      }
    }
  }, []);

  function handleAnimationEnd(id) {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  }

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imgRect = e.target.getBoundingClientRect();
    const imgX = imgRect.left;
    const imgY = imgRect.top;

    setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);
  }

  return (
    <>
      <Personal firstName={firstName} lastName={lastName} userName={userName} avatarUrl={avatarUrl} />

      <Balance
        isVisible={activeIndex === 0}
        balanceAmount={balanceAmount}
        setBalanceAmount={setBalanceAmount}
      />
      {activeIndex === 0 && <Coin onClick={handleClick} />}

      {activeIndex === 1 && <Tasks />}

      {activeIndex === 2 && <Invite />}
      {activeIndex === 2 && <Friends />}

      {activeIndex === 3 && <Wallet />}

      <NavBar onNavClick={handleNavBarClick} activeIndex={activeIndex} />
      {clicks.map((click) => (
        <div
          key={click.id}
          className="float"
          style={{
            top: `${click.y - 70}px`,
            left: `${click.x - 20}px`,
            opacity: 1,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          <img src={DragonCoin} alt="" style={{ width: '70px', height: '70px' }} />
        </div>
      ))}
    </>
  );
}

export default App;
