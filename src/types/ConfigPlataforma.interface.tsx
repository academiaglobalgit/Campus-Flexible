export interface ConfigPlataformaResponse {
    success: boolean;
    data:    ConfigPlataforma;
}

export interface ConfigPlataforma {
    id_plan_estudio:   number;
    nombre_plan:       string;
    nombre_empresa:    string;
    logo_url:          string;
    logo_url_mini:     string;
    fuente_principal:  string;
    fuente_secundaria: string;
    color_primary:     string;
    color_secondary:   string;
    url_pdf:           string;
}