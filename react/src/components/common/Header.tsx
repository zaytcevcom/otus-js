import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {useProblemStore} from "../../store/problems.ts";

export default function Header() {
    const { resetCurrentProblem } = useProblemStore();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    LeetCode Clone
                </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/problems"
                    >
                        Problems
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/manage"
                        onClick={resetCurrentProblem}
                    >
                        Create Problem
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
