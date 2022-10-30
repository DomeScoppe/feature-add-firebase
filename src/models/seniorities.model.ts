
import { Meta } from "./meta.model";

export interface Seniorities {
    data: Data[];
    meta: Meta;
}

interface Attributes {
   
    name: string;
    local_key: string;
}   

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}