import { useRef } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
  const printContent = printRef.current;
  if (!printContent) return;

  const printWindow = window.open('', '_blank', 'width=1280,height=900');
  if (!printWindow) return;

  const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join('');

  const exportedAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Executive Laboratory Report</title>
      ${headMarkup}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        @page {
          size: A4;
          margin: 0; /* Full bleed control */
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #ffffff;
          -webkit-print-color-adjust: exact;
          color: #1a202c;
        }

        .page-wrapper {
          padding: 25mm 20mm;
          position: relative;
          min-height: 297mm;
        }

        /* Premium Border Frame */
        .page-wrapper::before {
          content: "";
          position: absolute;
          top: 10mm; bottom: 10mm; left: 10mm; right: 10mm;
          border: 1px solid #e2e8f0;
          pointer-events: none;
        }

        /* Decorative Accent */
        .top-accent {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 6px;
          background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
        }

        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 20px;
          margin-bottom: 40px;
        }

        .company-info h1 {
          margin: 0;
          font-size: 22pt;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #0f172a;
        }

        .company-info p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 10pt;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .report-meta {
          text-align: right;
        }

        .status-badge {
          display: inline-block;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 8pt;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        /* Card Customization for Premium Look */
        .report-content .MuiCard-root {
          border: none !important;
          border-radius: 0 !important;
          margin-bottom: 30px;
        }

        .report-content .MuiTypography-h6 {
          font-weight: 700 !important;
          color: #0f172a;
          border-left: 4px solid #0f172a;
          padding-left: 12px;
          margin-bottom: 15px !important;
        }

        /* DataGrid Premium Styling */
        .MuiDataGrid-root {
          border: none !important;
          font-family: 'Inter', sans-serif !important;
        }
        .MuiDataGrid-columnHeaders {
          background-color: #f8fafc !important;
          border-bottom: 2px solid #0f172a !important;
          text-transform: uppercase;
          font-size: 9pt;
          letter-spacing: 0.5px;
        }
        .MuiDataGrid-cell {
          border-bottom: 1px solid #f1f5f9 !important;
        }

        /* Chart container fixes */
        .chart-grid {
          break-inside: avoid;
        }

        .footer {
          position: absolute;
          bottom: 15mm;
          left: 20mm;
          right: 20mm;
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="top-accent"></div>
      <div class="page-wrapper">
        <header class="header">
          <div class="company-info">
            <h1>LABORATORY REPORT</h1>
            <p>Intelligence & Analytics Division</p>
          </div>
          <div class="report-meta">
            <div class="status-badge">OFFICIAL RELEASE</div>
            <div style="font-size: 9pt; color: #64748b;">
              <strong>Date:</strong> ${exportedAt}<br>
              <strong>Ref:</strong> L5-IDX-${Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </header>

        <main class="report-content">
          ${printContent.innerHTML}
        </main>

        <footer class="footer">
          <span>&copy; 2026 Laboratory Systems International</span>
          <span>Confidential - Document Class A</span>
          <span>Page 01</span>
        </footer>
      </div>
      <script>
        window.onload = () => {
          setTimeout(() => {
            window.print();
          }, 800);
        };
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
};

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports,
            category breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>Export</Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how
              many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: "Generated" },
                { data: [12, 19, 17, 23], label: "Completed" },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["January", "February", "March", "April"],
                  scaleType: "band",
                  label: "Months",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                This chart shows the distribution of report requests by
                category for the current reporting period.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: "Sales" },
                        { id: 1, value: 10, label: "Users" },
                        { id: 2, value: 8, label: "Inventory" },
                        { id: 3, value: 6, label: "Finance" },
                      ],
                    },
                  ]}
                  width={280}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                The gauge highlights the current percentage of reports
                completed on time based on the latest reporting cycle.
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>
        <Card>
          <CardContent>
            <DataGrid
              rows={rows}
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;