import React from "react";
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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: "N/A" },
  { id: 6, lastName: "Melisandre", firstName: "N/A", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 170,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const stats = [
  ["Generated Reports", "89", "Total generated reports."],
  ["Completed Reports", "71", "Total completed reports."],
  ["Completion Rate", "78%", "Current report completion rate."],
];

const monthlyData = [
  ["January", 18, 12],
  ["February", 24, 19],
  ["March", 20, 17],
  ["April", 27, 23],
];

const categoryData = [
  ["Sales", 14],
  ["Users", 10],
  ["Inventory", 8],
  ["Finance", 6],
];

const ReportsPage = () => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=1280,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date());

    // Generate random Reference ID as seen in screenshot
    const refId = `L5-IDX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Executive Laboratory Report</title>
        ${headMarkup}
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
          
          @page {
            size: A4;
            margin: 0; /* Full bleed control */
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            color: #1a202c;
          }
          
          .page-wrapper {
            padding: 25mm 20mm;
            position: relative;
            min-height: 297mm;
            box-sizing: border-box;
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
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #0f172a;
            font-size: 24px;
          }
          
          .company-info p {
            margin: 4px 0 0 0;
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

          .meta-text {
            font-size: 9pt; 
            color: #64748b;
            line-height: 1.5;
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

          /* Printable layout grids */
          .print-stats-grid {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
          }

          .print-stat-card {
            flex: 1;
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 8px;
          }

          .print-stat-title {
            font-size: 10pt;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .print-stat-value {
            font-size: 24pt;
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 4px;
          }

          .print-stat-desc {
            font-size: 8.5pt;
            color: #94a3b8;
          }

          .print-flex-row {
            display: flex;
            gap: 24px;
            margin-bottom: 30px;
          }

          .print-flex-col-1 { flex: 1; }
          .print-flex-col-2 { flex: 2; }

          .print-bar-row {
            margin-bottom: 14px;
          }

          .print-bar-label {
            font-size: 10pt;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .print-bar-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .print-bar {
            height: 10px;
            border-radius: 999px;
          }

          .print-bar-val {
            font-size: 9pt;
            color: #475569;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
          }

          .print-table th {
            background-color: #f8fafc;
            padding: 10px;
            text-align: left;
            border-bottom: 2px solid #0f172a;
            color: #0f172a;
            font-weight: 800;
          }

          .print-table td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
            color: #334155;
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
              <div class="meta-text">
                <strong>Date:</strong> ${exportedAt}<br />
                <strong>Ref:</strong> ${refId}
              </div>
            </div>
          </header>

          <main class="report-content">
            <div class="print-stats-grid">
              ${stats.map(item => `
                <div class="print-stat-card">
                  <div class="print-stat-title">${item[0]}</div>
                  <div class="print-stat-value">${item[1]}</div>
                  <div class="print-stat-desc">${item[2]}</div>
                </div>
              `).join('')}
            </div>

            <div class="print-flex-row chart-grid">
              <div class="print-flex-col-2" style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
                <div class="MuiTypography-h6">Monthly Report Output</div>
                <p style="font-size: 9pt; color: #64748b; margin: -5px 0 20px 0;">Generated and completed reports across the last four months.</p>
                ${monthlyData.map(([month, gen, comp]) => `
                  <div class="print-bar-row">
                    <div class="print-bar-label">${month}</div>
                    <div class="print-bar-container">
                      <div class="print-bar" style="width: ${gen * 4}px; background-color: #0f172a;"></div>
                      <div class="print-bar-val">Generated: ${gen}</div>
                    </div>
                    <div class="print-bar-container" style="margin-top: 4px;">
                      <div class="print-bar" style="width: ${comp * 4}px; background-color: #94a3b8;"></div>
                      <div class="print-bar-val">Completed: ${comp}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="print-flex-col-1" style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; text-align: center;">
                <div class="MuiTypography-h6" style="text-align: left;">Completion Rate</div>
                <p style="font-size: 9pt; color: #64748b; margin: -5px 0 20px 0; text-align: left;">Reports completed on time.</p>
                <div style="width: 130px; height: 130px; margin: 30px auto 0 auto; border-radius: 50%; border: 16px solid #0f172a; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28pt; font-weight: 900; color: #0f172a;">78%</span>
                </div>
              </div>
            </div>

            <div class="print-flex-row chart-grid">
              <div class="print-flex-col-1" style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
                <div class="MuiTypography-h6">Report Category Share</div>
                <p style="font-size: 9pt; color: #64748b; margin: -5px 0 20px 0;">Distribution of report requests by category.</p>
                ${categoryData.map(([label, val]) => `
                  <div class="print-bar-row" style="margin-bottom: 16px;">
                    <div class="print-bar-label" style="font-size: 9.5pt;">${label} — ${val}</div>
                    <div class="print-bar" style="width: ${val * 12}px; height: 9px; background-color: #1e293b; margin-top: 4px;"></div>
                  </div>
                `).join('')}
              </div>

              <div class="print-flex-col-2" style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
                <div class="MuiTypography-h6">Report Records</div>
                <table class="print-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Age</th>
                      <th>Full Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.map(row => `
                      <tr>
                        <td>${row.id}</td>
                        <td>${row.firstName}</td>
                        <td>${row.lastName}</td>
                        <td>${row.age}</td>
                        <td>${row.firstName} ${row.lastName}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
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

  const cardStyle = {
    borderRadius: "28px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
    backgroundColor: "#ffffff",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background:
          "linear-gradient(180deg, #eef2ff 0%, #f8fafc 40%, #ffffff 100%)",
      }}
    >
      {/* SCREEN DESIGN */}
      <Stack spacing={4}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "32px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.28)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
          >
            <Box>
              <Typography
                sx={{
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontSize: 12,
                  opacity: 0.75,
                  fontWeight: 700,
                }}
              >
                Reporting Dashboard
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                Reports
              </Typography>

              <Typography sx={{ mt: 1.5, maxWidth: 650, color: "#cbd5e1" }}>
                Report analytics overview showing generated reports, category
                breakdown, and current completion performance.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#ffffff",
                  color: "#0f172a",
                  fontWeight: 700,
                  borderRadius: "14px",
                  px: 3,
                  "&:hover": { bgcolor: "#e2e8f0" },
                }}
              >
                Generate
              </Button>

              <Button
                variant="outlined"
                onClick={handlePrint}
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.7)",
                  fontWeight: 700,
                  borderRadius: "14px",
                  px: 3,
                }}
              >
                Export
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.7)",
                  fontWeight: 700,
                  borderRadius: "14px",
                  px: 3,
                }}
              >
                Filter
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={4}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {stats.map((item) => (
              <Card key={item[0]} sx={{ ...cardStyle, flex: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography color="text.secondary" fontWeight={700}>
                    {item[0]}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
                    {item[1]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item[2]}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Card sx={{ ...cardStyle, flex: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Monthly Report Output
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Generated and completed reports across the last four months.
                </Typography>

                <BarChart
                  series={[
                    { data: [18, 24, 20, 27], label: "Generated" },
                    { data: [12, 19, 17, 23], label: "Completed" },
                  ]}
                  height={320}
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

            <Card sx={{ ...cardStyle, flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Completion Rate
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Current percentage of reports completed on time.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Gauge width={210} height={210} value={78} />
                </Box>
              </CardContent>
            </Card>
          </Stack>

          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Card sx={{ ...cardStyle, flex: 1, minWidth: 0 }}>
              <CardContent sx={{ p: 3, overflow: "hidden" }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Report Category Share
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Distribution of report requests by category.
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    height: 320,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 14, label: "Sales" },
                          { id: 1, value: 10, label: "Users" },
                          { id: 2, value: 8, label: "Inventory" },
                          { id: 3, value: 6, label: "Finance" },
                        ],
                        innerRadius: 45,
                        outerRadius: 85,
                        paddingAngle: 3,
                        cornerRadius: 4,
                        cx: 150,
                        cy: 110,
                      },
                    ]}
                    width={340}
                    height={300}
                    margin={{ top: 10, bottom: 50, left: 10, right: 10 }}
                    slotProps={{
                      legend: {
                        direction: "row",
                        position: {
                          vertical: "bottom",
                          horizontal: "middle",
                        },
                        padding: 0,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ ...cardStyle, flex: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Report Records
                </Typography>

                <Box sx={{ height: 380 }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5 },
                      },
                    }}
                    sx={{
                      border: 0,
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f8fafc",
                        color: "#0f172a",
                        fontWeight: 800,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReportsPage;