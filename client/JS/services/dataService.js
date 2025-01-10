
export async function fetchJSONData(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`Error al conectar: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("No se ha podido obtener la información:", error);
        return null;
    }
}
