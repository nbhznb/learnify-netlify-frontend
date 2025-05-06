import React, { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';

const transformDailyData = (dailyArray) => {
  if (!Array.isArray(dailyArray)) return [];
  return dailyArray.map((value, index) => ({
    day: index + 1,
    booksSold: Number(value) || 0
  }));
};

const getDataKeys = (data) => {
  if (!data || data.length === 0) return { valueKey: 'booksSold', categoryKey: 'day' };

  if (data[0]?.day !== undefined && data[0]?.booksSold !== undefined) {
    return { valueKey: 'booksSold', categoryKey: 'day' };
  }

  if (Array.isArray(data) && typeof data[0] === 'number') {
    return { valueKey: 'booksSold', categoryKey: 'day' };
  }

  const firstItem = data[0];
  const keys = Object.keys(firstItem);
  const valueKey = keys.find(key => typeof firstItem[key] === 'number');
  const categoryKey = keys.find(key => key !== valueKey);

  return { valueKey, categoryKey };
};

const Chart = ({ question }) => {
  const theme = useTheme(); // Access the MUI theme
  const color = theme.palette.mode === 'dark' ? "#F3F6F9" : "#1E293B";

  const renderChart = () => {
    const { chartType, chartData = [] } = question;
    const isDailyArray = Array.isArray(chartData) && chartData.every(item => typeof item === 'number');
    const transformedData = isDailyArray ? transformDailyData(chartData) : chartData;
    const { valueKey, categoryKey } = getDataKeys(transformedData);

    switch (chartType) {
      case 'table':
        const tableStyle = {
          width: '100%',
          borderCollapse: 'collapse',
          border: `2px solid ${color}`,
          margin: '20px 0',
          fontFamily: 'sans-serif'
        };

        const headerCellStyle = {
          border: `1px solid ${color}`,
          padding: '12px',
          fontWeight: 'bold',
          textAlign: 'left',
          color: color // Apply theme color
        };

        const cellStyle = {
          border: `1px solid ${color}`,
          padding: '10px',
          textAlign: 'left',
          color: color // Apply theme color
        };

        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {Object.keys(transformedData[0] || {}).map((header) => (
                    <th key={header} style={headerCellStyle}>
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transformedData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} style={cellStyle}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'line':
        return (
          <LineChart
            width={400}
            height={300}
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey={categoryKey}
              label={{ value: 'Day of January', position: 'bottom', offset: -10 }}
              tick={{ fontSize: 12, fill: color }} // Apply theme color
              tickFormatter={(value) => `Day ${value}`}
            />
            <YAxis
              label={{
                value: 'Books Sold',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                fill: color // Apply theme color
              }}
              tick={{ fontSize: 12, fill: color }} // Apply theme color
            />
            <Tooltip
              formatter={(value) => [value, 'Books Sold']}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                paddingTop: '10px',
                marginBottom: '-10px'
              }}
            />
            <Line
              type="monotone"
              dataKey={valueKey}
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ fill: theme.palette.primary.main }}
              name="Daily Sales"
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart
            width={400}
            height={250}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
          >
            <XAxis
              dataKey={categoryKey}
              label={{
                value: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                position: 'insideBottom',
                offset: -10,
                fill: color // Apply theme color
              }}
              tick={{ fontSize: 12, fill: color }} // Apply theme color
            />
            <YAxis
              label={{
                value: valueKey.charAt(0).toUpperCase() + valueKey.slice(1),
                angle: -90,
                position: 'insideLeft',
                fill: color // Apply theme color
              }}
              tick={{ fontSize: 12, fill: color }} // Apply theme color
            />
            <Tooltip />
            <Bar dataKey={valueKey} fill={theme.palette.primary.main} />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart width={400} height={250}>
            <Pie
              data={transformedData}
              dataKey={valueKey}
              nameKey={categoryKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={{ fill: color }} // Apply theme color
            >
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.colorCode || theme.palette.primary.main} />
              ))}
            </Pie>
          </PieChart>
        );

      case 'pictogram':
        const maxValue = Math.max(...chartData.map(d => d[valueKey]));
        const symbolSize = 20;
        const spacing = 25;
        const columnWidth = symbolSize * 1.5;

        return (
          <svg width={400} height={250}>
            <g transform="translate(50, 20)">
              {chartData.map((item, columnIndex) => (
                <g key={columnIndex} transform={`translate(${columnIndex * (columnWidth + spacing)}, 0)`}>
                  {Array.from({ length: item[valueKey] }, (_, i) => (
                    <text
                      key={i}
                      x={0}
                      y={200 - (i * symbolSize)}
                      fontSize={symbolSize}
                      textAnchor="middle"
                      fill={color} // Apply theme color
                    >
                      {item.symbol}
                    </text>
                  ))}
                  <text
                    x={0}
                    y={220}
                    fontSize="12"
                    textAnchor="middle"
                    fill={color} // Apply theme color
                  >
                    {item[categoryKey]}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <Grid item xs={12}>
      {renderChart()}
    </Grid>
  );
};

export default Chart;
