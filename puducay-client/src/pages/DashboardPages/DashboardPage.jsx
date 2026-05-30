import React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

import { DataGrid } from '@mui/x-data-grid';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
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

function DashboardPage() {
  useLocation();

  const validAges = rows.filter((r) => r.age !== null);

  const avgAge =
    validAges.reduce((total, row) => total + row.age, 0) / validAges.length;

  const cardStyle = {
    borderRadius: 4,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
    border: '1px solid #e2e8f0',
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
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
      
          <Typography
            sx={{
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontSize: 12,
              opacity: 0.75,
              fontWeight: 700,
            }}
          >
            Executive Dashboard
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
            Analytics Overview
          </Typography>

          <Typography sx={{ mt: 1.5, maxWidth: 700, color: '#cbd5e1' }}>
            Analytics overview showing user data, performance charts, and map location.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ ...cardStyle, flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mt: 1 }}>
                {rows.length}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Current number of listed users in the dashboard.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ...cardStyle, flex: 1 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Average Age
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mt: 1 }}>
                {avgAge.toFixed(1)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Computed average age based on available user data.
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ ...cardStyle, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Performance Gauge
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Current performance value.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Gauge width={190} height={190} value={50} valueMin={10} valueMax={60} />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ ...cardStyle, flex: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Quarterly Performance
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Comparison of two data series across four quarters.
              </Typography>

              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1' },
                  { data: [51, 6, 49, 30], label: 'Series 2' },
                ]}
                height={300}
                xAxis={[
                  {
                    data: ['Q1', 'Q2', 'Q3', 'Q4'],
                    scaleType: 'band',
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Stack>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ ...cardStyle, flex: 1 }}>
  <CardContent
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "100%",
      py: 4,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 800 }}>
      Category Share
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        mb: 4,
        maxWidth: 260,
      }}
    >
      Distribution of dashboard categories.
    </Typography>

    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 90,
          paddingAngle: 4,
          cornerRadius: 6,
          cx: 120,
          cy: 120,
          data: [
            { id: 0, value: 10, label: "A" },
            { id: 1, value: 15, label: "B" },
            { id: 2, value: 20, label: "C" },
          ],
        },
      ]}
      width={240}
      height={240}
    />

    <Stack
      direction="row"
      spacing={1.5}
      justifyContent="center"
      flexWrap="wrap"
      useFlexGap
      sx={{ mt: 3 }}
    >   
     </Stack>
  </CardContent>
</Card>

          <Card sx={{ ...cardStyle, flex: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Users Overview
              </Typography>

              <Box sx={{ height: 360 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  sx={{
                    border: 0,
                    '& .MuiDataGrid-columnHeaders': {
                      bgcolor: '#f1f5f9',
                      color: '#0f172a',
                      fontWeight: 700,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Map View
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Location marker for National University-Manila.
            </Typography>

            <Box sx={{ height: 500, overflow: 'hidden', borderRadius: 3 }}>
              <MapContainer
                center={[14.604253, 120.994314]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={[14.604253, 120.994314]}>
                  <Popup>National University-Manila</Popup>
                </Marker>
              </MapContainer>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default DashboardPage;