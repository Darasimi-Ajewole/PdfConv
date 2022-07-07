import React, { createContext, useRef, useState } from "react";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { initialiseFirestore } from "../utils/firebase";

export interface TaskStatusDataInterface {
  blob_name: string;
  status: "failed" | "success" | "running" | "stasis";
  task_id: string;
  download_url: string | null;
  pdf_name: string;
}

export interface StatusContextInterface {
  taskStatusId: string | null;
  taskStatusData: TaskStatusDataInterface | null;
  cancelConversion: () => void;
  attachUpdateListener: (newtaskStatusId: string) => void;
}

export const StatusContext = createContext<StatusContextInterface>(
  {} as StatusContextInterface
);

const db = initialiseFirestore();

type StatusContextProviderProps = {
  children: JSX.Element[];
};

const StatusContextProvider = (props: StatusContextProviderProps) => {
  const [taskStatusId, setStatusId] = useState<string | null>(null);
  const [taskStatusData, setStatusData] =
    useState<TaskStatusDataInterface | null>(null);
  const unsubscribe = useRef<Unsubscribe | null>(null);

  const cancelConversion = () => {
    setStatusId(null);
    setStatusData(null);

    console.log(`Unsubscribing from update about task`);
    unsubscribe.current?.();
    unsubscribe.current = null;
  };

  const attachUpdateListener = (newtaskStatusId: string) => {
    setStatusId(newtaskStatusId);
    console.log("attaching update listeners for", newtaskStatusId);

    const unsub = onSnapshot(
      doc(db, "conversion_task_status", newtaskStatusId),
      (doc) => {
        console.log("Current data: ", doc.data());
        const newStatusData = doc.data() as TaskStatusDataInterface;
        setStatusData(newStatusData);
      },
      (error) => console.error(error)
    );
    unsubscribe.current = unsub;
  };

  const globalContext = {
    taskStatusId,
    taskStatusData,
    cancelConversion,
    attachUpdateListener,
  };

  return (
    <StatusContext.Provider value={globalContext}>
      {props.children}
    </StatusContext.Provider>
  );
};

export default StatusContextProvider;
