import React from 'react';
import { useLocation } from 'react-router-dom';

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

  const avgAge =
    rows.filter((r) => r.age !== null).reduce((a, b) => a + b.age, 0) /
    rows.filter((r) => r.age !== null).length;

  return (
    <div className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Analytics Overview
        </h1>
      </section>

      {/* SUMMARY */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Overview
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">{rows.length}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Total Users
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              {avgAge.toFixed(1)}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Average Age
            </p>
          </div>
        </div>
      </section>

      {/* GAUGE + CHARTS */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Performance
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 flex items-center justify-center">
            <Gauge width={140} height={140} value={50} valueMin={10} valueMax={60} />
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 lg:col-span-2">
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1' },
                { data: [51, 6, 49, 30], label: 'Series 2' },
              ]}
              height={250}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'A' },
                  { id: 1, value: 15, label: 'B' },
                  { id: 2, value: 20, label: 'C' },
                ],
              },
            ]}
            height={220}
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Data
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          Users Overview
        </h2>

        <div className="mt-6 h-[420px] rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-2">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </section>

      {/* MAP */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Location
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          Map View
        </h2>

        <div className="mt-6 h-[500px] rounded-3xl border-2 border-zinc-900 overflow-hidden">
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
              <Popup>
                National University-Manila
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;