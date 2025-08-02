import { createSignal } from "solid-js";
import TabsDemo from "./TabsDemo";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [showDemo, setShowDemo] = createSignal(false);

  if (showDemo()) {
    return <TabsDemo />;
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Solid DaisyUI</h1>
      <div class="card">
        <button 
          class="btn btn-primary"
          onClick={() => setShowDemo(true)}
        >
          View Tabs Component Demo
        </button>
        <p>
          Advanced tabs architecture with TDD methodology
        </p>
      </div>
      <p class="read-the-docs">
        Click the button above to see the comprehensive tabs component implementation
      </p>
    </>
  );
}

export default App;
