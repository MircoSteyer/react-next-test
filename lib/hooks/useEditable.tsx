"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
export interface EditableContext {
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
}

const EditableContext = createContext<EditableContext>({
  editable: true,
  setEditable: () => {},
});

export const useEditable = () => {
  return useContext(EditableContext);
};

interface EditableProviderProps {
  children: ReactNode;
  defaultEditable: boolean;
}
export const EditableProvider = ({
  children,
  defaultEditable,
}: EditableProviderProps) => {
  const [editable, setEditable] = useState<boolean>(defaultEditable);

  return (
    <EditableContext.Provider value={{ editable, setEditable }}>
      {children}
    </EditableContext.Provider>
  );
};
