import Client from "@/types/entitys/Client";

export default interface Diet {
  id: string;

  name: string;

  description: string;

  clients: Client[];
}
