import React from 'react';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}