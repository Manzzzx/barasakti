'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  className?: string;
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const Loading = memo(function Loading({
  size = 'md',
  variant = 'spinner',
  className = '',
  text,
  fullScreen = false,
  overlay = false
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
        sizeClasses[size]
      )}
      role="status"
      aria-label="Loading"
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1" role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary rounded-full animate-pulse',
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div 
      className={cn(
        'bg-primary rounded-full animate-pulse',
        sizeClasses[size]
      )}
      role="status"
      aria-label="Loading"
    />
  );

  const renderSkeleton = () => (
    <div className="space-y-3" role="status" aria-label="Loading content">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  );

  const renderLoadingContent = () => {
    let loadingElement;
    
    switch (variant) {
      case 'dots':
        loadingElement = renderDots();
        break;
      case 'pulse':
        loadingElement = renderPulse();
        break;
      case 'skeleton':
        loadingElement = renderSkeleton();
        break;
      default:
        loadingElement = renderSpinner();
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        {loadingElement}
        {text && (
          <p className={cn(
            'text-muted-foreground animate-pulse',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </div>
    );
  };

  if (fullScreen) {
    return (
      <div 
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          overlay ? 'bg-background/80 backdrop-blur-sm' : 'bg-background',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Loading"
      >
        {renderLoadingContent()}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'flex items-center justify-center p-4',
        className
      )}
    >
      {renderLoadingContent()}
    </div>
  );
});

export default Loading;

// Skeleton components for specific use cases
export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
});

export const TextSkeleton = memo(function TextSkeleton({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className={cn(
            'h-4 bg-gray-200 rounded animate-pulse',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
});