import React, { memo } from 'react';
import { Chip } from '@mui/material';

interface TagsListProps {
    tags: string[];
    onDeleteTag: (tag: string) => void;
}

const TagsList: React.FC<TagsListProps> = memo(({ tags, onDeleteTag }) => {
    return (
        <>
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    size="small"
                />
            ))}
        </>
    );
});

export default TagsList;
