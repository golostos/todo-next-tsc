import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"

export const Loading: React.FC = () => {
    return <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <CircularProgress />
    </Box>
}