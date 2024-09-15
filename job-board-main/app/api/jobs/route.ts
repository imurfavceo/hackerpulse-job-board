import { NextResponse } from 'next/server';

import Airtable from 'airtable';

// Fetch Airtable credentials from environment variables, with fallback to empty strings
const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || '' }).base(process.env.AIRTABLE_BASE_ID || '');

export async function GET() {
  try {
    // Fetch records from the "Live Jobs" table
    const records = await base('tblenlOYGMu11tlBZ').select().firstPage(); // Ensure records are fetched from Airtable
    
    // Log the full record to see the available fields
    records.forEach(record => {
        console.log('Airtable Record:', record.fields);
      });

    // Map over the records and extract the required fields
    const jobs = records.map((record: Airtable.Record<any>) => ({
      id: record.id, // Airtable record ID
      company: record.get('Company Name'),
      position: record.get('Position'), 
      salaryRange: record.get('Salary Range'), 
      location: record.get('Location'), 
      jobUrl: record.get('Job URL'), 
      workMode: record.get('Work Mode'), 
      logo: record.get('Logo') ? record.get('Logo')[0].url : '/placeholder.svg', // Get the first logo or use placeholder, 
    }));

    // Return the jobs data as JSON
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs from Airtable:', error);

    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

