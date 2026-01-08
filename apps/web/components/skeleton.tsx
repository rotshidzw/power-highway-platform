'use client';

import React from 'react';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800 ${className ?? ''}`} />
);
