import { useState, useRef, useEffect } from 'react';
import { Chip, TextField, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProblemStore } from '../../store/problems';
import TagsList from "../TagsList/TagsList.tsx";

interface EditableTagsProps {
    problemId: number;
    tags: string[];
}

export default function EditableTags({ problemId, tags }: EditableTagsProps) {
    const [editing, setEditing] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [currentTags, setCurrentTags] = useState(tags);
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateProblemTags } = useProblemStore();

    useEffect(() => {
        setCurrentTags(tags);
    }, [tags]);

    const handleAddTag = () => {
        if (newTag.trim() && !currentTags.includes(newTag.trim())) {
            const updatedTags = [...currentTags, newTag.trim()];
            setCurrentTags(updatedTags);
            updateProblemTags(problemId, updatedTags);
            setNewTag('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        const updatedTags = currentTags.filter(tag => tag !== tagToDelete);
        setCurrentTags(updatedTags);
        updateProblemTags(problemId, updatedTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTag();
        } else if (e.key === 'Escape') {
            setEditing(false);
        }
    };

    const handleAdd = () => {
        setEditing(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
            <TagsList tags={currentTags} onDeleteTag={handleDeleteTag} />

            {editing ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        inputRef={inputRef}
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size="small"
                        autoFocus
                        placeholder="New tag"
                        variant="outlined"
                        sx={{
                            width: 100,
                            '& .MuiInputBase-root': { height: 32 }
                        }}
                    />
                    <IconButton
                        onClick={handleAddTag}
                        size="small"
                        sx={{ ml: 0.5 }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            ) : (
                <Chip
                    label="+ Add"
                    size="small"
                    variant="outlined"
                    onClick={handleAdd}
                    sx={{ cursor: 'pointer' }}
                />
            )}
        </Box>
    );
}
