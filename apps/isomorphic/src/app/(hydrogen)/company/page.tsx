'use client';

import { notFound } from 'next/navigation';
import SlackIcon from '@core/components/icons/slack';
import GoogleIcon from '@core/components/icons/google';
import { SiPosthog } from 'react-icons/si';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface Product {
  id: string;
  name: string;
  price: number;
  icon: JSX.Element;
  description: string; // Added description field
}

const Company = () => {
  const [companies, setCompanies] = useState<string[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get('/api/companies');
        console.log(response.data.companies, 'getCompanies');
        setCompanies(response.data.companies || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  console.log(companies, 'companies');

  return (
    <div>
      {Array.isArray(companies) &&
        companies.map((company, index) => (
          <Link
            className="flex flex-col gap-2"
            href={`/company/${company}`}
            key={index}
          >
            {company}
          </Link>
        ))}
    </div>
  );
};

export default Company;
