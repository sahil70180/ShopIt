import "./App.css"
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <h1 style={{textAlign : "center"}}>Setting up Footer and Header</h1>
      <Footer/>
    </div>
  );
}

export default App;
