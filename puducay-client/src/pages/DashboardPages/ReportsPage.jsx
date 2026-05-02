import React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';

function ReportsPage() {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Reports
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Reports & Analytics
        </h1>
      </section>

      {/* KPI SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Key Metrics
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-6 flex flex-col items-center justify-center">
            <p className="mb-3 text-sm font-semibold text-zinc-700 uppercase tracking-wide">
              Performance
            </p>
            <Gauge width={140} height={140} value={75} />
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-6 flex flex-col items-center justify-center">
            <p className="mb-3 text-sm font-semibold text-zinc-700 uppercase tracking-wide">
              Completion Rate
            </p>
            <Gauge width={140} height={140} value={60} />
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Analytics
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* BAR CHART */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              Sales Overview
            </h3>

            <BarChart
              height={280}
              series={[
                { data: [30, 40, 25, 50], label: '2024' },
                { data: [20, 35, 45, 30], label: '2025' },
              ]}
              xAxis={[
                {
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                },
              ]}
            />
          </div>

          {/* PIE CHART */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              User Distribution
            </h3>

            <PieChart
              height={280}
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: 'Students' },
                    { id: 1, value: 30, label: 'Faculty' },
                    { id: 2, value: 20, label: 'Staff' },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* LINE CHART */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Activity
        </p>

        <div className="mt-6 rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            Monthly Activity
          </h3>

          <LineChart
            height={300}
            series={[
              { data: [10, 20, 15, 30, 25, 40], label: 'Logins' },
            ]}
            xAxis={[
              {
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                scaleType: 'point',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

export default ReportsPage;