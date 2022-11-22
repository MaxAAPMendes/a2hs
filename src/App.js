import './App.css';
import { useRef, useState, useEffect } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const beforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };
  useEffect(() => {
    console.log("effect rodou");
    window.addEventListener("beforeinstallprompt", beforeInstallPrompt, true);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPrompt,
        true
      );
    };
  }, []);

  function install() {
    console.log("entrou na função install");
    alert("entrou na função install");
    if (!deferredPrompt) return;
    const { prompt } = deferredPrompt;
    if (prompt) prompt();
    const { userChoice } = deferredPrompt;
    if (userChoice) {
      userChoice.then(choiceResult => {
        console.log("userChoice");
        if (choiceResult.outcome === "accepted") {
          // accepted
          console.log("aceito");
          alert("aceito");
        } else {
          // dismissed
          console.log("não aceito");
          alert("não aceito");
        }
        setDeferredPrompt(null);
      });
    }
  }
  
  return (
    <div className="container">
      <h1 style={{ color: "#fff" }}>Adicionar a area de trabalho</h1>
      <button onClick={install}>Add to home screen</button>
    </div>
  )
};

export default App;
