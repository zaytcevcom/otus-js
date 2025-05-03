import { Box, Typography } from '@mui/material';
import { errorStyles } from './ErrorBlock.styles';
import {FC} from "react";

interface ErrorBlockProps {
    error: string
}

export const ErrorBlock: FC<ErrorBlockProps> = ({ error }) => {
        return (
            <Box sx={errorStyles.container}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
};
