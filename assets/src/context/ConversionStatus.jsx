import React, { createContext, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { initialiseFirestore } from '../utils/firebase';

export const StatusContext = createContext();

const db = initialiseFirestore();

const StatusContextProvider = (props) => {
  const [taskStatusId, setStatusId] = useState(null);
  const [taskStatusData, setStatusData] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const cancelConversion = () => {
    setStatusId(null);
    setStatusData(null);
    unsubscribe()
    setUnsubscribe(null);
    // TODO: change task status on firestore to canceled
  }

  const attachUpdateListener = (newtaskStatusId) => {
    setStatusId(newtaskStatusId);
    console.log('attaching update listeners for', newtaskStatusId)

    const unsub = onSnapshot(
      doc(db, "conversion_task_status", newtaskStatusId),
      (doc) => {
        console.log("Current data: ", doc.data());
        setStatusData(doc.data());
      },
      (error) => console.error(error)
    );
    setUnsubscribe(() => unsub);
  }



  const globalContext = {
    taskStatusId,
    taskStatusData,
    cancelConversion,
    attachUpdateListener,
  }

  return (
    <StatusContext.Provider value={globalContext}>
        {props.children}
    </StatusContext.Provider>
  )
}

export default StatusContextProvider;
