import { normalize, schema } from 'normalizr';

export function normalizeDatos(myData){
    const partido = new schema.Entity('partidos',{}, {idAttribute:"id"});
    const torneo = new schema.Entity('torneos',{partido: [partido]}, {idAttribute:"id"});
    const mySchema = [ torneo ] ;
    const normalizedData = normalize(myData, mySchema);

    return normalizedData;
}

export function normalizeDato(myData){
    const partido = new schema.Entity('partidos',{}, {idAttribute:"id"});
    const torneo = new schema.Entity('torneo',{partido: [partido]}, {idAttribute:"id"});
    const mySchema = torneo  ;
    const normalizedData = normalize(myData, mySchema);

    return normalizedData;
}
