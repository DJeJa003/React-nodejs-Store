import { useState, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Komponentit/Header";
import Navigointi from "./Komponentit/Navigointi";
import KirjauduScreen from "./Screenit/KirjauduScreen";
import OstoScreen from "./Screenit/OstoScreen";
import KotiScreen from "./Screenit/KotiScreen";
import RekisteroiScreen from "./Screenit/RekisteroiScreen";
import ProfiiliScreen from "./Screenit/ProfiiliScreen";
import LuoTuoteScreen from "./Screenit/LuoTuoteScreen";
import PoistaTuoteScreen from "./Screenit/PoistaTuoteScreen";


interface Tuote {
  id: string;
  nimi: string;
  hinta: number;
  kuvaus: string;
  kuva: string;
  maara: number;
}

interface Kori {
  id: string;
  tuotteet: string;
  summa: string;
}

const App: FC = () => {
  const [ tuote, setTuote ] = useState<Tuote[]>([]);
  const [ kori, setKori ] = useState<Kori[]>([]);

  //sovelluksen juuri
  return(
    <div>
      <Header>
          <Navigointi/>
      </Header>
      
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={ <KotiScreen tuoteLista={ tuote }/> }
          />
          <Route
            path="/rekisteroidy"
            element={ <RekisteroiScreen/> }
          />
          <Route
            path="/kirjaudu"
            element={ <KirjauduScreen/> }
          />
          <Route
            path="/osto"
            element={ <OstoScreen/> }
          />
          <Route
            path="/profiili"
            element={ <ProfiiliScreen/> }
          />
          <Route
            path="/luotuote"
            element={ <LuoTuoteScreen/> }
          />
          <Route
            path="/poista"
            element={ <PoistaTuoteScreen/> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}


export default App;