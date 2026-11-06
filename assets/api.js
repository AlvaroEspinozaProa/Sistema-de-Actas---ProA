const API_URL=globalThis.PROA_API_URL||"";
let token="";
export function setToken(value){token=value}
export async function api(path, options={}){const response=await fetch(`${API_URL}${path}`,{...options,headers:{"content-type":"application/json",authorization:`Bearer ${token}`,...options.headers}});const body=await response.json().catch(()=>({message:"Respuesta inválida del servidor."}));if(!response.ok)throw Object.assign(new Error(body.message||"No se pudo completar la operación."),{status:response.status,body});return body}
