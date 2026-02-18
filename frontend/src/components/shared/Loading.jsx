import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div className="flex-center" style={{ height: '100vh', width: '100vw' }}>
            <Loader2 className="animate-spin text-primary" size={48} color="var(--primary)" />
        </div>
    );
};

export default Loading;
