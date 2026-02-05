const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const searchJobs = async (req, res) => {
  const { query, location, date_posted, remote_jobs_only, employment_types, job_requirements } = req.query;

  // Mock data for development if no API key or explicitly requested
  if (!process.env.RAPID_API_KEY) {
    console.log('No RapidAPI Key found, returning mock data');
    const mockJobs = [
      {
        job_id: '1',
        employer_name: 'Google',
        employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
        job_title: 'Software Engineer',
        job_description: 'Full stack developer role...',
        job_city: 'Mountain View',
        job_state: 'CA',
        job_country: 'USA',
        job_is_remote: false,
        job_posted_at_datetime_utc: new Date().toISOString(),
        job_apply_link: 'https://google.com/careers',
      },
      {
        job_id: '2',
        employer_name: 'Meta',
        employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png',
        job_title: 'React Developer',
        job_description: 'Frontend role...',
        job_city: 'Remote',
        job_state: null,
        job_country: 'USA',
        job_is_remote: true,
        job_posted_at_datetime_utc: new Date().toISOString(),
        job_apply_link: 'https://meta.com/careers',
      },
    ];
    return res.status(StatusCodes.OK).json({ data: mockJobs });
  }

  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: `${query} in ${location}`,
      page: '1',
      num_pages: '1',
      date_posted: date_posted || 'all',
      remote_jobs_only: remote_jobs_only || 'false',
      employment_types: employment_types || null,
      job_requirements: job_requirements || null,
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(StatusCodes.OK).json({ data: response.data.data });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Failed to fetch jobs' });
  }
};

module.exports = { searchJobs };
