import Editor, { OnChange } from '@monaco-editor/react';
import { useTheme } from '@mui/material';

interface CodeEditorProps {
    code: string;
    language?: string;
    onChange?: (value: string | undefined) => void;
    height?: string;
}

export default function CodeEditor({
   code,
   language = 'javascript',
   onChange,
   height = '500px',
}: CodeEditorProps) {
    const theme = useTheme();

    const handleChange: OnChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <Editor
            height={height}
            language={language}
            theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'light'}
            value={code}
            onChange={handleChange}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
            }}
        />
    );
}
