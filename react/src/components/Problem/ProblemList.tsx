import { useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    Typography,
    Pagination,
    TextField,
    MenuItem,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useProblemStore } from '../../store/problems';
import EditableTags from "./EditableTags.tsx";

export default function ProblemList() {
    const {
        problems,
        loading,
        error,
        fetchProblems,
        page,
        setPage,
        totalPages,
        searchQuery,
        setSearchQuery,
        difficultyFilter,
        setDifficultyFilter,
    } = useProblemStore();

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems, page, searchQuery, difficultyFilter]);

    const { resetCurrentProblem } = useProblemStore();

    if (loading && !problems.length) {
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
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Problems
                </Typography>
                <Button
                    component={Link}
                    to="/manage"
                    variant="contained"
                    color="primary"
                    onClick={resetCurrentProblem}
                >
                    Create New Problem
                </Button>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    label="Search problems"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TextField
                    select
                    label="Difficulty"
                    variant="outlined"
                    sx={{ minWidth: 120 }}
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </Box>

            <Grid container spacing={3}>
                {problems.map((problem) => (
                    <Grid item xs={12} key={problem.id.toString()}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box
                                    component={Link}
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
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
}
