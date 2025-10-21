import React from 'react';
import { Box, LinearProgress } from '@mui/material';

type LinearDeterminateProps = {
    onFinish: () => void;
}

export const LinearDeterminate: React.FC<LinearDeterminateProps> = ({onFinish}) => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const duration = 90000;
    const interval = 100;
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + increment;
        
        if (newProgress >= 100) {
          clearInterval(timer);
          
          if(onFinish) onFinish();
          return 100;
        }
        
        return newProgress;
      });
    }, interval);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} 
        sx={{ 
            height: 8,
            borderRadius: 10,
            width: '100%',
        }} />
    </Box>
  );
}
