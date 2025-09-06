export const getPlataformaFromSubdomain = () => {
    const subdomain = window.location.hostname.split(".")[0];
    return subdomain; // ej: ley, coppel, etc
}