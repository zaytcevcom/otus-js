import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EditableTags from './EditableTags'; // Предполагается, что этот компонент уже существует

interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    description: string;
}

interface ProblemCardProps {
    problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Box
                    component={RouterLink}
                    to={`/problem/${problem.id}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' },
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {problem.title}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
                    <Chip
                        label={problem.difficulty}
                        color={
                            problem.difficulty === 'Easy'
                                ? 'success'
                                : problem.difficulty === 'Medium'
                                    ? 'warning'
                                    : 'error'
                        }
                        size="small"
                    />
                    <Box sx={{ ml: 1, display: 'flex', gap: 0.5 }}>
                        <EditableTags problemId={problem.id} tags={problem.tags} />
                    </Box>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {problem.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProblemCard;
