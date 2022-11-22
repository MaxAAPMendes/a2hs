import './App.css';

function App() {
  let deferredPrompt;
  const addBtn = document.querySelector(".add-button");
  // addBtn.style.display = "none";

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";
  
    addBtn.addEventListener("click", (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      addBtn.style.background = "gray";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          alert("aceitou");
        } else {
          console.log("User dismissed the A2HS prompt");
          alert("dimiss");
        }
        deferredPrompt = null;
      });
    });
  });
  return (
    <div class="container">
      <h1 style={{ color: "#fff" }}>Adicionar a area de trabalho</h1>
      <button class="add-button">Add to home screen</button>
    </div>
  )
};

export default App;
