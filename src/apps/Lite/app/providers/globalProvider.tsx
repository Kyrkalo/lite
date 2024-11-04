import { useReducer } from "react";
import { GlobalContext } from "../contexts/serviceContexts";
import { reducer, initialState } from "../reducers/globalReducer";


export default function  GlobalProvider(children: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};



