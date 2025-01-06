export default function formatDate(dateString: Date): string {
  const [year, month, day] = dateString.toString().split("-");
  return `${day}/${month}/${year}`;
}
