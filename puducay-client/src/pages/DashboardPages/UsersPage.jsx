import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  { field: 'email', headerName: 'Email', width: 250, editable: true },
  { field: 'role', headerName: 'Role', width: 160, editable: true },
  { field: 'department', headerName: 'Department', width: 200, editable: true },
];

const rows = [
  {
    id: 1,
    name: 'Jon Snow ',
    email: 'jon.snow@example.com',
    role: 'Administrator',
    department: 'Management',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    email: 'cersei.lannister@example.com',
    role: 'Staff',
    department: 'Human Resources',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    email: 'jaime.lannister@example.com',
    role: 'Developer',
    department: 'IT Department',
  },
  {
    id: 4,
    name: 'Arya Stark',
    email: 'arya.stark@example.com',
    role: 'Designer',
    department: 'Creative Team',
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    email: 'daenerys.targaryen@example.com',
    role: 'Analyst',
    department: 'Operations',
  },
  {
    id: 6,
    name: 'Melisandre',
    email: 'melisandre@example.com',
    role: 'Coordinator',
    department: 'Marketing',
  },
   {
    id: 7,
    name: 'Ferrara Clifford',
    email: 'ferrara.clifford@example.com',
    role: 'Coordinator',
    department: 'Marketing',
  },
   {
    id: 8,
    name: 'Rossini Frances',
    email: 'rossini.frances@example.com',
    role: 'Staff',
    department: 'Human Resources',
  },
   {
    id: 9,
    name: 'Harvey Roxie',
    email: 'harvey.roxie@example.com',
    role: 'Developer',
    department: 'Information Technology',
  },
];

export default function UsersPage() {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Users
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Users Management
        </h1>
      </section>

      {/* GRID SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Data Table
        </p>

        <div className="mt-6 h-[520px] rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-3">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </section>
    </div>
  );
}