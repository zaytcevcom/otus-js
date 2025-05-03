import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import ProblemEditor from '../components/Problem/ProblemEditor';
import { ProblemFormData } from '../types/problem';
import { useProblemStore } from '../store/problems';
import {useProblemData} from "../hooks/useProblemData.tsx";

export default function ProblemManagePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        currentProblem,
        loading,
        error,
        fetchProblemById,
        createProblem,
        updateProblem,
        resetCurrentProblem
    } = useProblemStore();
    const { isEditing } = useProblemData(id ? parseInt(id) : undefined, fetchProblemById);

    useEffect(() => {
        resetCurrentProblem();
    }, [resetCurrentProblem]);

    const handleSubmit = async (data: ProblemFormData) => {
        const problemData = {
            ...data,
            tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            additionalMaterials: [],
            rating: 0,
            createdBy: 1,
        };

        try {
            if (isEditing && id) {
                await updateProblem(parseInt(id), problemData);
            } else {
                await createProblem(problemData);
            }
            navigate('/');
        } catch (err) {
            console.error('Failed to save problem:', err);
        }
    };

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

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditing ? 'Edit Problem' : 'Create New Problem'}
            </Typography>
            <ProblemEditor
                problem={currentProblem}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}
