'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
    {children}
  </NextThemesProvider>
);
