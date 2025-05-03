import {useEffect, useState} from "react";

export const useProblemData = (id?: number, fetchProblemById?: (id: number) => void) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id && fetchProblemById) {
            fetchProblemById(id);
            setIsEditing(true);
        }
    }, [id, fetchProblemById]);

    return { isEditing };
};
