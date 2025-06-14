import React from 'react';

export interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', style }) => (
    <div className={`card ${className}`} style={{
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: 24,
        background: '#fff',
        ...style
    }}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        {children}
    </div>
);

export default Card;