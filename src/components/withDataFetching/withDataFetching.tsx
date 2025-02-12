import { useState, useEffect } from "react";

export function withDataFetching(WrappedComponent, url) {
  return function DataFetchingComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setData(data);
            setLoading(false);  
          }, 2500);          
        });
    }, [url]);

    if (loading) return <p>Cargando...</p>;

    return <WrappedComponent users={data} {...props} />;
  };
}
