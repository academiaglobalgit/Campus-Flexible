import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Documento } from "../types/Documentos.interface";
import { useGetAllDocuments as getAllDocuments } from "../services/ManualesService";
import { decryptData, encryptData } from "../utils/crypto";
import { getSubdomainKey } from '../utils/Helpers';

type DocumentosContextType = {
  documentos: Documento[];
  setDocumentos: (docs: Documento[]) => void;
  getDocumentoById: (id: number) => Documento | undefined;
};

const DocumentosContext = createContext<DocumentosContextType | undefined>(undefined);

const STORAGE_KEY = import.meta.env.VITE_APP_DOCUMENTOS + getSubdomainKey();

export const DocumentosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = getAllDocuments();
  const [documentos, setDocumentos] = useState<Documento[]>(() => {
    // Inicializar desde localStorage si existe (sincrónico)
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Cargar y desencriptar documentos desde localStorage de forma asíncrona
  useEffect(() => {
    const loadDecrypted = async () => {
      const encrypted = localStorage.getItem(STORAGE_KEY);
      if (encrypted) {
        const decrypted = await decryptData(encrypted);
        try {
          const docs = JSON.parse(decrypted);
          setDocumentos(docs);
        } catch {
          setDocumentos([]);
        }
      }
    };
    loadDecrypted();
  }, []);

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    const saveEncrypted = async () => {
      const encry = await encryptData(JSON.stringify(documentos));
      localStorage.setItem(STORAGE_KEY, encry);
    };
    saveEncrypted();
  }, [documentos]);

  // Cuando llegan datos de la API, sobreescribir
  useEffect(() => {
    if (data) {
      setDocumentos(data.data);
    }
  }, [data]);

  const getDocumentoById = (id: number) => {
    return documentos.find(doc => doc.id_manual === id);
  };

  const value = {
    documentos,
    setDocumentos,
    getDocumentoById,
  };

  return (
    <DocumentosContext.Provider value={value}>
      {children}
    </DocumentosContext.Provider>
  );
};

export const useDocumentos = () => {
  const context = useContext(DocumentosContext);
  if (!context) throw new Error("useDocumentos debe ser usado dentro DocumentosProvider");
  return context;
};
