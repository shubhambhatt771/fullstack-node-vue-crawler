import { Client } from "@elastic/elasticsearch";
import { config } from "dotenv";

config();

const {ELASTIC_API_KEY, ELASTIC_END_POINT} = process.env;

export const elasticClient = new Client({
    node: ELASTIC_END_POINT,
    auth:{
        apiKey: ELASTIC_API_KEY
    }
});