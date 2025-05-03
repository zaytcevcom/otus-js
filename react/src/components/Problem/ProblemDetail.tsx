import { Problem } from '../../types/problem';
import { Typography, Chip, Box, Paper, Divider } from '@mui/material';
import CodeEditor from './CodeEditor';

interface ProblemDetailProps {
    problem: Problem;
    initialCode?: string;
    onCodeChange?: (code: string) => void;
}

export default function ProblemDetail({
  problem,
  initialCode = '// Write your solution here',
  onCodeChange,
}: ProblemDetailProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="h4" component="h1">
                    {problem.title}
                </Typography>
                <Chip
                    label={problem.difficulty}
                    color={
                        problem.difficulty === 'Easy'
                            ? 'success'
                            : problem.difficulty === 'Medium'
                                ? 'warning'
                                : 'error'
                    }
                    sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {problem.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" />
                    ))}
                </Box>
            </Box>

            <Divider />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Description
                </Typography>
                <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    {problem.description}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Examples
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography fontWeight="bold">Input:</Typography>
                    <Box component="pre" sx={{
                        bgcolor: 'background.default',
                        p: 2,
                        borderRadius: 1,
                        overflowX: 'auto'
                    }}>
                        {problem.inputExample}
                    </Box>
                    <Typography fontWeight="bold" mt={2}>
                        Output:
                    </Typography>
                    <Box component="pre" sx={{
                        bgcolor: 'background.default',
                        p: 2,
                        borderRadius: 1,
                        overflowX: 'auto'
                    }}>
                        {problem.outputExample}
                    </Box>
                </Paper>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Solution
                </Typography>
                <CodeEditor code={initialCode} language={'javascript'} onChange={onCodeChange} height={'500px'} />
            </Box>
        </Box>
    );
}
