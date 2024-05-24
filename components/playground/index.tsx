"use client";
import React, { useEffect } from 'react';
import { Input } from '@nextui-org/react';
import Card from './Card';
import useInput from '@/hooks/useInput';
import useApi from '@/hooks/useApi';

interface Link {
  url: string;
  shortCode: string;
}

function Playground(): JSX.Element {
  const urlInput = useInput('');
  const { data: links, execute: fetchLinks, loading, error } = useApi<Link[]>({ method: 'GET', path: 'get_user_links' });
  const api = useApi<{ shortUrl: string }>({ method: 'POST', path: 'shorten', params: { url: urlInput.value } });

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleShortenClick = () => {
    if (!urlInput.value.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    api.execute(); 
    fetchLinks();
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto flex justify-center items-center my-4 px-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="relative mb-4">
          <Input {...urlInput} type="text" label="Full Link" variant="bordered" fullWidth className="w-full" />
          <button className="absolute inset-y-0 right-5 flex w-10 items-center justify-center" onClick={handleShortenClick}>
            Shorten
          </button>
        </div>
        {links?.map(link => (
          <Card key={link.shortCode} url={link.url} shortCode={link.shortCode} />
        ))}
      </div>
    </div>
  );
}

export default Playground;
