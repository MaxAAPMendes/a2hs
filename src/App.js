import './App.css';
import { useState, useEffect } from "react";

function registrarServiceWork() {
  console.log("funcao registrarServiceWork");
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: '.'})
      .then(() => console.log('Service Work registrado!!!'))
      .catch((error) => console.log('Erro ao registrar Service work', error));
  }
}

function App() {
  registrarServiceWork();
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
    if (!deferredPrompt) return;
    const { prompt } = deferredPrompt;
    if (prompt) {
      console.log("entrou no bind");
      prompt.bind(window);
      deferredPrompt.prompt();
    };
    const { userChoice } = deferredPrompt;
    if (userChoice) {
      userChoice.then(choiceResult => {
        console.log("userChoice");
        if (choiceResult.outcome === "accepted") {
          // accepted
          console.log("aceito");
          alert("app instalado");
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
      <h1
        style={{
          color: "#fff",
          margin: "auto",
          width: "90%",
          // border: "1px solid red",
          textAlign: "center"
        }}>
          Adicionar atalho à área de trabalho
      </h1>
      <button
        style={{
          color: "#000",
          fontWeight: "600",
          background: "#ffcc00",
          borderRadius: "6px",
          border: "1px solid #fff",
          padding: "10px",
          margin: "auto",
        }}
        onClick={install}
      >
        ADICIONAR APP
      </button>
    </div>
  )
};

export default App;
