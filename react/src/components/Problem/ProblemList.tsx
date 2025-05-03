import { useEffect } from 'react';
import {
    Box,
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
import {ErrorBlock} from "../ErrorBlock/ErrorBlock.tsx";
import ProblemCard from "./ProblemCard.tsx";

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
        return <ErrorBlock error={error} />;
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
                        <ProblemCard problem={problem} />
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
