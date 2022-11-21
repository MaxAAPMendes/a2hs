import './App.css';

const App = () => {

  let deferredPrompt;
  const addBtn = document.querySelector(".add-button");
  // addBtn.style.display = "none";

  return (
    <div class="container">
      <h1 style={{ color: "#fff" }}>Adicionar a area de trabalho</h1>
      <button class="add-button">Add to home screen</button>
    </div>
  )
};

export default App;
