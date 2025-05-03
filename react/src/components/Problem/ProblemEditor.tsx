import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    Divider,
} from '@mui/material';
import { Problem, ProblemFormData } from '../../types/problem';
import TagsList from "../TagsList/TagsList.tsx";

interface ProblemEditorProps {
    problem: Problem | null;
    onSubmit: (data: ProblemFormData) => void;
}

export default function ProblemEditor({ problem, onSubmit }: ProblemEditorProps) {
    const { control, handleSubmit, watch, setValue } = useForm<ProblemFormData>({
        defaultValues: {
            title: problem?.title || '',
            description: problem?.description || '',
            inputExample: problem?.inputExample || '',
            outputExample: problem?.outputExample || '',
            difficulty: problem?.difficulty || 'Medium',
            tags: problem?.tags.join(', ') || '',
        },
    });

    const tagsString = watch('tags');
    const tags = tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

    const handleDeleteTag = (tagToDelete: string) => {
        const newTags = tags.filter((tag) => tag !== tagToDelete);
        setValue('tags', newTags.join(', '));
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Title"
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        label="Difficulty"
                        fullWidth
                        margin="normal"
                    >
                        {['Easy', 'Medium', 'Hard'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Tags (comma separated)"
                        fullWidth
                        margin="normal"
                        helperText="e.g. array, string, dynamic programming"
                    />
                )}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                <TagsList tags={tags} onDeleteTag={handleDeleteTag} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={8}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="inputExample"
                control={control}
                rules={{ required: 'Input example is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Input Example"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="outputExample"
                control={control}
                rules={{ required: 'Output example is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Output Example"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button type="submit" variant="contained" size="large">
                    {problem ? 'Update Problem' : 'Create Problem'}
                </Button>
            </Box>
        </Box>
    );
}
