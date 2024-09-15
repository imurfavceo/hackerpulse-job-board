"use client";

import { useEffect,useState } from 'react';

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Job {
  id: string;
  company: string;
  position: string;
  salaryRange: string;
  location: string;
  jobUrl: string;
  workMode: string;
  logo: string;
}


export default function List() {
  const [jobs, setJobs] = useState<Job[]>([]); // Hold multiple jobs

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs"); // Fetch from the API
        const data = await response.json();
        setJobs(data); // Set all fetched jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>HackerPulse Jobs</CardTitle>
        <CardDescription>
          <i>Last updated: October 14th</i>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Position
              </TableHead>
              <TableHead>Work Mode</TableHead>
              <TableHead className="hidden md:table-cell">Salary Range</TableHead>
              <TableHead className="hidden md:table-cell">Date Added</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}> {/* Unique key for each row */}
              
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Company logo"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={job?.logo || '/placeholder.svg'} // Use job logo or placeholder
                  width="64"
                />
              </TableCell>
              
              <TableCell className="font-medium">
                {job?.company} {/* Dynamic company name */}
              </TableCell>
              
              <TableCell className="hidden md:table-cell">{job?.position} {/* Dynamic job position */}</TableCell>
              
              <TableCell>
                <Badge variant="outline">{job?.workMode}</Badge> {/* Dynamic work mode */}
              </TableCell>
              
              <TableCell className="hidden md:table-cell">{job?.salaryRange} {/* Dynamic salary range */}</TableCell>
              
              <TableCell className="hidden md:table-cell">
              {new Date().toLocaleDateString()} {/* For now, just display today's date */} 
              </TableCell>

              <TableCell>
             <a href={job?.jobUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="default" className="transition-all duration-200 transform active:scale-95">
                Apply Now!
              </Button>
            </a>
              </TableCell>

            </TableRow>
              ))}

          </TableBody>
          
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
        Currently there are <strong>{jobs.length}</strong> open roles!
        </div>
      </CardFooter>
    </Card>
  );
}
