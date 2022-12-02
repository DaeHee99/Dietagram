import { useState } from 'react';
import './App.css';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';

function App() {
  const [loginOK, setLoginOK] = useState(false);

  const loginHangler = (tf) => {
    setLoginOK(tf);
  }

  return (
    <div className="App">
      {!loginOK ? 
      <LoginPage loginHangler={loginHangler}/> :
      <MainPage />
      }
    </div>
  );
}

export default App;
