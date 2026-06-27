import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ocKzkqD40zYegl62TMfqCyJtEKSZeDjuZzt0mCqyvH4/export?format=csv&gid=0";

export async function getProjects() {
  return new Promise((resolve, reject) => {
    Papa.parse(`${SHEET_URL}&t=${Date.now()}`, {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const projects = results.data.map((row) => ({
          id: Number(row.ID),
          title: row.Title,
          plant: row.Plant,
          domain: row.Domain,
          description: row.Description,

          video: `https://drive.google.com/file/d/${row.VideoID}/preview`,

          // Original sheet stores only the Drive File ID
          thumbnail: row.Thumbnail,

          featured:
            String(row.Featured).trim().toUpperCase() === "TRUE",

          sortOrder: Number(row["Sort order"]),

          status: row.Status,
        }));

        projects.sort((a, b) => a.sortOrder - b.sortOrder);

        resolve(projects);
      },

      error: (err) => reject(err),
    });
  });
}