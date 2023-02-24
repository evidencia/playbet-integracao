export default function formatDate(dateToFormat: string | undefined) {
  if (!dateToFormat) return;

  const year = dateToFormat.split('-')[0];
  const month = dateToFormat.split('-')[1];
  const day = dateToFormat.split('-')[2][0] + dateToFormat.split('-')[2][1];
  
  return `${day}/${month}/${year}`;
}
