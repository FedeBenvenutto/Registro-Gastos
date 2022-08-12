  import React, { createContext, useState } from "react";

  export const FechaContext = createContext()
  export const FechaProvider = ({children}) => {
    const FechaActual = new Date();
    const AnoActual= (FechaActual.getFullYear()).toString();
    const Meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const MesActual= FechaActual.getMonth()
    const [Mes, setMes] = useState(Meses[MesActual]);
    const [Ano, setAno] = useState(AnoActual);
    return (
      <FechaContext.Provider
        value={{
          Mes,
          setMes,
          Ano,
          setAno
        }}
        >
        {children}
      </FechaContext.Provider>
    )
  }
  
