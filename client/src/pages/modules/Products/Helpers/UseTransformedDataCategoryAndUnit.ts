import { useEffect, useState } from "react";

const useTransformedData = <T,>(apiData: T[] | undefined, transformCallback: (data: T) => any) => {
    const [transformedData, setTransformedData] = useState<any[]>([]);

    useEffect(() => {
        if (apiData) {
        const transformed = apiData.map(transformCallback);
        setTransformedData(transformed);
        }
    }, [apiData, transformCallback]);

    return transformedData;
};

export default useTransformedData