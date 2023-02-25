import Client from "@/types/Client";

export default interface Diet {
  id: string;

  name: string;

  description: string;

  clients: Client[];
}
