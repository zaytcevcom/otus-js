import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProblemDetail from '../components/Problem/ProblemDetail';
import { useProblemStore } from '../store/problems';

export default function ProblemPage() {
    const { id } = useParams<{ id: string }>();
    const { currentProblem, loading, error, fetchProblemById } = useProblemStore();
    const [code, setCode] = useState<string>(
        'function twoSum(nums: number[], target: number): number[] {\n    // Your code here\n};'
    );

    useEffect(() => {
        if (id) {
            fetchProblemById(parseInt(id));
        }
    }, [id, fetchProblemById]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!currentProblem) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Problem not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <ProblemDetail
                problem={currentProblem}
                initialCode={code}
                onCodeChange={setCode}
            />
        </Box>
    );
}
