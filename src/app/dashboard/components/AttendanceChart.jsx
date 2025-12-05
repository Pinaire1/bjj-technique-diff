import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';


export default function AttendanceChart({ data }) {
return (
<LineChart width={300} height={200} data={data}>
<Line type="monotone" dataKey="count" />
<XAxis dataKey="date" />
<YAxis />
<Tooltip />
</LineChart>
);
}