import React, { createContext, useRef, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { initialiseFirestore } from '../utils/firebase';

export const StatusContext = createContext();

const db = initialiseFirestore();

const StatusContextProvider = (props) => {
  const [taskStatusId, setStatusId] = useState(null);
  const [taskStatusData, setStatusData] = useState(null);
  const unsubscribe = useRef()
  // const [unsubscribe, setUnsubscribe] = useState(null);

  const cancelConversion = () => {
    setStatusId(null);
    setStatusData(null);

    console.log(`Unsubscribing from update about task`)
    unsubscribe.current?.()
    unsubscribe.current = null
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
    unsubscribe.current = unsub
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
