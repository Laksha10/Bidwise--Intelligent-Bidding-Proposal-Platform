import { createContext, useState } from "react";

export const ServiceContext = createContext();

export default function ServiceProvider({ children }) {
  const [services, setServices] = useState([]); // Stores posted services
  const [bids, setBids] = useState([]);         // Stores bids for services

  const addService = (service) => {
    setServices([...services, service]);

    // Create dummy bids for demonstration
    const dummyBids = [
      { id: 1, company: "DesignPro", price: "$150", duration: "3 days" },
      { id: 2, company: "CreativeWorks", price: "$200", duration: "2 days" },
      { id: 3, company: "LogoMasters", price: "$120", duration: "5 days" },
    ];
    setBids([...bids, { serviceTitle: service.title, bids: dummyBids }]);
  };

  return (
    <ServiceContext.Provider value={{ services, addService, bids }}>
      {children}
    </ServiceContext.Provider>
  );
}

