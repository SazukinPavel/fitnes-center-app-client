import moment from "moment";

export default function useFormaters() {
  const formatDate = (date: any) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const formatDateTime = (datetime: any) => {
    return moment(datetime).utc().format("YYYY-MM-DD HH:mm");
  };

  return { formatDate, formatDateTime };
}
