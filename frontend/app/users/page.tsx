import React from 'react';
import UsersList from '@/components/UsersList';

export default async function page() {    
  return (
    <div className="bg-gray-100 min-h-screen">
        <UsersList></UsersList>
    </div>
  )
}
