import Papa from 'papaparse';

async function fetchAndParseCSV(fetch, url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'text/csv'
    }
  });
  const csvText = await response.text();
  return Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
}

export const load = async ({ fetch }) => {
  const regions = await fetchAndParseCSV(fetch, 'https://raw.githubusercontent.com/JannesPeeters/DEAD/main/data/regions.csv');
  const customers = await fetchAndParseCSV(fetch, 'https://raw.githubusercontent.com/JannesPeeters/DEAD/main/data/customers.csv');
  const orders = await fetchAndParseCSV(fetch, 'https://raw.githubusercontent.com/JannesPeeters/DEAD/main/data/orders.csv');

  return {
    data: {
      regions,
      customers,
      orders
    }
  };
};
