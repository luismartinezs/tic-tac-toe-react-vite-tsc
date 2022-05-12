import GameFinished from "@/components/GameFinished";
import GameStart from "@/components/GameStart";
import { useState } from "react";

function App(): JSX.Element {
  const [showFinished, setShowFinished] = useState(false);

  return (
    <div>
      <button onClick={() => setShowFinished(!showFinished)} className="mb-8 bg-primary-500 text-white px-4 py-2 rounded">
        Show {showFinished ? "start" : "finish"}
      </button>
      {showFinished ? <GameFinished /> : <GameStart />}
    </div>
  );
}

export default App;
